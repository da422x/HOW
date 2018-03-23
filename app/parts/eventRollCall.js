/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:EventRollCall
 * @description
 * # EventRollCall
 * Controller of the ohanaApp
 */
angular
  .module('ohanaApp')
  .controller('EventRollCall', function(
    eventData,
    $rootScope,
    $q,
    commonServices,
    $scope,
    $uibModalInstance,
    $uibModal
  ) {
    'use strict';

    $scope.eventData = eventData;

    
  });
