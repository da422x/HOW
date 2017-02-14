/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * 
 */
angular.module('ohanaApp')
    .controller('ProfileCtrl', function($scope, $rootScope, $q, commonServices, $uibModal, userService, $filter, $http) {
        'use strict';

        $scope.$on('updateProfile', function(event, arg) {
            if (arg) {
                $scope.update();
            }
        });

        $scope.update = function() {
            var userRquests = commonServices.getData('/roleChangeRequests/');

            $q.all([userRquests]).then(function(data) {
                $scope.profileData = userService.getUserData();
                $scope.profileData.role = userService.getRole();
                console.log($scope.profileData);
                $scope.userUID = userService.getId();;
                $scope.requests = [];
                _.each(data[0], function(value, key) {
                    if (value.uid === $scope.userUID) {
                        value.key = key;
                        $scope.requests.push(value);
                    }
                });
            });

        };

        $scope.$on('modalClosing', function() {
            $scope.update();
        });

        $scope.rcs_status = false;

        $scope.rcs_show = function() {
            if ($scope.rcs_status) {
                $scope.rcs_status = false;
                $scope.update();
            } else {
                $scope.rcs_status = true;
                $scope.update();
            }
        };

        $scope.roleChangeRequest = function() {
            var modalInstance = $uibModal.open({
                templateUrl: '/parts/rolerequestchangeform.html',
                controller: 'RoleRequestChangeFormCtrl as rrcf',
                resolve: {
                    userInfo: function() {
                        return {
                            uid: $scope.userUID,
                            data: $scope.profileData
                        }
                    }
                }
            });
            if (!modalInstance) {
                $scope.update();
            }
        };

        $scope.deleteRequest = function(key) {
            console.log(key);
            swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(function() {
                swal(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                ).then(function() {
                    commonServices.removeData('/roleChangeRequests/' + key);
                    $scope.update();
                });
            });
        };

        $scope.opened = {};

        $scope.open = function($event, elementOpened) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened[elementOpened] = !$scope.opened[elementOpened];
        };

        $scope.saveUserData = function(value, typeOfData) {
            var firebaseTable = null;
            console.log(value);

            switch (typeOfData) {
                case "name.first":
                    firebaseTable = "/name/first/"
                    break;
                case "name.last":
                    firebaseTable = "/name/last/"
                    break;
                case "address.line1":
                    firebaseTable = "/address/line1/"
                    break;
                case "address.line2":
                    firebaseTable = "/address/line2/"
                    break;
                case "address.city":
                    firebaseTable = "/address/city/"
                    break;
                case "address.state":
                    firebaseTable = "/address/state/"
                    break;
                case "address.zip":
                    firebaseTable = "/address/zip/"
                    break;
                case "phone":
                    firebaseTable = "/phone/";
                    break;
                case "Region":
                    firebaseTable = "/Region/";
                    $scope.updateChapterDropdown(value);
                    break;
                case "Chapter":
                    firebaseTable = "/Chapter/";
                    break;
                case "DOB":
                    firebaseTable = "/DOB/";
                    break;
                case "branch":
                    firebaseTable = "/branch/";
                    break;
                case "gender":
                    firebaseTable = "/gender/";
                    break;
            }

            var packet = value;
            var tempData = userService.getUserData();
            var path = '/userData/' + $scope.userUID + firebaseTable;
            commonServices.updateData(path, packet);

            function tree_traverse(obj_data, path, length_of_arr) {
                var next_length = length_of_arr - 1;
                if (path.includes('.')) {
                    tree_traverse(obj_data[path.split('.')[0]], path.split('.')[1], next_length);
                } else {
                    obj_data[path] = value;
                }
            }

            if (typeOfData.includes('.')) {
                tree_traverse($rootScope.userData, typeOfData, typeOfData.split('.').length);
            } else {
                $rootScope.userData[typeOfData] = value;
            }
            userService.setUserData($rootScope.userData);

            return true;
        }

        $scope.changeChapter = function() {
            var modalInstance = $uibModal.open({
                templateUrl: '/parts/changechapter.html',
                controller: 'ChangeChapterCtrl'
            });
        };

        $scope.editChapters = function() {
            var modalInstance = $uibModal.open({
                templateUrl: '/parts/manageadditionalchapters.html',
                controller: 'ManageAdditionalChapters'
            });
        };

        $(document).on("focus", ".mask", function() {
            $(this).mask("(999) 999-9999?");
        });

    });
