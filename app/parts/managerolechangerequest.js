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
				$scope.requests = [];
				_.each(data[0], function(value, key) {
					value.key = key;
					$scope.requests.push(value);
				});
				console.log($scope.requests);
			});
		}

		$scope.declined = function (key, request) {
			var ts = Date.now();
			delete request.key
			delete request.$$hashKey;
			request.request_update = ts;
			request.request_status = 'Declined';
			commonServices.updateData('/roleChangeRequests/' + key, request);
			$scope.update();
		};

		$scope.approved = function (key, request) {
			var ts = Date.now();
			delete request.key
			delete request.$$hashKey;
			request.request_update = ts;
			request.request_status = 'Approved';
			commonServices.updateData('/roleChangeRequests/' + key, request);
			commonServices.updateData('/userRoles/' + request.uid + '/role/', request.request_role);
			$scope.update();
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
			$rootScope.$broadcast('modalClosing');
		};


	});
