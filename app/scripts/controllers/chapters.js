/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:ChaptersCtrl
 * @description
 * # ChaptersCtrl
 * Controller of the ohanaApp
 */
angular.module('ohanaApp')
  .controller('ChaptersCtrl', function(commonServices, $scope, $rootScope, $q, $http, $filter, $location, NgMap) {
    'use strict';

    var urlParams = $location.search();

    $scope.locationFilter = urlParams.zipCode;

    $scope.ZipUpdate = function() {
      var result = commonServices.addressLookup($scope.locationFilter, function(callbackResult) {
        if (callbackResult.success == true) {
          $scope.locationUpdate(callbackResult.results);
        }
      });
    };

    $scope.ZipUpdate();

    $scope.locationUpdate = function(location) {
      var ctrl = this;
      commonServices.zipCompare(location).then(function(result) {
        $scope.chapters = _.filter($rootScope.siteData.chapters, function(n) {
          return n.region === result[1].value;
        });

      });

    };

  });
