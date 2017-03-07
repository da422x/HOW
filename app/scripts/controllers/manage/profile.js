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
                $scope.profileData.years = parseInt($scope.profileData.years);
                $scope.profileData.role = userService.getRole();
                $scope.userUID = userService.getId();;
                $scope.requests = [];
                _.each(data[0], function(value, key) {
                    if (value.uid === $scope.userUID) {
                        value.key = key;
                        $scope.requests.push(value);
                    }
                });
                $scope.addEditableListeners();
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
                controller: 'RoleRequestChangeFormCtrl as rrcf'
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
                case "years":
                    firebaseTable = "/years/";
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
                templateUrl: '/parts/changeChapter.html',
                controller: 'ChangeChapterCtrl',
                resolve: {
                    selectedUID: function() {
                        return false;
                    }
                }
            });
        };

        $scope.editChapters = function() {
            var modalInstance = $uibModal.open({
                templateUrl: '/parts/manageadditionalchapters.html',
                controller: 'ManageAdditionalChapters',
                resolve: {
                    selectedUID: function() {
                        return false;
                    }
                }
            });
        };

        /*******************************************************
         *                 Editable functions                   *
         ********************************************************/

        $scope.addEditableListeners = function() {
            var states_list = [];
            _.each($rootScope.siteData.states, function(state) {
                states_list.push(state.name);
            });

            $('#profile_first_name').editable({
                type: 'text',
                name: 'first',
                placement: "bottom",
                emptytext: 'null',
                url: function(params) {
                    $scope.saveUserData(params.value, 'name.first');
                }
            });
            $('#profile_last_name').editable({
                type: 'text',
                name: 'last',
                placement: 'bottom',
                emptytext: 'null',
                url: function(params) {
                    $scope.saveUserData(params.value, 'name.last');
                }
            });
            $('#profile_dob').editable({
                type: 'combodate',
                name: 'dob',
                placement: 'bottom',
                emptytext: 'null',
                format: 'MM/DD/YYYY',
                viewformat: 'MM/DD/YYYY',
                template: 'MMM / DD / YYYY',
                combodate: {
                    template: 'MMM / DD / YYYY',
                    minYear: 1900,
                    maxYear: 2020
                },
                url: function(params) {
                    $scope.saveUserData(params.value, 'DOB');
                }
            });
            $('#profile_gender').editable({
                type: "select",
                name: "gender",
                placement: "bottom",
                emptytext: "null",
                showbuttons: false,
                url: function(params) {
                    $scope.saveUserData(params.value, 'gender');
                },
                source: function() {
                    return ['M', 'F', 'N/A'];
                }
            });
            $('#profile_addr1').editable({
                type: 'text',
                name: 'addr1',
                placement: 'bottom',
                emptytext: 'null',
                url: function(params) {
                    $scope.saveUserData(params.value, 'address.line1');
                }
            });
            $('#profile_addr2').editable({
                type: 'text',
                name: 'addr2',
                placement: 'bottom',
                emptytext: 'null',
                url: function(params) {
                    $scope.saveUserData(params.value, 'address.line2');
                }
            });
            $('#profile_city').editable({
                type: 'text',
                name: 'city',
                placement: 'bottom',
                emptytext: 'null',
                url: function(params) {
                    $scope.saveUserData(params.value, 'address.city');
                }
            });
            $('#profile_state').editable({
                type: "select",
                name: "state",
                placement: "bottom",
                emptytext: "null",
                showbuttons: false,
                url: function(params) {
                    $scope.saveUserData(params.value, 'address.state');
                },
                source: function() {
                    return states_list;
                }
            });
            $(document).on('click', '#profile_zip', function() {
                $("#profile_zip_num").mask("99999");
            });
            $('#profile_zip').editable({
                type: 'number',
                name: 'zip',
                placement: 'bottom',
                emptytext: 'null',
                tpl: '<input id="profile_zip_num">',
                url: function(params) {
                    $scope.saveUserData(params.value, 'address.zip');
                }
            });
            $(document).on('click', '#profile_phone', function() {
                $("#profile_phone_num").mask("(999)999-9999");
            });
            $('#profile_phone').editable({
                type: 'number',
                name: 'phone',
                placement: "bottom",
                emptytext: "null",
                tpl: '<input id="profile_phone_num">',
                url: function(params) {
                    $scope.saveUserData(params.value, 'phone');
                }
            });
            $('#profile_branch').editable({
                type: 'text',
                name: 'branch',
                placement: "bottom",
                emptytext: "null",
                url: function(params) {
                    $scope.saveUserData(params.value, 'branch');
                }
            });
            $('#profile_years').editable({
                type: 'number',
                name: 'years',
                placement: "bottom",
                emptytext: "null",
                url: function(params) {
                    $scope.saveUserData(params.value, 'years');
                }
            });
        }
    });
