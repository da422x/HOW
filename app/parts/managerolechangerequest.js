/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:ManageRoleChangeRequestCtrl
 * @description
 * # ManageRoleChangeRequestCtrl
 * Controller of the ohanaApp
 */
angular.module('ohanaApp')
	.controller('ManageRoleChangeRequestCtrl', function ($q, commonServices, $scope, $rootScope, $location, $uibModalInstance) {
		'use strict';

		$scope.requests = [];

		$scope.update = function () {
			var allRequests = commonServices.getData('/roleChangeRequests/');
			$q.all([allRequests]).then(function (data) {
				_.each(data[0], function(value, key) {
					value.key = key;
					$scope.requests.push(value);
				});
				console.log($scope.requests);
			});
		}

		$scope.declined = function (key) {
			console.log('Declined');
			console.log(key);
		};

		$scope.approved = function (key) {
			console.log('Approved');
			console.log(key);
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};


	});
