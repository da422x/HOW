/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of public login
 */
angular.module('ohanaApp')
	.controller('LoginCtrl', function ($q, commonServices, $state, $scope, $rootScope, $uibModal, localStorageService) {
		'use strict';

		$scope.logObj = {};
		$scope.checkLogin = function (user) {

			// $scope.loginRequest.$promise.then( function(data) {
			//   $state.go('manage');
			//   // console.log(data);
			//   // console.log("OH YEAH.");
			// }, function(data) {
			//   $scope.loginForm.$invalid = true;
			//   // console.log(log);
			// }
			// );
			// log.login = {};

			var results = commonServices.signin(user);
			$q.all([results]).then(function(data) {
				if (data[0]) {
					// If sign in was successful, send user to events page
					$rootScope.$broadcast('changeSessionState', 'true');				
					localStorageService.set('sessionState', 'true');					
					$state.go('dash.upcomingEvents');
				}else{
					// Do something here when sign in unsuccessful....
					console.log('Login failed...');
				}
			});

		};

		$scope.addUser = function () {
			var modalInstance = $uibModal.open({
				templateUrl: '/parts/newUserDirectoryForm.html',
				controller: 'NewUserDirectoryFormCtrl'
			});
			if (!modalInstance) {
				$scope.update();
			}
		}; // end $scope.addUser
	});
