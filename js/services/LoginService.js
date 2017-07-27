/**
 * Created by aanu.oyeyemi on 11/03/2017.
 */
'use strict';

angular.module('app').service('LoginService', ['$http', '$localStorage', LoginService]);

function LoginService ($http, $localStorage) {
    this.login = function (data) {

        return new Promise ( (resolve, reject) => {
            $http.post('http://localhost:8000/api/user/login/', data).then((loginData) => {
                console.log(`\n\n\nLogin data => ${JSON.stringify(loginData)}\n\n`);
                $localStorage.currentUser = { email: loginData.email,
                    token: loginData.data.data.token,
                    userId: loginData.data.data.userId,
                    roles : loginData.data.data.roles};
                console.log(`\n\n The Roles of the user are => ${loginData.data.data.roles}\n\n`);
                $http.defaults.headers.common.Authorization = 'Bearer ' + loginData.data.data.token;
                return resolve(true);
            })
                .catch(error => {
                console.log(`\n\nLogin Error => ${JSON.stringify(error)}\n\n`);
                return reject(error);
            })
            });
    };

    this.loginTokenIsValid = function () {
        return new Promise ( (resolve, reject) => {
            let currentUser = $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = 'Bearer ' + currentUser.token;
            $http.get('http://localhost:8000/api/user/checkToken/')
                .then((tokenResult) => {
                console.log(`\n\nThe result of this login test is => ${JSON.stringify(tokenResult)}`);
                if(tokenResult.data.status === "success")
                {
                    return resolve(true);
                }
                else {
                    return resolve(false);
                }
            })
                .catch(error => {
                    console.log(`\n\nLogin Error => ${JSON.stringify(error)}\n\n`);
                    return reject(error);
                })
        });
    }
}