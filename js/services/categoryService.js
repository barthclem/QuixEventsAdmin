/**
 * Created by barthclem on 7/26/17.
 */
/**
 * Created by barthclem on 7/14/17.
 */
'use strict';

angular.module('app').service('CategoryService', ['$http', '$localStorage', CategoryService]);

function CategoryService ($http, $localStorage) {

    this.getAllCategoriesByEvent = function (eventId) {
        let currentUser = $localStorage.currentUser;
        $http.defaults.headers.common.Authorization = 'Bearer ' + currentUser.token;
        return new Promise ( (resolve, reject) => {
            $http.get(`http://localhost:8000/api/event/cat/${eventId}`)
                .then((categoryData) => {
                console.log(`\n\n\nCategory data => ${JSON.stringify(categoryData)}\n\n`);
                if(categoryData.data.status === 'success'){
                    return resolve(categoryData.data.data);
                }
                else{
                    return resolve(false);
                }
            })
                .catch(error => {
                    console.log(`\n\nGet Categories error  => ${JSON.stringify(error)}\n\n`);
                    return reject(error);
                })
        });
    };

    this.getCategory = function (categoryId) {
        let currentUser = $localStorage.currentUser;
        $http.defaults.headers.common.Authorization = 'Bearer ' + currentUser.token;
        return new Promise ( (resolve, reject) => {
            $http.get(`http://localhost:8000/api/category/${categoryId}`)
                .then((categoryData) => {
                    console.log(`\n\n\nCategory data => ${JSON.stringify(categoryData)}\n\n`);
                    if(categoryData.data.status === 'success'){
                        return resolve(categoryData.data.data);
                    }
                    else{
                        return resolve(false);
                    }
                })
                .catch(error => {
                    console.log(`\n\nGet Categories error  => ${JSON.stringify(error)}\n\n`);
                    return reject(error);
                })
        });
    };

    this.createCategory = function (data) {
        let currentUser = $localStorage.currentUser;
        $http.defaults.headers.common.Authorization = 'Bearer ' + currentUser.token;
        data.created_by = currentUser.userId;
        console.log(`\n\ncategory create data => ${JSON.stringify(data)}`);
        return new Promise ( (resolve, reject) => {
            $http.post('http://localhost:8000/api/category/', data)
                .then((categoryData) => {
                console.log(`\n\n\n created category data => ${JSON.stringify(categoryData)}\n\n`);
                    if(categoryData.data.status === 'success'){
                        return resolve(categoryData.data.data);
                    }
                    else{
                        return resolve(false);
                    }
            })
                .catch(error => {
                    console.log(`\n\nCreate eventAdmin Error => ${JSON.stringify(error)}\n\n`);
                    return reject(error);
                })
        });
    };





}