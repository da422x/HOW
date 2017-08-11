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
    .controller('DetailsCtrl', function($http, $scope, $location, DAO, $routeParams, commonServices, $q) {
        'use strict';
        $scope.selectedEvent = null;
        // console.log('the route params are', $routeParams);
        var getEvents = commonServices.getData('/events/' + $routeParams["id"]);
        //match event to db
        $q.all([getEvents]).then(function(data) {
            console.log('hello me', data)
            if (data[0]) {
                $scope.selectedEvent = data[0];
                $scope.apply;
            } else {
                console.log(data);
            }
        }, function(err) {
            console.log('the error is', err);

        });

        //$scope.selectedEvent = DAO.selectedEvent;

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
