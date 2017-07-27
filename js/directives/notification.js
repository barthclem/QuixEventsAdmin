/**
 * Created by aanu.oyeyemi on 11/03/2017.
 */
"use strict";
angular.module('app').directive('notificationDerivative', [ Notification]);


function Notification () {
    return {
        require : 'Noification',
        restrict : 'AE',
        scope : {
            message : '@',
            type : '@'
        },
        link : function (scope, elm, attr, ctrl) {

        }
    }
}