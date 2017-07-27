/**
 * Created by barthclem on 7/14/17.
 */
'use strict';


angular.module('app').controller('EventAdminController', ['$stateParams', 'EventAdminService', '$location',
    'Notification', EventAdminController]);
function EventAdminController($stateParams,  eventAdminService, $location, Notification) {

    let _this = this;
    _this.username = "";
    _this.enterUsername= true;
    _this.showUserDetails = false;
    _this.userDetails = {};
    _this.eventAdmins = [];

    _this.fetchUser = function () {
        console.log('User on the way clicked');
       //$location.path(`/addEventAdmin2/${_this.eventId}/${_this.username}`);
       _this.enterUsername = false;
       _this.getUserDetails(_this.username);
    };


    _this.getUserDetails = function (username) {
        eventAdminService.getUserDetails(username)
            .then(userDetails => {
                _this.showUserDetails = true;
                _this.userDetails.id = userDetails.id;
                _this.userDetails.name = userDetails.name;
                _this.userDetails.username = userDetails.username;
                console.log(`The UserDetails retrieved is => ${JSON.stringify(userDetails)}`);
            })
            .catch(error => {
                console.log(`Error Retrieving user Data => ${error}`);
            })
    };

    _this.getAllEventAdminByEvent = function (eventId) {
      eventAdminService.getAllEventAdmin(eventId)
          .then(Events => {
              console.log(`\n\n All the event admins of event ${_this.eventId} is => ${JSON.stringify(Events)}`);
              Events.forEach(event => {
                  console.log(`event in ${event}`);
                  let eventData = { name : event.user.name,
                      eventTitle : event.event.title};
                  _this.eventAdmins.push(eventData);
              });
              console.log(`\n\n All the event admins of event ${_this.eventId} is => ${JSON.stringify(_this.eventAdmins)}`);
          })
          .catch(error => {
              console.log(`Error => ${error}`);
          })
    };

    _this.addEventAdmin = function () {
        let data = {};
        data.user_id = _this.userDetails.id;
        data.event_id = _this.eventId;
        console.log(`Add New Event is clicked\n\n\n the data is => ${JSON.stringify(data)}`);
        eventAdminService.createEventAdmin(data)
            .then(userDetails =>{
                $location.path(`/eventAdmins/${_this.eventId}`);
                console.log(`New Admin is added => ${JSON.stringify(userDetails)}`);
                Notification.show(`An Event Admin ${_this.userDetails.name} has been added to the the list`);
            })
            .catch(error => {
                console.log(`Error Retrieving user Data => ${JSON.stringify(error)}`);
            })
    };

    {
        _this.eventId = $stateParams.eventId;
        console.log(`The EventId received is => ${_this.eventId}`);
        _this.getAllEventAdminByEvent($stateParams.eventId);
    }


}
