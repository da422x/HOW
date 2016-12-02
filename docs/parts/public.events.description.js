/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:NewuserdirectoryformCtrl
 * @description
 * # NewuserdirectoryformCtrl
 * Controller of the ohanaApp
 */
angular.module('ohanaApp')
	.controller('PublicEventsDescriptionCtrl', function ($scope, $location, $uibModalInstance, Api) {
		'use strict';

		// calendar options

		Api.events.query({ event_id: $scope.currentEvent.id }).$promise.then( function(response){
			$scope.eventName = response.name;
			$scope.eventId = response.id;

			$scope.event_status = response.event_status;
			$scope.start_timestamp = response.start_timestamp;
			$scope.end_timestamp = response.end_timestamp;
			$scope.address = response.address;
			$scope.chapter = response.chapter.name;
			$scope.event_manager = response.event_manager;
			$scope.contact_number = response.contact_number;
			$scope.contact_email = response.contact_email;
			$scope.capacity = response.capacity;
			$scope.description = response.description;
		});

		$scope.popup = {
			opened: false
		};

		$scope.open = function () {
			$scope.popup.opened = true;
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

		$scope.postRsvp = function () {
			$uibModalInstance.dismiss('cancel');
		}

	});
