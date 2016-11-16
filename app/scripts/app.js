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
      .when('/expense', {
        templateUrl: 'expense/views/expense.html',
        controller: 'ExpenseCtrl',
        controllerAs: 'vexp'
      })
       
        .when('/expense_new', {
        templateUrl: 'expense/views/newexpense.html',
        controller: 'NewExpenseCtrl',
        controllerAs: 'exp'
      })
         .when('/expense_view', {
          cache: false,
        templateUrl: 'expense/views/viewexpense.html',
        controller: 'ViewExpenseCtrl',
        controllerAs: 'vex'
      })
    .when('/expense_detail/:BillId', {
       templateUrl: "expense/views/detailexpense.html",
        controller: "ExpenseDetailsCtrl"        ,
        controllerAs: 'dex'
      })
      .when('/events',{
        templateUrl: "views/events.html",
        controller: "EventsCtrl",
        controllerAs: "evnt"
      })      
      .otherwise({
        redirectTo: '/'
      });
  }).run(function($rootScope, $firebaseAuth){
    /*  var config = {
      apiKey: "AIzaSyB0ush9ktHEJPW1C6TBmc44ANBcusetpEg",
      authDomain: "herosonthewater-55a79.firebaseapp.com",
      databaseURL: "https://herosonthewater-55a79.firebaseio.com",
      storageBucket: "herosonthewater-55a79.appspot.com",
      messagingSenderId: "183234806884"
    };*/
 
     var config = {
    apiKey: "AIzaSyDZuVC4DCb428-7_t09Y5WuoL6U4LDQdsk",
    authDomain: "lawpublicpolicy-4c61a.firebaseapp.com",
    databaseURL: "https://lawpublicpolicy-4c61a.firebaseio.com",
    storageBucket: "lawpublicpolicy-4c61a.appspot.com",
   messagingSenderId: "509725809794"  
  };
  
    if (firebase.apps.length === 0) {
      firebase.initializeApp(config);
    }
    
  
 
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
