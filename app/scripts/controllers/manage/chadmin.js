/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:ChadminCtrl
 * @description
 * # ChadminCtrl
 * Controller of management console - chapter administration
 */
angular.module('ohanaApp')
    .controller('ChadminCtrl', function($rootScope, $q, commonServices, $scope, $uibModal, dataGridUtil, userService) {
        'use strict';

        $scope.$on('modalClosing', function() {
            $scope.update();
        });

        $scope.buildTable = function(results) {
            var i;
            var packet;
            var dataSet = dataGridUtil.buildChaptersTableData(results);
            $scope.currId = ""; // holds value of the current row's member Id for CRUD ops
            $scope.checkedBoxes = [];

            angular.element(document).ready(function() {
                //toggle `popup` / `inline` mode
                $.fn.editable.defaults.mode = 'popup';
                $.fn.editable.defaults.ajaxOptions = {
                    type: 'PUT'
                };

                //if exists, destroy instance of table
                if ($.fn.DataTable.isDataTable($('#chaptersTable'))) {
                    $scope.chaptersTable.destroy();
                }

                $scope.chaptersTable = $('#chaptersTable').DataTable({
                    // ajax: 'testData/members.json',
                    data: dataSet,
                    columns: [{}, {
                        title: "KEY",
                        data: "key"
                    }, {
                        title: "First Name",
                        data: "first"
                    }, {
                        title: "Last Name",
                        data: "last"
                    }, {
                        title: "DOB",
                        data: "dob"
                    }, {
                        title: "Email",
                        data: "email",
                        orderable: false
                    }, {
                        title: "Mobile #",
                        data: "phone",
                        orderable: false
                    }, {
                        title: "Role",
                        data: "role"
                    }, {
                        title: "Region",
                        data: "region"
                    }, {
                        title: "Chapter",
                        data: "chapter"
                    }, {
                        title: "Mil. Affil.",
                        data: "branch",
                        orderable: false
                    }, {
                        title: "Notes",
                        data: "notes",
                        orderable: false
                    }],
                    'columnDefs': [{
                        targets: 1,
                        visible: false
                    }, {
                        targets: 0,
                        searchable: false,
                        orderable: false,
                        className: 'dt-body-center',
                        render: function() {
                            return '<input type="checkbox" id="chaptersTable-select">';
                        }
                    }, {
                        targets: 3,
                        width: '50px'
                    }, {
                        targets: 5,
                        width: '90px'
                    }],
                    'order': [
                        [3, 'asc']
                    ],
                    headerCallback: function(thead) {
                        $(thead).find('th').eq(0).html('<input type="checkbox" id="chaptersTable-select-all">');
                    },
                    rowCallback: function(row, data, index) {
                        $(row).find('input[type="checkbox"]').eq(0).attr('value', data.key)
                        $(row).children().eq(1).addClass('tdFname');
                        $(row).children().eq(2).addClass('tdLname');
                        $(row).children().eq(3).addClass('tdDob');
                        $(row).children().eq(4).addClass('tdEmail'); // email checking disabled
                        $(row).children().eq(5).addClass('tdTelly'); // phone # checking disabled
                        $(row).children().eq(6).addClass('tdSelectRole');
                        $(row).children().eq(7).addClass('tdSelectRegion');
                        $(row).children().eq(8).addClass('tdSelectChapter');
                        $(row).children().eq(9).addClass('tdMil');
                        $(row).children().eq(10).addClass('tdNotes');
                        for (i = 1; i < 10; i++) {
                            $(row).children().eq(i).wrapInner('<a class="editable editable-click" style="border: none;"></a>');
                        }
                        return row;
                    },
                    drawCallback: function(settings) {
                        // set currentId to user being edited
                        $('#chaptersTable').off('click', 'tr');
                        $('#chaptersTable').on('click', 'tr', function() {
                            $scope.currId = $(this).find('input[type="checkbox"]').val();

                            if ($(this).find('input[type="checkbox"]').is(':checked')) {
                                $scope.checkedBoxes.push($scope.currId);
                            } else {
                                for (var i = 0; i < $scope.checkedBoxes.length; i++) {
                                    if ($scope.checkedBoxes[i] === $scope.currId) {
                                        $scope.checkedBoxes.splice(i, 1);
                                    }
                                }
                            }
                        });
                        // editable field definitions and CRUD ops
                        $('#chaptersTable .tdFname a').editable({
                            type: "text",
                            name: "first",
                            placement: "bottom",
                            emptytext: "null",
                            url: function(params) {
                                var packet = params.value;
                                var path = '/userData/' + $scope.currId + '/name/first/';
                                commonServices.updateData(path, packet);
                                if ($scope.currId === userService.getId()) {
                                    var tempData = userService.getUserData();
                                    tempData.name.first = packet;
                                    userService.setUserData(tempData);
                                    userService.setUserName(tempData.name.first, tempData.name.last);
                                }
                            }
                        });
                        $('#chaptersTable .tdLname a').editable({
                            type: "text",
                            name: "last",
                            placement: "bottom",
                            emptytext: "null",
                            url: function(params) {
                                var packet = params.value
                                var path = '/userData/' + $scope.currId + '/name/last/';
                                commonServices.updateData(path, packet);
                                if ($scope.currId === userService.getId()) {
                                    var tempData = userService.getUserData();
                                    tempData.name.last = packet;
                                    userService.setUserData(tempData);
                                    userService.setUserName(tempData.name.first, tempData.name.last);
                                }
                            }
                        });
                        $('#chaptersTable .tdDob a').editable({
                            type: "combodate",
                            name: "DOB",
                            placement: "bottom",
                            emptytext: "null",
                            format: 'MM/DD/YYYY',
                            viewformat: 'MM/DD/YYYY',
                            template: 'MMM / DD / YYYY',
                            combodate: {
                                template: 'MMM / DD / YYYY',
                                minYear: 1900,
                                maxYear: 2020
                            },
                            url: function(params) {
                                var packet = params.value;
                                var path = '/userData/' + $scope.currId + '/DOB/';
                                commonServices.updateData(path, packet);
                                if ($scope.currId === userService.getId()) {
                                    var tempData = userService.getUserData();
                                    tempData.DOB = packet;
                                    userService.setUserData(tempData);
                                }
                            }
                        });
                        $('#chaptersTable .tdEmail a').editable({
                            type: "email",
                            name: "email",
                            placement: "bottom",
                            emptytext: "null",
                            url: function(params) {
                                var packet = params.value
                                var path = '/userData/' + $scope.currId + '/email/';
                                commonServices.updateData(path, packet);
                                if ($scope.currId === userService.getId()) {
                                    var tempData = userService.getUserData();
                                    tempData.email = packet;
                                    userService.setUserData(tempData);
                                }
                            }
                        });
                        $('#chaptersTable .tdTelly a').editable({
                            type: "text",
                            name: "phone",
                            placement: "bottom",
                            emptytext: "null",
                            tpl: '<input type="text" id ="zipiddemo" class="mask form-control  input-sm dd" style="padding-right: 24px;">',
                            url: function(params) {
                                var packet = params.value
                                var path = '/userData/' + $scope.currId + '/phone/';
                                commonServices.updateData(path, packet);
                                if ($scope.currId === userService.getId()) {
                                    var tempData = userService.getUserData();
                                    tempData.phone = packet;
                                    userService.setUserData(tempData);
                                }
                            }
                        });

                        angular.element(document).ready(function() {
                            $("#phonenum").mask("(999)999-9999");
                        });

                        $('#chaptersTable .tdSelectRole a').editable({
                            type: "select",
                            name: "role",
                            placement: "bottom",
                            emptytext: "null",
                            showbuttons: false,
                            url: function(params) {
                                var packet = {
                                    role: params.value
                                }
                                var path = '/userRoles/' + $scope.currId;
                                commonServices.updateData(path, packet);
                                if ($scope.currId === userService.getId()) {
                                    userService.setRole(packet);
                                }
                            },
                            source: function() {
                                var currentUserRole = $rootScope.userRole;
                                if (currentUserRole === 'admin') {
                                    return $rootScope.siteData.roles;
                                } else {
                                    var newRoles = ['Participant', 'Volunteer', 'Chapter Lead']
                                    return newRoles;
                                }
                            }
                        });
                        $('#chaptersTable .tdSelectRegion a').editable({
                            type: "select",
                            name: "region",
                            placement: "bottom",
                            emptytext: "null",
                            showbuttons: false,
                            url: function(params) {
                                var packet = params.value;
                                var path = '/userData/' + $scope.currId + '/Region/';
                                commonServices.updateData(path, packet);
                                if ($scope.currId === userService.getId()) {
                                    var tempData = userService.getUserData();
                                    tempData.Region = packet;
                                    userService.setUserData(tempData);
                                }
                            },
                            source: $rootScope.siteData.regions
                        });
                        $('#chaptersTable .tdSelectChapter a').editable({
                            type: "select",
                            name: "chapter",
                            placement: "bottom",
                            emptytext: "null",
                            showbuttons: false,
                            url: function(params) {
                                var packet = params.value;
                                var path = '/userData/' + $scope.currId + '/Chapter/';
                                commonServices.updateData(path, packet);
                                if ($scope.currId === userService.getId()) {
                                    var tempData = userService.getUserData();
                                    tempData.Chapter = packet;
                                    userService.setUserData(tempData);
                                    userService.setChapter(packet);
                                }
                            },
                            source: function() {
                                var regionText = $(this).parent().parent().find('.tdSelectRegion').text();
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
                        $('#chaptersTable .tdMil a').editable({
                            type: "text",
                            name: "branch",
                            placement: "bottom",
                            emptytext: "null",
                            url: function(params) {
                                var packet = params.value
                                var path = '/userData/' + $scope.currId + '/branch/';
                                commonServices.updateData(path, packet);
                                if ($scope.currId === userService.getId()) {
                                    var tempData = userService.getUserData();
                                    tempData.branch = packet;
                                    userService.setUserData(tempData);
                                }
                            }
                        });
                        $('#chaptersTable .tdNotes a').editable({
                            type: "textarea",
                            name: "notes",
                            placement: "bottom",
                            emptytext: "null",
                            url: function(params) {
                                // TO-DO: Set up notes functionality
                            }
                        });
                    }
                });

                // Handle click on "Select all" control
                $('#chaptersTable-select-all').on('click', function() {
                    // Get all rows with search applied
                    var rows = $scope.chaptersTable.rows({
                        'search': 'applied'
                    }).nodes();
                    // Check/uncheck checkboxes for all rows in the table
                    $('input[type="checkbox"]', rows).prop('checked', this.checked);
                });

                // Handle click on checkbox to set state of "Select all" control
                $('#chaptersTable tbody').on('change', 'input[type="checkbox"]', function() {
                    // If checkbox is not checked
                    if (!this.checked) {
                        var el = $('#chaptersTable-select-all').get(0);
                        // If "Select all" control is checked and has 'indeterminate' property
                        if (el && el.checked && ('indeterminate' in el)) {
                            // Set visual state of "Select all" control
                            // as 'indeterminate'
                            el.indeterminate = true;
                        }
                    }
                });
            }); // end document ready
        }; // end $scope.buildTable

        $scope.update = function() {
            var newRegionsSet = commonServices.getData('/Regions/');
            var currentUserRole = userService.getRole();
            var currentUserData = userService.getUserData();
            $q.all([newRegionsSet]).then(function(chapterData) {
                var chapters = [],
                    regions = [],
                    keys = [];
                var i = 0;

                _.each(chapterData[0], function(value, key) {
                    switch (currentUserRole) {
                        case 'admin':
                            regions.push(value);
                            keys.push(key);
                            break;
                        case 'Chapter Lead':
                            if (value.role === 'Participant' || value.role === 'Volunteer' || value.role === 'Chapter Lead') {
                                regions.push(value);
                                keys.push(key);
                            }
                            break;
                        default:
                            console.log('should not be here');
                    }
                });

                _.each(keys, function() {
                    _.each(chapterData[0], function(value, key) {
                        switch (currentUserRole) {
                            case 'admin':
                                if (keys[i] === key) {
                                    value.key = key;
                                    value.regions = regions[i];
                                    chapters.push(value);
                                }
                                break;
                            case 'National Staff':
                                if (keys[i] === key) {
                                    value.key = key;
                                    value.regions = regions[i];
                                    chapters.push(value);
                                }
                                break;
                            case 'Chapter Lead':
                                if (keys[i] === key && (currentUserData.Chapter === value.Chapter)) {
                                    value.key = key;
                                    value.regions = regions[i];
                                    chapters.push(value);
                                }
                                break;
                            default:
                                console.log('should not be here');
                        }
                    });
                    i++;
                });
                $scope.buildTable(users);
            });
        }; // end $scope.update

        $scope.addChapter = function() {
            console.log();
            var modalInstance = $uibModal.open({
                templateUrl: '/parts/managerolechangerequest.html',
                controller: 'ManageRoleChangeRequestCtrl'
            });
        };

        $scope.removeChapter = function() {
            if ($scope.checkedBoxes.length === 0) {
                swal('', 'No records selected!', 'warning');
            } else {
                swal({
                    title: 'Are you sure?',
                    text: "Get ready to kiss it goodbye!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then(function() {
                    _.each($scope.checkedBoxes, function(userKey) {
                        commonServices.removeData('/userData/' + userKey);
                        commonServices.removeData('/userRoles/' + userKey);
                    });
                    swal('Deleted!', 'Your file has been deleted.', 'success');
                    $scope.update();
                });
            } // end else

        }; // end $scope.remove

    });
