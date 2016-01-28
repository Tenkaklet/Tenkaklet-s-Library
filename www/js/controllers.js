"use strict";
angular.module('app.controllers', [])

.controller("loginCtrl",[ '$scope','$firebaseAuth','$location', 'FIREBASE_URL','$ionicLoading', '$rootScope',function($scope, $firebaseAuth, $location, FIREBASE_URL, $ionicLoading, $rootScope) {
    var fb = new Firebase(FIREBASE_URL);
    $scope.user = {};
    $scope.login = function(user) {
        $ionicLoading.show({
            template: 'Logging in'
        });
        var fbAuth = $firebaseAuth(fb);
        $ionicLoading.hide();
        fbAuth.$authWithPassword({
                email: $scope.user.email,
                password: $scope.user.password
            })
        .then(function(authData) {
            $rootScope.userData = authData;
            $rootScope.userLoggedIn = true;
            $location.path('/side-menu/search');
        })
        .catch(function (error) {
            $scope.loginFail = true;
            $location.path('/side-menu/sign-up');
        });
    };
}])
.controller('successCtrl', ['$scope', '$stateParams','$rootScope',function($scope, $stateParams, $rootScope) {
    $scope.userData = $rootScope.userData;
}])
.controller('savedController', ['$scope', '$stateParams','$rootScope','$ionicPopup','addBooks', '$firebaseArray','FIREBASE_URL', 'getID','$location', function($scope, $stateParams, $rootScope, $ionicPopup, addBooks, $firebaseArray, FIREBASE_URL, getID, $location) {

    var bookShelf = new Firebase(FIREBASE_URL + 'users/' + $rootScope.userData.uid +  '/books');
    $scope.books = $firebaseArray(bookShelf);


    $scope.userData = $rootScope.userData;

    $scope.remove = function (book) {
        $scope.books.$remove(book);

    };



}])

.controller('featuredBooksCtrl',['$scope', 'getBook', '$rootScope', 'FIREBASE_URL','$ionicPopup' , function($scope, getBook, $rootScope, FIREBASE_URL, $ionicPopup) {


    console.log($rootScope.userData.uid);
    var bookShelf = new Firebase(FIREBASE_URL + 'users/' + $rootScope.userData.uid +  '/books');
    var catagories = [
        'Anarchism',
        'Religion',
        'Sports',
        'Programming',
        'Politics',
        'Music',
        'History'
    ];

    $scope.featuredBook = catagories[Math.floor(Math.random() * catagories.length)];
    getBook.findBook($scope.featuredBook)
    .then(function (response) {

        $scope.books = response.items;
        $scope.addBook = function (book) {
            bookShelf.push({
                name: book.volumeInfo.title,
                id: book.id
            });

            var bookPopup = $ionicPopup.alert({
                title: 'Book Added!',
                template: 'The book is now stored'
            });
            bookPopup.then(function(results) {

            });
        };


    });
}])

.controller('resultsCtrl', ['$scope', 'getBook','$stateParams','$firebaseArray','$ionicPopup','addBooks','FIREBASE_URL','$rootScope', function($scope, getBook, $stateParams, $firebaseArray,$ionicPopup,addBooks, FIREBASE_URL, $rootScope) {


    var bookShelf = new Firebase(FIREBASE_URL + 'users/' + $rootScope.userData.uid +  '/books');

    getBook.findBook($stateParams.Results)
    .then(function (response) {
        var bookData = response.items;
        $scope.numOfBooks = bookData.length;
        $scope.books = bookData;
        var selectedBook = bookData;

        angular.forEach(selectedBook, function (item) {

            var specificBook = item.volumeInfo.title;

            $scope.addBook = function (book) {
                bookShelf.push({
                    name: book.volumeInfo.title,
                    id: book.id
                });

                var bookPopup = $ionicPopup.alert({
                    title: 'Book Added!',
                    template: 'The book is now stored'
                });
                bookPopup.then(function(results) {
                });
            };
        });
    });
}])

.controller('searchCtrl', ['$scope','getBook','$log','$location', function($scope, getBook, $log, $location) {
    $scope.bookSearch = function (bookTitle) {
        console.log(bookTitle);
        getBook.findBook(bookTitle)
        .then(function(response) {
            var bookData = response;

        });
        $location.path('/side-menu/results/' + bookTitle);
    };
}])

.controller('signupCtrl', ['$rootScope','$scope', '$firebaseAuth','$location', '$ionicModal', 'FIREBASE_URL', function($rootScope,$scope, $firebaseAuth, $location, $ionicModal, FIREBASE_URL) {

    $scope.user = {};
    var fb = new Firebase(FIREBASE_URL);
    $scope.register = function (user) {

        var userData = {
            name: $scope.user.name,
            email: $scope.user.email,
            password: $scope.user.password
        };

        var fbAuth = $firebaseAuth(fb);
        fbAuth.$createUser({
            name: $scope.user.name,
            email: $scope.user.email,
            password: $scope.user.password
        })
        .then(function () {
            return fbAuth.$authWithPassword({
                name: $scope.user.name,
                email: $scope.user.email,
                password: $scope.user.password
            });
        })
        .then(function(authData) {
            var userRef = new Firebase(FIREBASE_URL + 'users/ +' + authData.uid);
            userRef.push({
                name: $scope.user.name,
                uid: authData.uid
            });





            $rootScope.userData = {
                name: $scope.user.name,
                email: $scope.user.email,
                password: $scope.user.password,
                uid: authData.uid
            };

            $location.path('/success');
            $rootScope.userLoggedIn = true;
        })
        .catch(function (error) {
            $scope.regError = true;
            $scope.regErrorMessage = error.message;
            
        });

    };


}])
.controller('specificBookCtrl', ['$scope','getBook', '$log', '$stateParams','getID',function($scope, getBook, $log, $stateParams, getID) {
    $log.warn($stateParams.bookId);
    getID.findbookId($stateParams.bookId)
    .then(function (response) {
        $log.info(response);
        var specBook = response;
        $scope.bookName = specBook.volumeInfo.title;
        $scope.bookIMG = specBook.volumeInfo.imageLinks.thumbnail;
        $scope.author = specBook.volumeInfo.authors;
        $scope.publisher = specBook.volumeInfo.publisher;
        $scope.categories = specBook.volumeInfo.categories;
        $scope.description = specBook.volumeInfo.description;
        $scope.ISBN = specBook.volumeInfo.industryIdentifiers[0].identifier;
        $scope.bookType = specBook.volumeInfo.printType;
        $scope.pages = specBook.volumeInfo.pageCount;
        $scope.pubDate = specBook.volumeInfo.publishedDate;

    });
}]);
