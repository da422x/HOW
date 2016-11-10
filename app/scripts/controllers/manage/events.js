/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of management console - events
 */
angular.module('ohanaApp')
	.controller('EventsCtrl', function ($scope, $location, $uibModal, Api, localStorageService) {
		'use strict';
		if (localStorageService.get('currentEvent')) {
			$scope.isDetailView = true;
		} else {
			$scope.isDetailView = false;
		}

		$scope.howEvent = {
			currentEvent: null
		};

		$scope.$on('$locationChangeStart', function (event, next, current) {
			if ($location.path() === '/manage/events' || $location.path() === '/manage/events/') {
				localStorageService.clearAll();
				$scope.isDetailView = false;
			}
		});

		$scope.update = function () {
			Api.events.query().$promise.then(
				function (response) { // on success
					$scope.eventList = response;
					if (response.length === 0) {
						swal({
							text: "No events exist.",
							type: 'warning',
							timer: 2500
						});
					}
					$scope.manageEvent = function (index) {
						$scope.isDetailView = !$scope.isDetailView;
						$scope.howEvent.currentEvent = $scope.eventList[index];
						localStorageService.set('currentEvent', $scope.howEvent.currentEvent.id);
						$location.path('/manage/events/details/description');
					};
				},
				function (response) { // on error
					swal({
						text: "Connection failed. Could not " + response.config.method + " from " + response.config.url,
						type: 'warning',
						timer: 2500
					});
				}
			);
		};

		$scope.add = function () {
			var modalInstance = $uibModal.open({
				templateUrl: '/parts/newEventForm.html',
				controller: 'NewEventFormCtrl'
			});
			if (!modalInstance) {
				$scope.update();
			}
		};
	});
