"use strict";
angular.module('app.services', ['firebase'])
.constant('FIREBASE_URL', 'https://tenkbookworm.firebaseIO.com/')
.factory('getBook', ['$http', function($http) {
    var apiKey = 'AIzaSyD8hW6xnul7nzZvPLBLHgHb5b_d2UzVjaw';
    var find = function (book) {
        var bookURL = 'https://www.googleapis.com/books/v1/volumes?' + apiKey + '&q=' + book + '&maxResults=40';
        // var bookURL = '/books/' + book;
        return $http.get(bookURL)
        .then(function (response) {
            return response.data;
        });
    };
    return {
        findBook: function (book) {
            return find(book);
        }
    };
}])
.factory('getID', ['$http', function ($http) {
    var apiKey = 'AIzaSyD8hW6xnul7nzZvPLBLHgHb5b_d2UzVjaw';
    var Id = function (id) {
        var IdURL = 'https://www.googleapis.com/books/v1/volumes/' + id +'?key=' + apiKey;
        return $http.get(IdURL)
        .then(function (response) {
            return response.data;
        });
    };
    return {
        findbookId: function (id) {
            return Id(id);
        }
    };
}])
.filter('noHTML', function () {
    return function (text) {
        return text ? String(text).replace(/[\[\]]+/g, '') : '';
    };
})

.factory('addBooks',['$firebaseObject', function ($firebaseObject) {
    return function (book) {
        var addBooksRef = new Firebase('https://tenkbookworm.firebaseio.com/books/');
        var bookRef = addBooksRef.child(book);
        return $firebaseObject(bookRef);
    };
}]);
