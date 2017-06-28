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
    .controller('NewEventFormCtrl', function($q, $scope, $uibModalInstance, commonServices, $rootScope) {
        'use strict';

        // calendar options
        $scope.format = 'MM/dd/yyyy';
        $scope.startpopup = {
            opened: false
        };
        $scope.startopen = function() {
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
        $scope.endopen = function() {
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
        $scope.states = [{
            value: "upcoming-open",
            displayName: "upcoming-open"
        }, {
            value: "upcoming-closed",
            displayName: "upcoming-closed"
        }, {
            value: "in-session",
            displayName: "in-session"
        }, {
            value: "past",
            displayName: "past"
        }];

        // empty submit object
        $scope.newEvent = {};

        $scope.postEvent = function() {
            // submit form
            $scope.newEvent.startTime = $scope.st.getTime();
            $scope.newEvent.endTime = $scope.et.getTime();
            $scope.initiator = $rootScope.userId;

            var result = commonServices.pushData('/events/', $scope.newEvent);

            $q.all([result]).then(function(data) {
                if (data[0]) {
                    console.log(data[0]);
                    $uibModalInstance.close();
                    swal({
                        text: "Adding Event",
                        type: 'success',
                        timer: 2500
                    });
                } else {
                    swal({
                        text: "Something happened....",
                        type: 'error',
                        timer: 2500
                    });
                }
            });



        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        angular.element(document).ready(function() {
            $("#phonenum").mask("(999)999-9999");
        });
    });
