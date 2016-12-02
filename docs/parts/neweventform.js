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
	.controller('NewEventFormCtrl', function ($scope, $uibModalInstance, commonServices) {
		'use strict';

		// calendar options
		$scope.format = 'MM/dd/yyyy';
		$scope.startpopup = {
			opened: false
		};
		$scope.startopen = function () {
			$scope.startpopup.opened = true;
		};
		$scope.startDateOptions = {
			maxDate: new Date(2020, 5, 22),
			minDate: new Date(),
			startingDay: 1,
			showWeeks: false
		};
		$scope.endpopup = {
			opened: false
		};
		$scope.endopen = function () {
			$scope.endpopup.opened = true;
		};
		$scope.endDateOptions = {
			maxDate: new Date(2020, 5, 22),
			minDate: new Date(),
			startingDay: 1,
			showWeeks: false
		};
		$scope.today = function() {
		//TODO: Check if the event date is actually set
		var dateToday = new Date();
			$scope.st = dateToday;
			$scope.et = dateToday;
		};
		$scope.today();

//		$scope.chapters = [
//			{
//				value: "upcoming-open",
//				displayName: "upcoming-open"
//			},
//			{
//				value: "upcoming-closed",
//				displayName: "upcoming-closed"
//			},
//			{
//				value: "in-session",
//				displayName: "in-session"
//			},
//			{
//				value: "past",
//				displayName: "past"
//			}
//		];

		// event status radio data
		$scope.states = [
			{
				value: "upcoming-open",
				displayName: "upcoming-open"
			},
			{
				value: "upcoming-closed",
				displayName: "upcoming-closed"
			},
			{
				value: "in-session",
				displayName: "in-session"
			},
			{
				value: "past",
				displayName: "past"
			}
		];

		// empty submit object
		$scope.newEvent = {};

		$scope.postEvent = function () {
			// submit form
			//$scope.newEvent.region = $("input[name='region']:selected").val();
			//$scope.newEvent.chapter = $("chapter[name]='chapter']:selected").val();
			//$scope.newEvent.status = $("input[name='status']:selected").val();
//			$scope.newEvent.region = $scope.newEvent.region.value;
//			$scope.newEvent.chapter = $scope.newEvent.chapter.value;
//			$scope.newEvent.status = $scope.newEvent.status.value;
			$scope.newEvent.startTime = $scope.st.getTime();
			$scope.newEvent.endTime = $scope.et.getTime();
			// check required fields if blank
			if ($scope.newEvent.name == null ||
				$scope.newEvent.eventManager == null ||
				$scope.newEvent.startTime == null ||
				$scope.newEvent.endTime == null ||
				$scope.newEvent.email == null ||
				$scope.newEvent.mobileNumber == null ||
				$scope.newEvent.location == null)
				{
				console.log($scope.newEvent);
				console.log('ERROR');
				swal({
					text: "Form incomplete!",
					type: 'warning',
					timer: 2500
				});
			} else {
				commonServices.pushData('/events/',$scope.newEvent);
				$uibModalInstance.close();

				swal({
					text: "Adding Event",
					type: 'success',
					timer: 2500
				});
			}

		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

	});
