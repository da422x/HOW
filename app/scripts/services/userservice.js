'use strict';

/**
 * @ngdoc service
 * @name ohanaApp.userservice
 * @description
 * # userservice
 * Service in the ohanaApp.
 */
angular
  .module('ohanaApp')
  .service('userService', function($rootScope, commonServices) {
    // Setter Sunctions.

    this.setId = function(data) {
      $rootScope.userId = data;
      localStorage.setItem('userId', data);
    };

    this.setUserData = function(data) {
      $rootScope.userData = data;
      localStorage.setItem('userData', JSON.stringify(data));
    };

    this.setUserName = function(first, last) {
      $rootScope.userName = first + ' ' + last;
      localStorage.setItem('userName', first + ' ' + last);
    };

    this.setRole = function(data) {
      $rootScope.userRole = data;
      localStorage.setItem('userRole', data);
    };

    this.setUserEmail = function(data) {
      $rootScope.userEmail = data;
      localStorage.setItem('userEmail', data);
    };

    this.setChapter = function(data) {
      $rootScope.userChapter = data;
      localStorage.setItem('userChapter', JSON.stringify(data));
    };

    // Getter Functions

    this.getId = function() {
      var userId = localStorage.getItem('userId');
      return userId;
    };

    this.getUserData = function() {
      var userData = localStorage.getItem('userData');
      return JSON.parse(userData);
    };

    this.getUserName = function() {
      var userName = localStorage.getItem('userName');
      return userName;
    };

    this.getRole = function() {
      var userRole = localStorage.getItem('userRole');
      return userRole;
    };

    this.getUserEmail = function(data) {
      var userEmail = localStorage.getItem('userEmail');
      return userEmail;;
    };

    this.getChapter = function() {
      var userChapter = localStorage.getItem('userChapter');
      return JSON.parse(userChapter);
    };
  });
