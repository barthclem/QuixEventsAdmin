/**
 * Created by barthclem on 7/7/17.
 */
/**
 * Created by aanu.oyeyemi on 11/03/2017.
 */
'use strict';

angular.module('app').service('EventService', ['$http', '$localStorage', 'Notification', EventService]);

function EventService ($http, $localStorage, Notification) {
    console.log(`\n\n Event Service is Loaded \n\n\n`);
    let currentUser = $localStorage.currentUser;
    $http.defaults.headers.common.Authorization = 'Bearer ' + currentUser.token;
    this.createEvent = function (data) {
        return new Promise ( (resolve, reject) => {
            $http.get(`http://localhost:8000/api/organizer/${currentUser.userId}`)
                .then((organizerData) => {
                    if(organizerData.data.status === "success"){
                        let eventData = {};
                        Object.assign(eventData, data, {organizer_id : organizerData.data.data.id});
                        console.log(`Event Data is => ${JSON.stringify(eventData)}`);
                        return eventData;
                    }
                    console.log(`\n\n\nFailed At right Now`);
                    return reject('failed');
                })
                .then(eventRegData => {
                    console.log(`The Event Registration Data is => ${JSON.stringify(eventRegData)}`);
                    $http.post(`http://localhost:8000/api/event/`, eventRegData)
                        .then(eventData => {
                            console.log(`\n\nThe Registration Event Data is => ${JSON.stringify(eventData)}`);
                            console.log(`\n\n\nEvent Data => ${JSON.stringify(eventData)}`);
                            return resolve(eventData.data.status);
                        })
                        .catch(error => {
                            console.log(`Create Event Error here is => ${JSON.stringify(error)}`);
                            return resolve('failed');
                        })
                })
                .catch(error => {
                    console.log(`\n\nCreate Event Error => ${JSON.stringify(error)}\n\n`);
                    return reject(error);
                })
        });
    };

    this.getOrganizerEvents = function(){
        return new Promise ( (resolve, reject) => {
            $http.get(`http://localhost:8000/api/event/organizer/${currentUser.userId}`)
                .then((organizerData) => {
                    if(organizerData.data.status === "success"){
                        let eventData = {};
                        Object.assign(eventData, organizerData.data.data);
                        return resolve(eventData);
                    }
                    else if( organizerData.data.status === 'failed'){
                        console.log('failed due to authentication/authorization issues');
                        return reject('401');
                    }
                    console.log(`\n\n\nFailed At right Now`);
                    return reject('failed');
                })
                .catch(error => {
                    console.log(`\n\nGet Organizer Event Error => ${JSON.stringify(error)}\n\n`);
                    return reject(error);
                })
        });

    };

    this.getEventAdminEvents = function () {

        return new Promise ( (resolve, reject) => {
            $http.get(`http://localhost:8000/api/eventAdmin/allEvent/${currentUser.userId}`)
                .then((eventAdminData) => {
                    console.log(`\n\n\nEventAdmin data => ${JSON.stringify(eventAdminData)}\n\n`);
                    if(eventAdminData.data.status === "success"){
                        let eventData = eventAdminData.data.data;
                        return resolve(eventData);
                    }
                    else if( eventAdminData.data.status === 'failed'){
                        console.log('failed due to authentication/authorization issues');
                        return reject('401');
                    }
                    console.log(`\n\n\nFailed At right Now`);
                    return reject('failed');
                })
                .catch(error => {
                    console.log(`\n\nGet EventAdmin Event Error => ${JSON.stringify(error)}\n\n`);
                    return reject(error);
                })
        });


    };

    this.getParticipantsEvents = function () {

        return new Promise((resolve, reject) => {
            $http.get(`http://localhost:8000/api/participant/events/${currentUser.userId}`)
                .then((participantData) => {
                    console.log(`\n\n\nParticipant data => ${JSON.stringify(participantData)}\n\n`);
                    if (participantData.data.status === "success") {
                        let eventData = {};
                        Object.assign(eventData, participantData.data.data);
                        console.log(`List of all the Events of an a participant
                        \n\n\nEvent Data is => ${JSON.stringify(eventData)}`);
                        return resolve(eventData);
                    }
                    else if (participantData.data.status === 'failed') {
                        console.log('failed due to authentication/authorization issues');
                        return reject('401');
                    }
                    console.log(`\n\n\nFailed At right Now`);
                    return reject('failed');
                })
                .catch(error => {
                    console.log(`\n\nGet participant Event Error => ${JSON.stringify(error)}\n\n`);
                    return reject(error);
                })
        });


    };
    this.getAllEvents = function () {
        return new Promise ( (resolve, reject) => {
            $http.get(`http://localhost:8000/api/event/`)
                .then((allEventData) => {
                    if(allEventData.data.status === "success"){
                        let eventData = {};
                        Object.assign(eventData, allEventData.data.data);
                        return resolve(eventData);
                    }
                    else if( allEventData.data.status === 'failed'){
                        console.log('failed due to authentication/authorization issues');
                        return reject('401');
                    }
                    console.log(`\n\n\nFailed At right Now`);
                    return reject('failed');
                })
                .catch(error => {
                    console.log(`\n\nGet participant Event Error => ${JSON.stringify(error)}\n\n`);
                    return reject(error);
                })
        });


    };

    this.getEventDetails = function (eventId) {
        return new Promise((resolve, reject) => {
            $http.get(`http://localhost:8000/api/event/${eventId}`)
                .then((eventDetails) => {
                    if (eventDetails.data.status === "success") {
                        let eventData = {};
                        Object.assign(eventData, eventDetails.data.data);
                        return resolve(eventData);
                    }
                    else if (eventDetails.data.status === 'failed') {
                        console.log('failed due to authentication/authorization issues');
                        return reject('401');
                    }
                    console.log(`\n\n\nFailed At right Now`);
                    return reject('failed');
                })
                .catch(error => {
                    console.log(`\n\nGet participant Event Error => ${JSON.stringify(error)}\n\n`);
                    return reject(error);
                })
        });

    };

    this.createParticipant = function (eventId) {
        return new Promise((resolve, reject) => {
            let currentUser = $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = 'Bearer ' + currentUser.token;
            let participantData = {
                event_id : eventId,
                user_id : currentUser.userId
            };
            $http.post(`http://localhost:8000/api/participant/`, participantData)
                .then((participantDetail) => {
                    if (participantDetail.data.status === "success") {
                        console.log(`Participant Registered Gist => ${JSON.stringify(participantDetail.data)}`);
                        return resolve(participantDetail.data.data);
                    }
                    else if (participantDetail.data.status === 'failed') {
                        console.log('failed due to authentication/authorization issues');
                        return reject('401');
                    }
                    console.log(`\n\n\nFailed At right Now`);
                    return reject('failed');
                })
                .catch(error => {
                    console.log(`\n\nGet participant Event Error => ${JSON.stringify(error)}\n\n`);
                    return reject(error);
                })
        });

    };


}