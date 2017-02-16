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
    .controller('ManageAdditionalChapters', ['selectedUID', '$q', 'commonServices', 'userService', '$scope', '$rootScope', '$uibModalInstance',
        function(selectedUID, $q, commonServices, userService, $scope, $rootScope, $uibModalInstance) {
            'use strict';

            $scope.initialize = function() {
                $scope.submitFlag = false;
                $scope.userChapters = [];
                $scope.chapters = [];
                $scope.regions = $rootScope.siteData.regionsChapters;

                if (selectedUID) {
                    var selectedUserData = commonServices.getData('/userData/' + selectedUID);
                    $q.all([selectedUserData]).then(function(data) {
                        $scope.userData = data[0];
                        _.each($scope.userData.Chapters, function(n) {
                            $scope.userChapters.push(n);
                        });
                    });
                } else {
                    $scope.userData = userService.getUserData();
                    _.each($scope.userData.Chapters, function(n) {
                        $scope.userChapters.push(n);
                    });
                }

            }

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
                var canUpdate = true;
                var chapterObj = {
                    region: $scope.newRegion.value,
                    chapter: $scope.newChapter.value
                }

                _.each($scope.userChapters, function(n) {
                    if (n.chapter === $scope.newChapter.value) {
                        canUpdate = false;
                    }
                });

                if (canUpdate) {
                    $scope.userChapters.push(chapterObj);
                } else {
                    swal('error', $scope.newChapter.value + ' has already been added to secondary chapters...', 'error');
                }
            };

            $scope.updateChapters = function() {
                var i = 0;
                _.each($scope.userChapters, function(n) {
                    delete $scope.userChapters[i].$$hashKey;
                    i++
                });

                if (selectedUID) {

                    // Update global variables, and Database.
                    commonServices.updateData('/userData/' + selectedUID + '/Chapters/', $scope.userChapters);

                    // Close modal with success message.
                    $uibModalInstance.dismiss('cancel');
                    $rootScope.$broadcast('modalClosing');
                    swal('Success', 'Region/Chapter updated successfully!', 'success');

                } else {
                    var userId = userService.getId();
                    var userData = userService.getUserData();

                    // Update global variables, and Database.
                    commonServices.updateData('/userData/' + userId + '/Chapters/', $scope.userChapters);
                    userData.Chapters = $scope.userChapters;
                    userService.setUserData(userData);

                    // Close modal with success message.
                    $uibModalInstance.dismiss('cancel');
                    $rootScope.$broadcast('updateProfile', true);
                    swal('Success', 'Region/Chapter updated successfully!', 'success');
                }

            }

            $scope.removeChapter = function() {
                $scope.userChapters = _.filter($scope.userChapters, function(n) {
                    return n.chapter !== $scope.currentChapter[0].chapter;
                });
                $scope.submitFlag = true;
            }

        }
    ]);
