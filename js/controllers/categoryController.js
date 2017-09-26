/**
 * Created by barthclem on 7/26/17.
 */
'use strict';


angular.module('app').controller('CategoryController', ['$stateParams', 'CategoryService', 'CategoryEntryService',
    'moment', 'Notification', 'SweetAlert', '$state','$location', CategoryController]);
function CategoryController($stateParams,  categoryService, categoryEntryService, moment, Notification,
SweetAlert, $state, $location) {

    let _this = this;
    _this.categories= [];
    _this.categoryEntries = [];
     _this.categoryEntriesTemp = [];
    _this.categoryEntry = {};
    _this.categoryTitle = '';
    _this.questionDuration ='45 secs';
    _this.questionMark = 5;
    _this.enableBonus = false;
    _this.bonusDuration = '15 secs';
    _this.bonusMark = 3;
    _this.editCurrentIndex = -1;
    _this.editMode = false;

    _this.catEntrySearch = '';
    //this is the part responsible for the pagination of this section
    const entityPerPage = 4;
    _this.currentPage = 1;
    _this.pages = [];

    _this.getAllCategory = function (eventId) {
        categoryService.getAllCategoriesByEvent(eventId)
            .then(categoryData => {
                categoryData.category.forEach(category=> {
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

    _this.deleteCategoryEntry = function ( index) {
        let itemIndex = index + ((_this.currentPage-1)*entityPerPage);
       let categoryId = _this.categoryEntries[itemIndex].id;
       SweetAlert.swal({
                title: "Are you sure?",
                text: "Your will not be able to recover this Question",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel please!",
                closeOnConfirm: false,
                closeOnCancel: false },
            function(isConfirm){
                if (isConfirm) {
                    SweetAlert.swal("Deleted!", "the question has been deleted.", "success");
                    categoryService.deleteCategoryEntry(categoryId)
                        .then(message => {
                            delete _this.categoryEntries[index];
                            notification.success("Question successfully deleted");
                            console.log(`Delete Message received => ${message}`);
                        })
                        .catch(error => {
                            console.log(` Category Entry Delete Error => ${JSON.stringify(error)}`);
                            SweetAlert.swal("Error", "Please try again)", "error");
                        })
                } else {
                    SweetAlert.swal("Cancelled", "the question is safe :)", "error");
                }
            });


    };


    _this.getCategory = function (categoryId) {
        categoryService.getCategory(categoryId)
            .then(categoryData => {
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


    _this.editCategoryEntry = function (index) {
        console.log(`Update Category Entry Current Index =>${index}`);
        let itemIndex = index + ((_this.currentPage-1)*entityPerPage);
        let categoryEntry = _this.categoryEntries[itemIndex];
        if(!_this.editMode){
            _this.editCurrentIndex = index;
            _this.editMode= true;
            console.log(`Update Category Entry =>${JSON.stringify(categoryEntry)}`);
            _this.categoryEntry.id = categoryEntry.id;
            _this.categoryEntry.question = categoryEntry.question;
            _this.categoryEntry.optionA = categoryEntry.optionA;
            _this.categoryEntry.optionB = categoryEntry.optionB;
            _this.categoryEntry.optionC = categoryEntry.optionC;
            _this.categoryEntry.optionD = categoryEntry.optionD;
             _this.categoryEntry.answer = categoryEntry.answer;
        }
        else{
            _this.editCurrentIndex = -1;
            _this.editMode= false;
            let data = {
                question: _this.categoryEntry.question,
                answer : _this.categoryEntry.answer,
                created_at: moment().format('YYYY-MM-DD')
            };
            console.log(`Update has Options => ${categoryEntry.hasOptions}`);
            if(categoryEntry.hasOptions){
                    data.optionA = _this.categoryEntry.optionA;
                    data.optionB = _this.categoryEntry.optionB;
                    data.optionC = _this.categoryEntry.optionC;
                    data.optionD = _this.categoryEntry.optionD;
            }

            categoryEntryService.updateCategoryEntry(_this.categoryEntry.id, data)
                .then(categoryEntryData => {
                    Notification("Entry updated successfully");
                    console.log(`Update Index Categories received => ${JSON.stringify(categoryEntryData)}`);
                    _this.categoryEntries[itemIndex].question= data.question;
                    _this.categoryEntries[itemIndex].answer = data.answer;
                    if(data.optionA && data.optionC){
                        _this.categoryEntries[itemIndex].optionA = data.optionA;
                        _this.categoryEntries[itemIndex].optionB = data.optionB;
                        _this.categoryEntries[itemIndex].optionC = data.optionC;
                        _this.categoryEntries[itemIndex].optionD = data.optionD;
                    }
                    else if(data.optionA && !data.optionC){
                        _this.categoryEntries[itemIndex].optionA =data.optionA;
                        _this.categoryEntries[itemIndex].optionB = data.optionB;
                    }
                    //this.reloadPage();
                    console.log(`  update Categories Entry => ${_this.categoryEntries[index]}`);
                    //$location.path(`/category/g/${_this.eventId}/${_this.categoryId}`);
                })
                .catch(error => {
                    Notification("Unable to update please try again later");
                    console.log(` Category Data Error => ${JSON.stringify(error)}`);
                })
        }

    };

    this.reloadPage = function() {
      $state.reload();
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
