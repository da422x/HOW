'use strict';

/**
 * @ngdoc service
 * @name mainAppApp.firebaseService
 * @description
 * # firebaseService
 * Factory in the mainAppApp.
 */
angular.module('mainAppApp')
  .factory('firebaseService', function () {
    var config = {
      apiKey: "AIzaSyDAPPN0KYlyWTee3tclbhWVeFfwmqNX5MI",
      authDomain: "testing-firebase-fee02.firebaseapp.com",
      databaseURL: "https://testing-firebase-fee02.firebaseio.com",
      storageBucket: "testing-firebase-fee02.appspot.com",
      messagingSenderId: "446362784556"
    };
    firebase.initializeApp(config);
    return firebase;
  });
