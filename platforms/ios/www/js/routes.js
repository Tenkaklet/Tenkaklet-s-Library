"use strict";
angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


    .state('menu', {
      url: '/side-menu',
      abstract:true,
      templateUrl: 'templates/menu.html'
    })




    .state('login', {
      url: '/login',
          templateUrl: 'templates/login.html',
          controller: 'loginCtrl'

    })





    .state('menu.featuredBooks', {
      url: '/featured',
      views: {
        'side-menu21': {
          templateUrl: 'templates/featuredBooks.html',
          controller: 'featuredBooksCtrl'
        }
      }
    })





    .state('menu.search', {
      url: '/search',
      views: {
        'side-menu21': {
          templateUrl: 'templates/search.html',
          controller: 'searchCtrl'
        }
      }
    })





    .state('menu.results', {
      url: '/results/:Results',
      views: {
        'side-menu21': {
          templateUrl: 'templates/results.html',
          controller: 'resultsCtrl'
        }
      }
    })
    .state('success', {
      url: '/success',
          templateUrl: 'templates/success.html',
          controller: 'successCtrl',
    })



    .state('menu.specificBook', {
      url: '/specificBook/:bookId',
      views: {
        'side-menu21': {
          templateUrl: 'templates/specificBook.html',
          controller: 'specificBookCtrl'
        }
      }
    })
    .state('menu.savedBooks', {
        url: '/savedBooks',
        views: {
            'side-menu21' : {
                templateUrl: 'templates/savedBooks.html',
                controller: 'savedController'
            }
        }
    })
    .state('signup', {
      url: '/sign-up',

          templateUrl: 'templates/signup.html',
          controller: 'signupCtrl',


    })


    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
