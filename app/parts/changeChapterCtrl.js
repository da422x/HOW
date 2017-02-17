/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:ChangeChapterCtrl
 * @description
 * # ChangeChapterCtrl
 * Controller of the ohanaApp
 */
angular.module('ohanaApp')
    .controller('ChangeChapterCtrl', function($q, commonServices, userService, $scope, $rootScope, $uibModalInstance) {
        'use strict';

        $scope.chapters = [];
        $scope.regions = $rootScope.siteData.regionsChapters;

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
            $rootScope.$broadcast('modalClosing');
        };

        $scope.regionUpdate = function(selectedRegion) {
            _.each($scope.regions, function(region) {
                if (selectedRegion.value === region.value) {
                    $scope.chapters = region.chapters;
                }
            });
        };

        $scope.updateRegionChapter = function() {
            var userId = userService.getId();
            commonServices.updateData('/userData/' + userId + '/Region', $scope.newRegion.value);
            commonServices.updateData('/userData/' + userId + '/Chapter', $scope.newChapter.value);
            $uibModalInstance.dismiss('cancel');
            $rootScope.$broadcast('updateProfile', true);
            swal("Success", "Region/Chapter updated successfully!", "success");
        }

    });
