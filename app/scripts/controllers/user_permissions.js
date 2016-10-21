'use strict';

/**
 * @ngdoc function
 * @name mainAppApp.controller:UserPermissionsCtrl
 * @description
 * # UserPermissionsCtrl
 * Controller of the mainAppApp
 */
angular.module('mainAppApp')
  .controller('UserPermissionsCtrl', ['$rootScope', 'commonServices', function ($rootScope, commonServices) {
    var user = this;

    user.roles = [];

    user.getAllUsers = function() {
    	var roleData = commonServices.getData('/userRoles/')
    		.then(function(data) {
    			user.roles = data;
    			console.log(user.roles);
    		});
    }

    user.getAllUsers();

  }]);
