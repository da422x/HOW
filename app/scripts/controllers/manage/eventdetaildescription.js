/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:EventdetaildescriptionCtrl
 * @description
 * # EventdetaildescriptionCtrl
 * Controller of management console - event description
 */
angular
  .module('ohanaApp')
  .controller('EventdetaildescriptionCtrl', function(
    $http,
    $location,
    $scope,
    DAO
  ) {
    'use strict';
    console.log('hello');
    $scope.selectedEvent = DAO.selectedEvent;

    console.log('hello:' + selectedEvent);

    $scope.startTime = '';
    $scope.endTime = '';
    $scope.startDate = '';
    $scope.endDate = '';

    $scope.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1,
      showWeeks: false,
    };

    // based on which picker was clicked
    $scope.openStartDate = function() {
      $scope.startDate.opened = true;
    };

    $scope.openEndDate = function() {
      $scope.endDate.opened = true;
    };

    $scope.startDate = {
      opened: false,
    };

    $scope.endDate = {
      opened: false,
    };

    $scope.combineTimes = function() {
      var tempStartTime = new Date($scope.startTime);
      var tempEndTime = new Date($scope.endTime);
      var tempStartDate = new Date($scope.startDate);
      var tempEndDate = new Date($scope.endDate);

      var startDateTime = new Date(
        tempStartDate.getFullYear(),
        tempStartDate.getMonth(),
        tempStartDate.getDate(),
        tempStartTime.getHours(),
        tempStartTime.getMinutes()
      );
      var endDateTime = new Date(
        tempEndDate.getFullYear(),
        tempEndDate.getMonth(),
        tempEndDate.getDate(),
        tempEndTime.getHours(),
        tempEndTime.getMinutes()
      );
      console.log(startDateTime, endDateTime);

      var arr = [startDateTime, endDateTime];
      return arr;
    };

    $scope.saveEventDescription = function() {
      // //			var packet = {
      // //				name: $scope
      // //			}
      // //			Api.events.update(packet,
      // //				function (successMsg) {},
      // //				function (errorMsg) {}
      // //				);
      // $http.put('http://txcdt36an7383.itservices.sbc.com:1337/events/' + $scope.howEvent.currentEvent.id, {
      //     name: $scope.newEventName
      // }).then(function() {
      //     $scope.howEvent.currentEvent.name = $scope.newEventName;
      // }, function(response) {
      //     console.log(response);
      // });
      // eventDetailsDescription.reset();
    };
  });
