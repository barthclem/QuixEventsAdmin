/**
 * Created by barthclem on 7/6/17.
 */
'use strict';
angular.module('app').controller('EventController', ['$stateParams','$localStorage','$location', 'EventService', 'moment',
    EventController]);
function EventController($stateParams, $localStorage, $location, eventService, moment) {
    console.log(`\n\n Let Event Start Firing \n\n\n`);
    let _this = this;
    const organizer = 'organizer';
    const eventAdmin = 'event_admin';
    const participant = 'participant';
    const general = 'general';
    const eventDetail  = 'eventDetail';
    _this.events = [];
    let user = $localStorage.currentUser;
    let userRoles = user.roles;
    _this.currentMode = 'general';
    _this.modeMap = new Map();
    _this.modeMap.set(organizer, false);
    _this.modeMap.set(eventAdmin, false);
    _this.modeMap.set(participant, false);
    _this.modeMap.set(general, true);


    _this.switchModeTo = function(mode) {
        let key,value;
        for([key,value] of _this.modeMap){
            if(key === mode) {
                _this.modeMap.set(key, true);
                _this.currentMode = mode;
                continue;
            }
            _this.modeMap.set(key, false);
        }
    };

    _this.activeModeIs = function (mode) {
        return _this.modeMap.get(mode);
    };

    let eventFormatter =  function(eventData) {
       let usage = _this.daysPercentage(eventData.created_at, eventData.scheduled_at);
       console.log(`Usage is => ${usage} %`);
      return {
          id : eventData.id,
          status : eventData === 'open' ? 'active' : 'inactive',
          link : eventData.link,
          title: eventData.title,
          details : eventData.details,
          organizer: 'mastercard',
          period : moment(eventData.scheduled_at).format('YYYY-MM-DD'),
          country: 'USA',
          flag: 'USA.png',
          countDown: usage
      }
    };
    _this.userRoleChecker = function (role) {
        return user.roles.indexOf(role) !== -1 ;
    };

    _this.remainingDays = function (scheduledDate) {
        return moment(scheduledDate).diff(moment());
    };

    _this.daysPercentage = function (createdDate, scheduledDate) {
      let totalDays= moment(scheduledDate).diff(moment(createdDate), 'days');
      let remainingDays = moment(scheduledDate).diff(moment(), 'days');
      let percentageRemaining = Math.round((1-((remainingDays)/totalDays))*100);
      return percentageRemaining > 100 ? 100 : percentageRemaining;
    };

    _this.minDateString = moment().format('YYYY-MM-DD:HH-mm');

    _this.createEvent = function () {
        let eventData = {
            title : _this.title,
            scheduled_at: _this.scheduled_at,
            details : _this.details
        };
        eventService.createEvent(eventData)
            .then(eventResult => {
                $location.path('/events');
            })
            .catch(error => {
                console.log(`Error discovered is => ${JSON.stringify(error)}`);
            });
    };

    _this.getAllEventsByOrganizer = function () {
        eventService.getOrganizerEvents()
            .then(eventList => {
                _this.switchModeTo(organizer);
                console.log(`The Mode has been switched to organizerMode \n 
                this is the evidence => ${JSON.stringify(_this.modeMap)}`);
                for (let event in eventList) {
                        event =  eventFormatter(eventList[event]);
                        _this.events.push(event);
                }
                _this.generalMode = false;
                console.log(`\n\nThe current mode is ${organizer}=> ${_this.activeModeIs(organizer)}`);
            })
            .catch(error => {
                console.log(`Error fetching all the events by an organizer => ${JSON.stringify(error)}`)
            })
    };

    _this.loadAllEvents = function () {
        eventService.getAllEvents()
            .then(eventList => {
                _this.switchModeTo(general);
                console.log('General Mode Activated');
                for (let event in eventList) {
                    event =  eventFormatter(eventList[event]);
                    _this.events.push(event);
                }

            })
            .catch(error => {
                console.log(`Error fetching all the events by an organizer => ${JSON.stringify(error)}`)
            })
    };

    _this.getAllEventsByEventAdmin = function () {

        eventService.getEventAdminEvents()
            .then(eventList => {
                _this.switchModeTo(eventAdmin);
                eventList.forEach(eventData => {
                    let event =  eventFormatter(eventData.event);
                    _this.events.push(event);
                });
                _this.generalMode = false;
                console.log(`\n\nThe current mode is ${eventAdmin}=> ${_this.activeModeIs(eventAdmin)}`);
            })
            .catch(error => {
                console.log(`Error fetching all the events by an eventAdmin => ${JSON.stringify(error)}`)
            })
    };

    _this.getAllEventsByParticipant = function () {
        console.log('\n\n Get All Events by participant is clicked');
        _this.switchModeTo('participant');
        eventService.getParticipantsEvents()
            .then(eventList => {
                console.log('\n\n The event list received');
            })
            .catch(error => {
                console.log(`Error fetching all the events by an organizer => ${JSON.stringify(error)}`)
            })
    };


    {
        console.log(`The State Parameters is => ${JSON.stringify($stateParams)}`);
        if($stateParams.mode === organizer) {
            _this.getAllEventsByOrganizer();
        }
        else if ($stateParams.mode === eventAdmin) {
            _this.getAllEventsByEventAdmin();
        }
        else if ($stateParams.mode === participant) {
            _this.getAllEventsByParticipant();
        }
        else if ($stateParams.mode === eventDetail) {
            _this.viewEventDetails($stateParams.id);
        }
        else {
            _this.loadAllEvents();
        }
    }
}


