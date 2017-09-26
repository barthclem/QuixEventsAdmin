/**
 * Created by barthclem on 7/27/17.
 */

'use strict';

angular.module('app').controller('CategoryEntryController', ['$stateParams', '$location','CategoryEntryService',
'moment', 'Upload', 'Notification', '$localStorage', CategoryEntryController]);
function CategoryEntryController($stateParams,  $location, categoryEntryService, moment, Upload , Notification,  $localStorage) {

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


    _this.enableUploadStatus = false;



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

    _this.enableFileUpload = function () {
      _this.enableUploadStatus = !_this.enableUploadStatus;
    };

    _this.uploadQuestion = function () {
        const categoryId = _this.categoryId;
        let currentUser = $localStorage.currentUser;
        Upload.upload({
           url: `http://localhost:8000/api/categoryEntry/file/`,
            data: {file: _this.questionExcelFile, categoryId: categoryId, userId: currentUser.userId}})
            .then((res) => {
                    if(res.data.status  === "success") {
                        console.log("\n\nSuccessfully Uploaded the file\n\n");
                        Notification('Success ' + res.config.data.file.name + 'uploaded. Response: ');
                        $location.path(`/category/g/${_this.eventId}/${_this.categoryId}`);
                    }
                },
              (res) => {
                  if(res.data.status  === "success") {
                      console.log("\n\nSuccessfully Uploaded the file\n\n");
                      Notification('Success ' + res.config.data.file.name + 'uploaded. Response: ');
                      $location.path(`/category/g/${_this.eventId}/${_this.categoryId}`);
                  }
                  else {
                      console.log(`\n\n Upload error => ${JSON.stringify(res.data.data)} \n\n`);
                      Notification('Error occurred please try the manual means while we fix the error');
                  }
                },
                 (evt) => {
                    console.log(evt);
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                    _this.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
                }
            )
    };


    {
        _this.eventId = $stateParams.eventId;
        _this.categoryId = $stateParams.categoryId;
    }

}
