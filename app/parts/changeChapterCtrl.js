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
    .controller('ChangeChapterCtrl', ['selectedUID', '$scope', '$rootScope', '$q', 'commonServices', 'userService', '$uibModalInstance',
        function(selectedUID, $scope, $rootScope, $q, commonServices, userService, $uibModalInstance) {
            'use strict';

            $scope.chapters = [];
            $scope.regions = $rootScope.siteData.regionsChapters;

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };

            $scope.regionUpdate = function(selectedRegion) {
                // Update chapter drop down based on selected region.
                _.each($scope.regions, function(region) {
                    if (selectedRegion.value === region.value) {
                        $scope.chapters = region.chapters;
                    }
                });
            };

            $scope.updateRegionChapter = function(region, chapter) {
                if (selectedUID) {

                    // Get new values and update DB.
                    commonServices.updateData('/userData/' + selectedUID + '/Region', region.value);
                    commonServices.updateData('/userData/' + selectedUID + '/Chapter', chapter.value);

                    // Close modal with success message.
                    $uibModalInstance.dismiss('cancel');
                    $rootScope.$broadcast('modalClosing');
                    swal("Success", "Region/Chapter updated successfully!", "success");


                } else {

                    // Get new values and update DB.
                    var userId = userService.getId();
                    var userData = userService.getUserData();
                    commonServices.updateData('/userData/' + userId + '/Region', region.value);
                    commonServices.updateData('/userData/' + userId + '/Chapter', chapter.value);

                    // Update global variables.
                    userData.Region = region.value;
                    userData.Chapter = chapter.value;
                    userService.setUserData(userData);
                    userService.setChapter(chapter.value);

                    // Close modal with success message.
                    $uibModalInstance.dismiss('cancel');
                    $rootScope.$broadcast('updateProfile', true);
                    swal("Success", "Region/Chapter updated successfully!", "success");

                }
            }
        }
    ]);