angular.module('app').controller('EventDetailController', ['$stateParams', 'EventService', 'moment',
    EventDetailController]);
function EventDetailController($stateParams,  eventService, moment) {
    console.log(`\n\n Let Event Start Firing \n\n\n`);
    let _this = this;
    const organizer = 'organizer';
    const eventAdmin = 'event_admin';

    let eventFormatter =  function(eventData) {
        return {
            status : eventData === 'open' ? 'active' : 'inactive',
            link : eventData.link,
            date : moment(eventData.scheduled_at).format('YYYY-MM-DD:HH-mm'),
            title: eventData.title,
            details : eventData.details,
            organizer: eventData.organizer.organizername,
            location: 'OAU, Ile-Ife Nigeria',
            organizerPhoneNumber: '08106740194',
            organizerEmail: 'barthclem@gmail.com'
        }
    };

    _this.event = {};

    _this.viewEventDetails = function (eventId) {
        _this.eventId =$stateParams.id;
        console.log(`Event Id from stateParams is => ${eventId}`);
        eventService.getEventDetails(eventId)
            .then(eventDetails => {
                _this.event = eventFormatter(eventDetails);
                console.log(`\n\n The EventDetails received is this => ${JSON.stringify(_this.event)}`);
            })
            .catch(error => {
                console.log(`Error fetching all the events by an organizer => ${JSON.stringify(error)}`)
            })
    };

    _this.registerForEvent = function (eventId){
        console.log(`\n\nRegister action  Event clicked is ${eventId} \n\n`);
        eventService.createParticipant(eventId)
            .then(participantDetails => {
                _this.event = eventFormatter(participantDetails);
                console.log(`\n\n The EventDetails received is this => ${JSON.stringify(participantDetails)}`);
            })
            .catch(error => {
                console.log(`Error fetching all the events by an organizer => ${JSON.stringify(error)}`)
            })
    };

    _this.showDetailsCard = function() {
        return (_this.mode === eventAdmin ||_this.mode === organizer );
    };

    {
        _this.mode = $stateParams.mode;
        console.log(`The Mode is => ${_this.mode}`);
        _this.viewEventDetails($stateParams.id);

    }
}
