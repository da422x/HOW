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
	.controller('EventsCtrl', function ($q, commonServices, $scope, $uibModal, Api, selectValues) {
		'use strict';

		$scope.newQuery = {};
		$scope.SearchPlaceHolder = "Enter your query";
		var allEvents = [];


		var loadAll = function(){
			var path = '/events/';
			var getEvents = commonServices.getData(path);
			allEvents = [];
			$q.all([getEvents]).then(function(data) {
					if (data[0]) {
						console.log(data[0]);
						_.each(data[0], function(event) {
							allEvents.push(event);
						});
						$scope.eventList = allEvents;
					}else{
						console.log('Failed to get Events...');
					}
				});
		};

		loadAll();

		$scope.search = function(){
			console.log($scope.newQuery.search);
			if(allEvents.length>0){
				if($scope.newQuery.search == '*'){
					loadAll();
				}
				else{
					var eventsFound = [];
					_.each(allEvents, function(event){
						_.each(event, function(attribute){
							if(_.includes(attribute.toLowerCase(), $scope.newQuery.search.toLowerCase())){
								eventsFound.push(event);
								return false;
							}
						});				
					});
					if(eventsFound.length == 0){
						console.log('no results');
						$scope.newQuery.search = null;
						$scope.SearchPlaceHolder = 'No results for \'' +$scope.newQuery.search +  '\' found';
					}
					$scope.eventList = eventsFound;
				}
			}
				
		};

		$scope.update = function () {
			
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
			// 		$scope.manageEvent = function (index) {
			// 			$scope.isDetailView = !$scope.isDetailView;
			// 			$scope.howEvent.currentEvent = $scope.eventList[index];
			// 			localStorageService.set('currentEvent', $scope.howEvent.currentEvent.id);
			// 			$location.path('/manage/events/details/description');
			// 		};
			// 	},
			// 	function (response) { // on error
			// 		swal({
			// 			text: "Connection failed. Could not " + response.config.method + " from " + response.config.url,
			// 			type: 'warning',
			// 			timer: 2500
			// 		});
			// 	}
			// );
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
