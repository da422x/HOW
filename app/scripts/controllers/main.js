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

    	main.user = {
    		name: '',
    		uid: ''
    	};
    	main.users = {};//hai test2

        var tiki = new commonServices.DAO.userData({address:'thaddeus house', gender: 'M'});
        console.log(tiki.address)

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
  }]);
