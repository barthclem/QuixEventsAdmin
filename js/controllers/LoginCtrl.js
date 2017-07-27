/**
 * Created by aanu.oyeyemi on 04/03/2017.
 */
'use strict';
angular.module('app').controller('LoginController', ['$location', '$scope', '$rootScope', 'CookieService', 'LoginService', LoginController]);
function LoginController($location, $scope, $rootScope, cookieService, loginService) {
    let vm = this;
    vm.count = 0;

    vm.loginry = function () {
        loginService.login({ email: vm.email, password: vm.password }).then(
            result => {
                console.log(`\n\nThe Result of the login call is => ${JSON.stringify(result)}\n\n`);
                if (result) {
                    //store the authentication data in the cookies
                    if (vm.remember === true) {
                        cookieService.setCookie('authentication', {
                            email: vm.email,
                            password: vm.password
                        });

                        console.log(`\n\nThe Result of the login call is => ${JSON.stringify(result)}\n\n`);
                        //inform the nav controller of the update
                        $rootScope.$broadcast('loggedInEvent', { loggedIn: true });
                    }

                    $location.path('/dashboard');
                    $scope.$emit('messageAlert', { message: 'Successful Login', type: 'success' });
                } else {
                    $scope.$emit('messageAlert', { message: 'username/ password', type: 'danger' });
                }
            }
        );

    };

    vm.logOut = function () {
        cookieService.deleteCookie('authentication');
        $location.path('login');
        $scope.$emit('loggedInEvent', { loggedIn: false });
    };

    vm.signUp = function () {
        $location.path('/dashboard');
    };

}
