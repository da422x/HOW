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
	.controller('RoleRequestChangeFormCtrl', function ($scope, $uibModalInstance) {
		'use strict';

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

	});