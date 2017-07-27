/**
 * Created by barthclem on 7/27/17.
 */

'use strict';

angular.module('app').controller('CategoryEntryController', ['$stateParams', '$location','CategoryEntryService', 'moment', CategoryEntryController]);
function CategoryEntryController($stateParams,  $location, categoryEntryService, moment) {

    let _this = this;
    _this.question= '';
    _this.hasOption = false;
     _this.hasAdvancedOption = false;
    _this.optionA = '';
    _this.optionB = '';
    _this.optionC = '';
    _this.optionD = '';
    _this.answer ='';
    _this.questionMark = 5;
    _this.enableBonus = false;
    _this.bonusMark = 3;



    _this.createCategoryEntry = function () {
        let data = {
            category_id: _this.categoryId,
            question: _this.question,
            hasOptions: _this.hasOption,
            optionA : _this.optionA || '',
            optionB : _this.optionB || '',
            optionC : _this.optionC || '',
            optionD : _this.optionD || '',
            answer : _this.answer,
            created_at: moment().format('YYYY-MM-DD')
        };

        categoryEntryService.createCategoryEntry(data)
            .then(categoryEntryData => {
                console.log(`The Categories received => ${categoryEntryData}`);
                console.log(`go to => /category/g/${_this.eventId}/${_this.categoryId}`);
                $location.path(`/category/g/${_this.eventId}/${_this.categoryId}`);
            })
            .catch(error => {
                console.log(` Category Data Error => ${error}`);
            })
    };


    {
        _this.eventId = $stateParams.eventId;
        _this.categoryId = $stateParams.categoryId;
    }

}
