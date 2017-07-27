/**
 * Created by aanu.oyeyemi on 03/03/2017.
 */
'use strict';
angular.module('app').controller('RegistrationController', ['RegisterUserService', '$http', '$location', RegistrationController]);

function RegistrationController(RegisterUserService, $http, $location) {
    var vm = this;
    vm.registerData = function () {

        let userRegData = {
            name: vm.fullname,
            email: vm.email,
            username: vm.username,
            password: vm.password,
            picture: "1.jpg",
        };
        console.log(`\n\n\n\nUser Registration Details are ; ${JSON.stringify(userRegData)}\n\n\n`);
        RegisterUserService.registerUser(userRegData).then(
            data => {
                console.log(`Data Received Through Registration => ${JSON.stringify(data)}`);
                $location.path('/login');
            }
        )
            .catch(error => {
                console.log(`Registration Server Error is => ${JSON.stringify(error)}`)
            });

    };
}
/**
 * Created by barthclem on 7/4/17.
 */
