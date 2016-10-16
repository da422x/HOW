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
      .when('/sign_in', {
        templateUrl: 'views/sign_in.html',
        controller: 'SignInCtrl',
        controllerAs: 'si'
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
    if (firebase.apps.length === 0) {
      firebase.initializeApp(config);
    }
      
    $rootScope.authObj = $firebaseAuth();

    $rootScope.authObj.$onAuthStateChanged(function(user) {
      if (user) {
      var userId = firebase.auth().currentUser.uid;
      $rootScope.uid = userId;
      var userRole = firebase.database().ref('/userData/' + userId).once('value')
        .then(function(snapshot) {
          var data = snapshot.val();
          console.log('Logged In...');
          console.log('UID: ' + userId);
          $rootScope.userData = data;
          console.log($rootScope.userData)
          $rootScope.$apply();
        });
      }else{
        console.log('Logged Out...');
      }
    });
  })
