/**
 * Created by barthclem on 7/14/17.
 */
'use strict';

angular.module('app').service('EventAdminService', ['$http', '$localStorage', EventAdminService]);

function EventAdminService ($http, $localStorage) {
    this.getUserDetails = function (username) {
        let currentUser = $localStorage.currentUser;
        $http.defaults.headers.common.Authorization = 'Bearer ' + currentUser.token;
        return new Promise ( (resolve, reject) => {
            $http.get(`http://localhost:8000/api/user/username/${username}`).then((userData) => {
                console.log(`\n\n\nUser data => ${JSON.stringify(userData)}\n\n`);
                if(userData.data.status === 'success'){
                    return resolve(userData.data.data);
                }
                else{
                    return resolve(false);
                }

            })
                .catch(error => {
                    console.log(`\n\nGet A User by username error  => ${JSON.stringify(error)}\n\n`);
                    return reject(error);
                })
        });
    };

    this.createEventAdmin = function (data) {
        let currentUser = $localStorage.currentUser;
        $http.defaults.headers.common.Authorization = 'Bearer ' + currentUser.token;
        return new Promise ( (resolve, reject) => {
            $http.post('http://localhost:8000/api/eventAdmin/', data).then((eventAdminData) => {
                console.log(`\n\n\nEventAdmin data => ${JSON.stringify(eventAdminData)}\n\n`);
                return resolve(eventAdminData.data.status);
            })
                .catch(error => {
                    console.log(`\n\nCreate eventAdmin Error => ${JSON.stringify(error)}\n\n`);
                    return reject(error);
                })
        });
    };

    this.getAllEventAdmin = function (eventId) {
        let currentUser = $localStorage.currentUser;
        $http.defaults.headers.common.Authorization = 'Bearer ' + currentUser.token;
        return new Promise ( (resolve, reject) => {
            $http.get(`http://localhost:8000/api/eventAdmin/event/${eventId}`)
                .then((event) => {
                console.log(`\n\n\n All Event data => ${JSON.stringify(event)}\n\n`);
                    if(event.data.status === 'success'){
                        return resolve(event.data.data);
                    }
                    else{
                        return resolve(false);
                    }

                })
                .catch(error => {
                    console.log(`\n\nget event by organizer Id Error => ${JSON.stringify(error)}\n\n`);
                    return reject(error);
                })
        });
    };


}