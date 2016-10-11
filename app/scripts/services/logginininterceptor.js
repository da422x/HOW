'use strict';

/**
 * @ngdoc service
 * @name mainAppApp.logginInInterceptor
 * @description
 * # logginInInterceptor
 * Service in the mainAppApp.
 */
angular.module('mainAppApp')
  .service('logginInInterceptor', function ($q, $injector) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var requestInterceptor = {
      request: function (config) {
        // var deferred = $q.defer();
        // console.log('hai')
        // var firebaseService = $injector.get('firebaseService');
        // console.log(firebaseService.promise     )
        // firebaseService.promise.success(function(){
        //   console.log('thad hai')
        // }).then(function (resObj) {
        //   console.log('inside firebase promise')
        //   var auth = $firebaseAuth();
        //   console.log('get auth', firebaseService.auth.$getAuth())
        //   auth.$waitForAuth().then(function (data) {
        //     console.log(data);
        //     deferred.resolve(config);

        //   })

        // }, function(){
        //   console.log('in err')
        // })
        //  console.log('hai2')
        // commonServices.isLoggedIn().then(function() {
        //     // Asynchronous operation succeeded, modify config accordingly
        //     alert('i am in')
        //     deferred.resolve(config);
        // }, function() {
        //     // Asynchronous operation failed, modify config accordingly
        //     alert('i am out')
        //     deferred.resolve(config);
        // });
        // return deferred.promise.then(function(){console.log('thissy thaddy')});
        //console.log(config);
        // var commonServices = $injector.get('commonServices');
        // if(commonServices.isLoggedIn()){
        //   alert('i am in')
        // }
        // else{
        //   alert('i am out')
        // }
        //   var promise = commonServices.isLoggedIn();
        //   promise.then(function(){
        //     console.log(firebase.auth())
        //   var user =  firebase.auth().currentUser;
        //   if (user) {
        //           // User is signed in.
        //           alert('i am in')
        //         } else {
        //           // No user is signed in.
        //           alert('i am out')
        //         }
        // })




        // var deferred = $q.defer();
        // someAsyncService.doAsyncOperation().then(function() {
        //     // Asynchronous operation succeeded, modify config accordingly

        //     deferred.resolve(config);
        // }, function() {
        //     // Asynchronous operation failed, modify config accordingly

        //     deferred.resolve(config);
        // });
        //return config;
        return config;
      },
      response: function (config) {
        // console.log(config);
        // var commonServices = $injector.get('commonServices');
        // if (commonServices.isLoggedIn()) {
        //   alert('i am in')
        // }
        // else {
        //   alert('i am out')
        // }
        return config;
        // var deferred = $q.defer();
        // someAsyncService.doAsyncOperation().then(function() {
        //     // Asynchronous operation succeeded, modify config accordingly

        //     deferred.resolve(config);
        // }, function() {
        //     // Asynchronous operation failed, modify config accordingly

        //     deferred.resolve(config);
        // });
        // return deferred.promise;
      }
    };

    return requestInterceptor;
  });
