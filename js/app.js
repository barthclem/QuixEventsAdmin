// Default colors
var brandPrimary =  '#20a8d8';
var brandSuccess =  '#4dbd74';
var brandInfo =     '#63c2de';
var brandWarning =  '#f8cb00';
var brandDanger =   '#f86c6b';

var grayDark =      '#2a2c36';
var gray =          '#55595c';
var grayLight =     '#818a91';
var grayLighter =   '#d1d4d7';
var grayLightest =  '#f8f9fa';

angular
.module('app', ['ui.router', 'oc.lazyLoad', 'ncy-angular-breadcrumb', 'angular-loading-bar', 'ngMessages',
    'ngCookies', 'ngResource', 'ngSanitize', 'ngStorage', 'moment-picker', 'angularMoment','ui-notification',
    'ngFileUpload', 'angularUtils.directives.dirPagination'])
    .factory('SweetAlert', ['$rootScope', AppAlert])
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
  cfpLoadingBarProvider.latencyThreshold = 1;
}])
   // .config([NotificationConfiguration])
.run(['$rootScope', '$state', '$stateParams', '$location', '$localStorage',
    'LoginService','CookieService', 'NavService', 'Notification', FirstRun]);

function AppAlert($rootScope) {
    let swal = window.swal;
    let self = {
        swal: function ( arg1, arg2, arg3 ) {
        $rootScope.$evalAsync(function(){
            if( typeof(arg2) === 'function' ) {
                swal( arg1, function(isConfirm){
                    $rootScope.$evalAsync( function(){
                        arg2(isConfirm);
                    });
                }, arg3 );
            } else {
                swal( arg1, arg2, arg3 );
            }
        });
    },
    success: function(title, message) {
        $rootScope.$evalAsync(function(){
            swal( title, message, 'success' );
        });
    },
    error: function(title, message) {
        $rootScope.$evalAsync(function(){
            swal( title, message, 'error' );
        });
    },
    warning: function(title, message) {
        $rootScope.$evalAsync(function(){
            swal( title, message, 'warning' );
        });
    },
    info: function(title, message) {
        $rootScope.$evalAsync(function(){
            swal( title, message, 'info' );
        });
    }
};
    return self;
}

function FirstRun($rootScope, $state, $stateParams, $location, $localStorage, LoginService,
                  cookieService, navService, Notification) {
    $rootScope.$on('$stateChangeSuccess',function(){
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
    $rootScope.$state = $state;

    let currentUser = $localStorage.currentUser;

    Notification.success('Success notification');
    let data = cookieService.getCookie('authentication');

    LoginService.loginTokenIsValid()
        .then(result => {
           if(result){
               console.log(`Current User Token is valid`);
               navService.setLogInStatus(true);
               $location.path('/dashboard');
               return $rootScope.$stateParams = $stateParams;
           }
           else{
               console.log(`Current User Token is not valid`);
               $location.path('/login');
               navService.setLogInStatus(false);
           }
        })
        .catch(error => {
            console.log(`Current User Token is not valid`);
            $location.path('/login');
            navService.setLogInStatus(false);
        });

    //direct the nav controller to update the view if there a user cred is in the cookies
}

function NotificationConfiguration(NotificationProvider){
    NotificationProvider.setOptions({
        delay: 10000,
        startTop: 20,
        startRight: 10,
        verticalSpacing: 20,
        horizontalSpacing: 20,
        positionX: 'left',
        positionY: 'bottom'
    });
}