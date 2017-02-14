/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:ManageAdditionalChapters
 * @description
 * # ManageAdditionalChapters
 * Controller of the ohanaApp
 */
angular.module('ohanaApp')
    .controller('ManageAdditionalChapters', function($q, commonServices, userService, $scope, $rootScope, $uibModalInstance) {
        'use strict';

        $scope.userData = userService.getUserData();
        $scope.userChapters = [];
        $scope.submitFlag = false;

        _.each($scope.userData.Chapters, function(n) {
            $scope.userChapters.push(n);
        });

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

        $scope.addChapter = function() {
            var chapterObj = {
                region: $scope.newRegion.value,
                chapter: $scope.newChapter.value
            }
            $scope.userChapters.push(chapterObj);
        };

        $scope.updateChapters = function() {
            var i = 0;
            var userId = userService.getId();
            var userData = userService.getUserData();

            _.each($scope.userChapters, function() {
                delete $scope.userChapters[i].$$hashKey;
                i++
            });

            // Update global variables, and Database.
            commonServices.updateData('/userData/' + userId + '/Chapters/', $scope.userChapters);
            userData.Chapters = $scope.userChapters;
            userService.setUserData(userData);

            // Close modal with success message.
            $uibModalInstance.dismiss('cancel');
            $rootScope.$broadcast('updateProfile', true);
            swal("Success", "Region/Chapter updated successfully!", "success");
        }

        $scope.removeChapter = function() {
            $scope.userChapters = _.filter($scope.userChapters, function(n) {
                return n.chapter !== $scope.currentChapter[0].chapter;
            });
            $scope.submitFlag = true;
        }

    });
