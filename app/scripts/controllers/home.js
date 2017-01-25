/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of public homepage
 */
angular.module('ohanaApp')
    .controller('HomeCtrl', function($scope, $location) {
        'use strict';

        $scope.vidtoggle = false;

        $scope.zipCode = "";

        $scope.videoToggle = function() {
            if ($scope.vidtoggle) {
                $scope.vidtoggle = false;
                $('#videoplayer').each(function() {
                    this.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
                });
            } else if (!$scope.vidtoggle) {
                $scope.vidtoggle = true;
            } else {
                $scope.vidtoggle = false;
                $('#videoplayer').each(function() {
                    this.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                });
            }
        };

        $scope.chapterSearch = function() {
            $location.path('/chapters').search({
                zipCode: $scope.zipCode
            });
        }

    });
