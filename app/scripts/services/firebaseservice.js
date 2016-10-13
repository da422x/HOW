'use strict';

/**
 * @ngdoc service
 * @name mainAppApp.firebaseService
 * @description
 * # firebaseService
 * Factory in the mainAppApp.
 */
angular.module('mainAppApp')
  .factory('firebaseService', function ($rootScope, $http, $firebaseAuth) {
    
    var config = {
      apiKey: "AIzaSyB0ush9ktHEJPW1C6TBmc44ANBcusetpEg",
      authDomain: "herosonthewater-55a79.firebaseapp.com",
      databaseURL: "https://herosonthewater-55a79.firebaseio.com",
      storageBucket: "herosonthewater-55a79.appspot.com",
      messagingSenderId: "183234806884"
    };
    firebase.initializeApp(config);

    $rootScope.authObj = firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var userId = firebase.auth().currentUser.uid;
        var userRole = firebase.database().ref('/userData/' + userId).once('value')
          .then(function(snapshot) {
            var data = snapshot.val();
            console.log('Logged In...');
            console.log('UID: ' + userId);
            console.log('Role: ' + data.role);
            $rootScope.signedIn = true;
            $rootScope.userData = data;
          });
      }else{
        console.log('Logged Out...');
        $rootScope.signedIn = false;
      }
    });

    return firebase;
  });
