/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:DetailsCtrl
 * @description
 * # DetailsCtrl
 * Controller of management console - event detail
 */
angular.module('ohanaApp')
    .controller('DetailsCtrl', function($http, $scope, $location, localStorageService, DAO) {
        'use strict';

        $scope.selectedEvent = DAO.selectedEvent;

        $scope.goBackToEvents = function() {
            $location.url('/manage/events');
        };

        $(document).ready(function() {
            $('.nav li a').click(function(e) {

                $('.nav li').removeClass('active');

                var $parent = $(this).parent();
                if (!$parent.hasClass('active')) {
                    $parent.addClass('active');
                }
                e.preventDefault();
            });
        });
    });
