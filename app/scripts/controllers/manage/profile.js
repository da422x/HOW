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
    .controller('ProfileCtrl', function($scope, $rootScope, $q, commonServices, localStorageService, $uibModal) {
        'use strict';

        $scope.update = function() {
            var userUID = localStorageService.get('sessionUserUID');
            var userData = commonServices.getData('/userData/' + userUID);
            var userRole = localStorageService.get('sessionUserRole');
            var userRquests = commonServices.getData('/roleChangeRequests/');

            $q.all([userData, userRquests]).then(function(data) {
                $scope.profileData = data[0];
                $scope.profileData.role = userRole;
                $scope.userUID = userUID;
                $scope.requests = [];
                _.each(data[1], function(value, key) {
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

        $('#user_dob').editable({
            type: 'combodate',
            name: 'DOB',
            placement: 'bottom',
            emptytext: 'null',
            format: 'YYYY-MM-DD',
            viewformat: 'MM/DD/YYYY',
            template: 'MMM / DD / YYYY',
            combodate: {
                template: 'MMM / DD / YYYY',
                minYear: 1900,
                axYear: 2020
            },
            url: function(params) {
                var packet = params.value;
                var path = '/userData/' + $scope.userUID + '/DOB/';
                commonServices.updateData(path, packet);
            }
        });

        $('#user_gender').editable({
            type: 'select',
            name: 'gender',
            placement: 'bottom',
            emptytext: 'null',
            showbuttons: false,
            url: function(params) {
                var packet = params.value;
                var path = '/userData/' + $scope.userUID + '/gender/';
                commonServices.updateData(path, packet);
            },
            source: [{
                value: 'M',
                text: 'M'
            }, {
                value: 'F',
                text: 'F'
            }, {
                value: 'N/A',
                text: 'N/A'
            }]
        });

        $('#user_phone').editable({
            type: 'number',
            name: 'phone',
            placement: 'bottom',
            emptytext: 'null',
            min: '1000000000',
            max: '9999999999',
            showbuttons: true,
            url: function(params) {
                var packet = params.value;
                var path = '/userData/' + $scope.userUID + '/phone/';
                commonServices.updateData(path, packet);
            }
        });

        $('#user_region').editable({
            type: 'select',
            name: 'region',
            placement: 'bottom',
            emptytext: 'null',
            showbuttons: false,
            url: function(params) {
                var packet = params.value;
                var path = '/userData/' + $scope.userUID + '/Region/';
                commonServices.updateData(path, packet);
            },
            source: $rootScope.siteData.regions
        });

        $('#user_chapter').editable({
            type: 'select',
            name: 'chapter',
            placement: 'bottom',
            emptytext: 'null',
            showbuttons: false,
            url: function(params) {
                var packet = params.value;
                var path = '/userData/' + $scope.userUID + '/Chapter/';
                commonServices.updateData(path, packet);
            },
            source: function() {
                var regionText = $(this).parent().parent().find('#user_region').text();
                switch (regionText) {
                    case 'Midwest Chapters':
                        return $rootScope.siteData.regionsChapters[0].chapters;
                        break;
                    case 'Northeast Chapters':
                        return $rootScope.siteData.regionsChapters[1].chapters;
                        break;
                    case 'Pacific Chapters':
                        return $rootScope.siteData.regionsChapters[2].chapters;
                        break;
                    case 'Rocky Mountain Chapters':
                        return $rootScope.siteData.regionsChapters[3].chapters;
                        break;
                    case 'Southeast Chapters':
                        return $rootScope.siteData.regionsChapters[4].chapters;
                        break;
                    case 'Southwest Region':
                        return $rootScope.siteData.regionsChapters[5].chapters;
                        break;
                    default:
                        return [{
                            value: '',
                            text: ''
                        }];
                }
                
            }
        });

    });
