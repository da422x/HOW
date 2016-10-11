'use strict';

/**
 * @ngdoc overview
 * @name mainAppApp
 * @description
 * # mainAppApp
 *
 * Main module of the application.
 */
angular
  .module('mainAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .config(function ($routeProvider, $httpProvider) {

    $httpProvider.interceptors.push('logginInInterceptor');
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/manageUsers', {
        templateUrl: 'views/manageusers.html',
        controller: 'ManageusersCtrl',
        controllerAs: 'mu'
        // ,
        // resolve:{
        //   'firebaseService':function(firebaseService){
        //     // firebaseService will also be injectable in your controller, if you don't want this you could create a new promise with the $q service
        //     console.log('inside resolve', firebaseService.promise)
        //     return firebaseService.promise;
        // }}
      })
      .when('/user_registration', {
        templateUrl: 'views/user_registration.html',
        controller: 'UserRegistrationCtrl',
        controllerAs: 'ur'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
