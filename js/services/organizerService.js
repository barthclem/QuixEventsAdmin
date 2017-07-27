/**
 * Created by barthclem on 7/6/17.
 */

'use strict';

angular.module('app').service('OrganizerService', ['$http', '$localStorage', OrganizerService]);

function OrganizerService ($http, $localStorage) {
    this.createOrganizer = function (data) {
        let currentUser = $localStorage.currentUser;
        data.user_id = currentUser.userId;
        $http.defaults.headers.common.Authorization = 'Bearer ' + currentUser.token;
        return new Promise ( (resolve, reject) => {
            $http.post('http://localhost:8000/api/organizer/', data).then((organizerData) => {
                console.log(`\n\n\nOrganizer data => ${JSON.stringify(organizerData)}\n\n`);
                return resolve(organizerData.data.status);
            })
                .catch(error => {
                    console.log(`\n\nCreate Organizer Error => ${JSON.stringify(error)}\n\n`);
                    return reject(error);
                })
        });
    }
}