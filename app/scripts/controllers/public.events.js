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
	.controller('PublicEventsCtrl', function ($scope, $location, Api, localStorageService, $uibModal) {
		'use strict';

		$scope.currentEvent = null;

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
				$scope.showDescription = function (index) {
					$scope.currentEvent = $scope.eventList[index];
					var modalInstance = $uibModal.open({
						scope: $scope,
						templateUrl: '/parts/public.events.description.html',
						controller: 'PublicEventsDescriptionCtrl'
					});

				};
			},
			function (response) { // on error
				swal({
					text: "Connection failed. Could not " + response.config.method + " from " + response.config.url,
					type: 'warning',
					timer: 2500
				});
			});
	});
