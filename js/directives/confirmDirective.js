/**
 * Created by aanu.oyeyemi on 04/03/2017.
 */

angular.module('app').directive('validateConfirmPassword', function(){ return {
    require: 'ngModel',
    link: function (scope, elm, attr, ctrl) {

        function validator(viewValue) {
            ctrl.$setValidity('validateConfirmPassword', viewValue === scope.regForm.password.$viewValue);
            return viewValue;
        };
        ctrl.$parsers.unshift(validator);
        ctrl.$formatters.push(validator);

    }
}
});
