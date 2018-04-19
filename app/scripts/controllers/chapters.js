/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:ChaptersCtrl
 * @description
 * # ChaptersCtrl
 * Controller of the ohanaApp
 */
angular
  .module('ohanaApp')
  .controller('ChaptersCtrl', function(
    commonServices,
    $scope,
    $rootScope,
    $q,
    $http,
    $filter,
    $location,
    NgMap
  ) {
    'use strict';

    var urlParams = $location.search();

    $scope.locationFilter = urlParams.zipCode;

    $scope.ZipUpdate = function() {
      var result = commonServices.addressLookup($scope.locationFilter, function(
        callbackResult
      ) {
        if (callbackResult.success == true) {
          $scope.locationUpdate(callbackResult.results);
        }
      });
    };

    $scope.ZipUpdate();

    $scope.locationUpdate = function(location) {
      var ctrl = this;
      commonServices.zipCompare(location).then(function(result) {
        var path = '/Regions/' + result[1].value + '/';
        var dataObject = commonServices.getData(path);
        $q.all([dataObject]).then(function(data) {
          var chapterNames = [];
          if (data[0]) {
            _.each(data[0], function(state) {
              _.each(state, function(chapter) {
                chapterNames.push(chapter);
              });
            });
          } else {
            console.log('Failed to get Chapters...');
          }
          $scope.chapters = chapterNames;
        });
      });
    };
  });
