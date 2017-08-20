/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc directive
 * @name ohanaApp.directive:masterFooter
 * @description
 * # masterFooter
 */
angular.module('ohanaApp').directive('masterFooter', function() {
  'use strict';
  return {
    templateUrl: 'views/masterfooter.html',
    restrict: 'E',

    controller: function($scope) {},
  };
});
