'use strict';

/**
 * @ngdoc service
 * @name mainAppApp.firebaseService
 * @description
 * # firebaseService
 * Factory in the mainAppApp.
 */
angular.module('mainAppApp')
  .factory('firebaseService', function ($http, $firebaseAuth) {
    var srcObj = {
      promise: null, 
      dummy:null,
      firebaseApp: null,
      auth: null
    }

    srcObj.promise = $http.get('../firebaseconfig.json')
    
    srcObj.promise.then(function(resObj){
      srcObj.firebaseApp = firebase.initializeApp(resObj.data);
      srcObj.auth = $firebaseAuth();
      console.log('auth', srcObj.auth )
      srcObj.dummy = 'thad'
    })
    
    return srcObj;
  });
