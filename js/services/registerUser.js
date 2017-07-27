/**
 * Created by aanu.oyeyemi on 08/03/2017.
 */
'use strict';
angular.module('app').service('RegisterUserService', ['$http', registerUserService]);

function registerUserService ( $http ) {
       this.registerUser = function (data) {
           console.log(`\n\n Registration Through API User Started`);
        return new Promise((resolve, reject) => {
            console.log(`\n\n Registration Through API User Started`);
            $http.post('http://localhost:8000/api/user/', data).then(
                data => {
                    console.log(`\n\n Registration Through API User Data Received ${JSON.stringify(data)}`);
                    return resolve(data);
                })
                .catch(error => {
                    console.log(`Registration Response Error => ${JSON.stringify(error)}`);
                    return reject(error);
                })
        });
    }

};
