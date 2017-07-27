/**
 * Created by barthclem on 7/27/17.
 */

'use strict';

angular.module('app').service('CategoryEntryService', ['$http', '$localStorage', CategoryEntryService]);

function CategoryEntryService ($http, $localStorage) {

    this.createCategoryEntry = function (data) {
        let currentUser = $localStorage.currentUser;
        $http.defaults.headers.common.Authorization = 'Bearer ' + currentUser.token;
        data.updated_by = currentUser.userId;
        console.log(`\n\ncategory create data => ${JSON.stringify(data)}`);
        return new Promise ( (resolve, reject) => {
            $http.post('http://localhost:8000/api/categoryEntry/', data)
                .then((categoryEntryData) => {
                    console.log(`\n\n\n created categoryEntry data => ${JSON.stringify(categoryEntryData)}\n\n`);
                    if(categoryEntryData.data.status === 'success'){
                        return resolve(categoryEntryData.data.data);
                    }
                    else{
                        return resolve(false);
                    }
                })
                .catch(error => {
                    console.log(`\n\nCreate categoryEntry Error => ${JSON.stringify(error)}\n\n`);
                    return reject(error);
                })
        });
    };

    this.updateCategoryEntry = function (categoryId, data) {
        let currentUser = $localStorage.currentUser;
        $http.defaults.headers.common.Authorization = 'Bearer ' + currentUser.token;
        data.updated_by = currentUser.userId;
        console.log(`\n\ncategory create data => ${JSON.stringify(data)}`);
        return new Promise ( (resolve, reject) => {
            $http.put(`http://localhost:8000/api/categoryEntry/${categoryId}`, data)
                .then((categoryEntryData) => {
                    console.log(`\n\n\n updated categoryEntry with id ${categoryId} => ${JSON.stringify(categoryEntryData)}\n\n`);
                    if(categoryEntryData.data.status === 'success'){
                        return resolve(categoryEntryData.data.data);
                    }
                    else{
                        return resolve(false);
                    }
                })
                .catch(error => {
                    console.log(`\n\nCreate categoryEntry Error => ${JSON.stringify(error)}\n\n`);
                    return reject(error);
                })
        });
    };

    this.deleteCategoryEntry = function (categoryId) {
        let currentUser = $localStorage.currentUser;
        $http.defaults.headers.common.Authorization = 'Bearer ' + currentUser.token;
        return new Promise ( (resolve, reject) => {
            $http.delete(`http://localhost:8000/api/categoryEntry/${categoryId}`)
                .then((categoryEntryData) => {
                    console.log(`\n\n\n deleted categoryEntry with id ${categoryId} \n\n`);
                    return (categoryEntryData.data.status === 'success');
                })
                .catch(error => {
                    console.log(`\n\nCreate categoryEntry Error => ${JSON.stringify(error)}\n\n`);
                    return reject(error);
                })
        });
    };


}