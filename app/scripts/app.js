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
    $httpProvider.interceptors.push('pageAuthInterceptor');
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/user_registration', {
        templateUrl: 'views/user_registration.html',
        controller: 'UserRegistrationCtrl',
        controllerAs: 'ur'
      })
      .when('/sign_in', {
        templateUrl: 'views/sign_in.html',
        controller: 'SignInCtrl',
        controllerAs: 'si'
      })
      .when('/user_permissions', {
        templateUrl: 'views/user_permissions.html',
        controller: 'UserPermissionsCtrl',
        controllerAs: 'up'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).run(function($rootScope, $firebaseAuth){
     var config = {
      apiKey: "AIzaSyB0ush9ktHEJPW1C6TBmc44ANBcusetpEg",
      authDomain: "herosonthewater-55a79.firebaseapp.com",
      databaseURL: "https://herosonthewater-55a79.firebaseio.com",
      storageBucket: "herosonthewater-55a79.appspot.com",
      messagingSenderId: "183234806884"
    };
    firebase.initializeApp(config);
    $rootScope.authObj = $firebaseAuth();

    $rootScope.authObj.$onAuthStateChanged(function(user) {
      if (user) {
        var userId = firebase.auth().currentUser.uid;
        $rootScope.uid = userId;
        var tempData = firebase.database().ref('/userData/' + userId).once('value')
          .then(function(snapshot) {
            var userData = snapshot.val();
            var userRole = firebase.database().ref('/userRoles/' + userId + '/role/')
              .once('value')
              .then(function(snapshot) {
                console.log('Logged In...');
                console.log('UID: ' + userId);
                $rootScope.userData = userData;
                $rootScope.userRole = snapshot.val();
                console.log('Name: ', $rootScope.userData.name.first);
                console.log('Role: ', $rootScope.userRole);
                $rootScope.$apply();
              });
          });
      }else{
        console.log('Logged Out...');
      }
    });
  })
