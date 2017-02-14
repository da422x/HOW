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
            // Update chapter drop down based on selected region.
            _.each($scope.regions, function(region) {
                if (selectedRegion.value === region.value) {
                    $scope.chapters = region.chapters;
                }
            });
        };

        $scope.updateRegionChapter = function() {
            // Get new values and update DB.
            var userId = userService.getId();
            var userData = userService.getUserData();
            commonServices.updateData('/userData/' + userId + '/Region', $scope.newRegion.value);
            commonServices.updateData('/userData/' + userId + '/Chapter', $scope.newChapter.value);

            // Update global variables.
            userData.Region = $scope.newRegion.value;
            userData.Chapter = $scope.newChapter.value;
            userService.setUserData(userData);
            userService.setChapter($scope.newChapter.value);

            // Close modal with success message.
            $uibModalInstance.dismiss('cancel');
            $rootScope.$broadcast('updateProfile', true);
            swal("Success", "Region/Chapter updated successfully!", "success");
        }

    });
