'use strict';

/**
 * @ngdoc function
 * @name mainAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mainAppApp
 */
angular.module('mainAppApp')
  .controller('MainCtrl', ['$scope', '$rootScope', 'commonServices', function ($scope, $rootScope, commonServices) {
  
    	var main = this;
    	main.signedIn = $rootScope.signedIn;

    	main.user = {
    		name: '',
    		uid: ''
    	};

    	main.users = {};

    	main.signOut = function() {
    		commonServices.signout();
    		$rootScope.signedIn = false;
    		main.signedIn = $rootScope.signedIn;
    		main.user = {};
    	};

    	main.showUsers = function() {
    		var allUsers = commonServices.getData('/userData/')
    			.then(function (data) {
    				main.users = data;
                    $scope.$digest();
    			});
    	}

    	if ($rootScope.signedIn) {
    		var userId = commonServices.getCurrentUserUid();
    		var userData = commonServices.getData('/userData/' + userId)
    			.then(function(data) {
    				main.user.name = data.name.first;
    				main.user.uid = userId;
    				$scope.$digest();
    			});
    	}

        console.log($rootScope.userData);
  }]);
