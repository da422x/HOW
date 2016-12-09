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
    .controller('PublicEventsCtrl', function($q, commonServices, $scope, $uibModal, Api, selectValues) {
        'use strict';
        $scope.newQuery = {};
        var allEvents = [];


        var loadAll = function() {
            var getEvents = commonServices.getPublicEvents();
            allEvents = [];
            $q.all([getEvents]).then(function(data) {
                if (data[0]) {
                    _.each(data[0], function(event) {
                        allEvents.push(event);
                    });
                    $scope.eventList = allEvents;
                } else {
                    console.log('Failed to get Events...');
                }
            });
        };

        loadAll();

        $scope.search = function() {
            if (allEvents.length > 0) {
                $scope.empty = false;

                if ($scope.newQuery.search == '*' || !($scope.newQuery.search)) {
                    loadAll();
                } else {
                    var eventsFound = [];
                    _.each(allEvents, function(event) {
                        _.each(event, function(attribute) {
                            if (angular.isString(attribute) && angular.isString($scope.newQuery.search)) {
                                if (_.includes(attribute.toLowerCase(), $scope.newQuery.search.toLowerCase())) {
                                    eventsFound.push(event);
                                    return false;
                                }
                            } else if (_.includes(attribute, $scope.newQuery.search)) {
                                eventsFound.push(event);
                                return false;
                            }
                        });
                    });
                    if (eventsFound.length == 0) {
                        console.log('no results');
                        $scope.empty = true;
                        $scope.noEventsFound = "No results for " + $scope.newQuery.search + " found.";
                    }
                    $scope.eventList = eventsFound;
                }
            }

        };


        $scope.showDescription = function(index) {
            $scope.currentEvent = $scope.eventList[index];
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/parts/public.events.description.html',
                controller: 'PublicEventsDescriptionCtrl'
            });

        };

        $scope.showDescription = function(index) {
            $scope.selected = allEvents[index];
            console.log('Index is: ' + index);
            var getEvents = commonServices.getEvent($scope.selected);

            $q.all([getEvents]).then(function(data) {
                if (data[0]) {
                    _.each(data[0], function(event) {
                        if ($scope.selected.email === event.email) {
                            console.log('Event: ' + event.name);
                            $scope.selected = event;
                        }
                    });
                } else {
                    $scope.selected = null;
                }

            });
            if ($scope.selected != null) {
                var modalInstance = $uibModal.open({
                    scope: $scope,
                    templateUrl: '/parts/public.events.description.html',
                    controller: 'PublicEventsDescriptionCtrl'
                });

            }
        };

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
        // 		
        // 	},
        // 	function (response) { // on error
        // 		swal({
        // 			text: "Connection failed. Could not " + response.config.method + " from " + response.config.url,
        // 			type: 'warning',
        // 			timer: 2500
        // 		});
        // 	});
    });