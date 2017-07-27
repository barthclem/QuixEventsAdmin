/**
 * Created by barthclem on 7/26/17.
 */
'use strict';


angular.module('app').controller('CategoryController', ['$stateParams', 'CategoryService', 'moment', CategoryController]);
function CategoryController($stateParams,  categoryService, moment) {

    let _this = this;
    _this.categories= [];
    _this.categoryEntries = [];
    _this.categoryTitle = '';
    _this.questionDuration ='45 secs';
    _this.questionMark = 5;
    _this.enableBonus = false;
    _this.bonusDuration = '15 secs';
    _this.bonusMark = 3;


    _this.getAllCategory = function (eventId) {
        categoryService.getAllCategoriesByEvent(eventId)
            .then(categoryData => {
                categoryData.category.forEach(category=> {
                    console.log(`Category Entry of length ${category.categoryEntry.length} is => ${category.categoryEntry}`);
                  let data ={
                      id: category.id,
                      title: categoryData.title,
                      createdBy: categoryData.organizer.organizername,
                      noOfCategoryEntry : category.categoryEntry.length,
                      lastUpdated: moment(category.updated_at).format("YYYY-MM-DD")
                  };
                  _this.categories.push(data);
                });

            })
            .catch(error => {
                console.log(` Category Data Error => ${error}`);
            })
    };


    _this.createCategory = function () {
        let questionTime = Number(_this.questionDuration.match(/[0-9]*/));
        let bonusTime = Number(this.bonusDuration.match(/[0-9]*/));
        let data = {
            event_id : _this.eventId,
            has_bonus: _this.enableBonus,
            question_time: questionTime,
            question_grade : _this.questionMark,
            bonus_time : bonusTime,
            bonus_grade : _this.bonusMark
        };

      categoryService.createCategory(data)
          .then(categoryData => {
              console.log(`The Categories received => ${categoryData.category}`);
          })
          .catch(error => {
              console.log(` Category Data Error => ${error}`);
          })
    };


    _this.getCategory = function (categoryId) {
        console.log(`\n\nThe Category is with id => ${categoryId}`);
        categoryService.getCategory(categoryId)
            .then(categoryData => {
                console.log(`\n\nis  => ${JSON.stringify(categoryData)}`);
                _this.categoryEntries = categoryData.categoryEntry;
                _this.lastUpdated = categoryData.updated_at;
                _this.enableBonus = categoryData.has_bonus;
                _this.questionDuration = categoryData.question_time;
                _this.eventAdmin = categoryData.created_by;
                _this.questionMark = categoryData.question_grade;
                _this.bonusDuration = categoryData.bonus_time;
                _this.bonusMark = categoryData.bonus_grade;
            })
            .catch(error => {
                console.log(` Fetching category error => ${error}`)
            })
    };

    {
        _this.eventId = $stateParams.eventId;

        let mode = $stateParams.mode;
        if(mode === 'g') {
            _this.categoryId = $stateParams.categoryId;
            _this.getCategory($stateParams.categoryId);
            console.log(` get category [eventId] is => ${_this.eventId}`);
        }
        else if (mode === 'gA'){
            _this.getAllCategory($stateParams.eventId);
        }


    }
}
