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
    'ngTouch'
  ])
  .config(function ($routeProvider) {
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
      })
      .otherwise({
        redirectTo: '/'
      });
  });
