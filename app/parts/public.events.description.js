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
    .controller('PublicEventsDescriptionCtrl', function($scope, $location, $uibModalInstance) {
        'use strict';

        // calendar options

        $scope.event = $scope.selected;
        console.log('In modal');
        console.log($scope.selected);
        $scope.popup = {
            opened: false
        };

        $scope.open = function() {
            $scope.popup.opened = true;
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.postRsvp = function() {
            $uibModalInstance.dismiss('cancel');
        }

    });
