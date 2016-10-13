'use strict';

/**
 * @ngdoc function
 * @name mainAppApp.controller:SignInCtrl
 * @description
 * # SignInCtrl
 * Controller of the mainAppApp
 */
angular.module('mainAppApp')
  .controller('SignInCtrl', ['$rootScope', 'commonServices',  function ($rootScoop, commonServices) {
    var si = this;

    si.user = {
    	email: '',
    	password: ''
    };

    si.signInUser = function(user) {
    	commonServices.signin(user);
    };

  }]);
