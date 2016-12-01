/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of the ohanaApp
 */
angular.module('ohanaApp')
	.controller('EventsCtrl', function ($scope, $uibModal, $location, Api) {
		'use strict';
		$scope.isDetailView = false;
		$scope.howEvent = {
			currentEvent: null
		};

		$scope.$on('$locationChangeStart', function (event, next, current) {
			if ($location.path() === '/manage/events') {
				$scope.isDetailView = false;
			}
		});

		$scope.update = function () {
			Api.events.query().$promise.then(
				function (response) {
					$scope.eventList = response;
					$scope.manageEvent = function (index) {
						$scope.isDetailView = !$scope.isDetailView;
						$scope.howEvent.currentEvent = $scope.eventList[index];
						$location.path('/manage/events/details/description');
					};
				},
				function (response) {}
			);
		};

		$scope.add = function () {
			var modalInstance = $uibModal.open({
				templateUrl: '/parts/newEventDirectoryForm.html',
				controller: 'NewEventDirectoryFormCtrl'
			});
			if (!modalInstance) {
				$scope.update();
			}
		};
	});
