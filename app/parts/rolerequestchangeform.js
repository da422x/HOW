/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:RoleRequestChangeFormCtrl
 * @description
 * # RoleRequestChangeFormCtrl
 * Controller of the ohanaApp
 */
angular.module('ohanaApp')
	.controller('RoleRequestChangeFormCtrl', function ($q, commonServices, $scope, $uibModalInstance, userInfo) {
		'use strict';

		$scope.userData = userInfo;

		console.log($scope.userData)

		$scope.formData = {
			role: '',
			comment: '' 
		};

		$scope.roles = [
			{ value: 'Participant', text: 'Participant' },
			{ value: 'Volunteer', text: 'Volunteer' },
			{ value: 'Leadership Team Member', text: 'Leadership Team Member' },
			{ value: 'HOW National Team/Staff', text: 'HOW National Team/Staff' },
			{ value: 'admin', text: 'admin' }
		];

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

		$scope.submitForm = function () {
			if ($scope.formData.role.value) {

				var newKey = commonServices.getNewKey('/roleChangeRequests/');

				$q.all([newKey]).then(function(data) {

					var newTS = Date.now();
					var packet = {
						uid: $scope.userData.uid,
						name: ($scope.userData.data.name.first + ' ' + $scope.userData.data.name.last),
						email: $scope.userData.data.email,
						current_role: $scope.userData.data.role,
						request_role: $scope.formData.role.value,
						user_comment: $scope.formData.comment,
						admin_comment: '',
						request_status: 'pending',
						request_created: newTS,
						request_updated: newTS,
						request_closed: ''
					};

					commonServices.updateData('/roleChangeRequests/' + data[0], packet);
					$uibModalInstance.dismiss('cancel');
				});
				
			}else{
				console.log('select role...');
			}
		}

	});