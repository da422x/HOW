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
	.controller('PublicEventsCtrl', function ($q, commonServices, $state, $scope, $rootScope, localStorageService, $uibModal) {
		'use strict';

		$scope.currentEvent = null;
		console.log('in events');
		var results;
		if(commonServices.getCurrentUserEmail() == null){
			console.log('No user found');
			results = commonServices.getPublicEvents();
		}
		else{
			console.log(commonServices.getCurrentUserEmail());
			results = commonServices.getData('events');

		}

		console.log('Events'+results);


		// Api.events.query().$promise.then(
		// 	function (response) { // on success
		// 		$scope.eventList = response;
		// 		if (response.length === 0) {
		// 			swal({
		// 				text: "No events exist.",
		// 				type: 'warning',
		// 				timer: 2500
		// 			});
		// 		}
		// 		$scope.showDescription = function (index) {
		// 			$scope.currentEvent = $scope.eventList[index];
		// 			var modalInstance = $uibModal.open({
		// 				scope: $scope,
		// 				templateUrl: '/parts/public.events.description.html',
		// 				controller: 'PublicEventsDescriptionCtrl'
		// 			});

		// 		};
		// 	},
		// 	function (response) { // on error
		// 		swal({
		// 			text: "Connection failed. Could not " + response.config.method + " from " + response.config.url,
		// 			type: 'warning',
		// 			timer: 2500
		// 		});
		// 	});
	});
