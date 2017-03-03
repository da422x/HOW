/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:ManageVolunteersCtrl
 * @description
 * # ManageVolunteersCtrl
 * Controller of the ohanaApp
 */
angular.module('ohanaApp')
    .controller('ManageVolunteersCtrl', function(event, $rootScope, $q, commonServices, $scope, $uibModalInstance) {
        'use strict';
        $scope.rows_selected = [];
        $scope.event = event;
        $scope.new_row = {
            key: "",
            first: "",
            middle: "",
            last: "",
            email: "",
            phone: ""
        }

        $scope.addVolunteer = function() {
            commonServices.pushData('/events/' + $scope.event.key + '/volunteers', $scope.new_row);
            $scope.reloadData();
        }
        $scope.reloadData = function() {
            commonServices.getData('/events/' + $scope.event.key + '/volunteers')
                .then(function(data) {
                    $scope.event.volunteers = data;
                    $scope.buildTable();
                });
        }
        $scope.deleteVolunteers = function() {
            $scope.rows_selected.forEach(function(val, idx) {
                commonServices.removeData('/events/' + $scope.event.key + '/volunteers/' + val);

            })
            $scope.reloadData();
        }

        $scope.buildTable = function() {
            var i;
            var packet;
            var dataSet = [];
            var tmp = ($scope.event.volunteers) ? Object.keys($scope.event.volunteers).forEach(function(val, idx) {
                $scope.event.volunteers[val]["key"] = val;
                dataSet.push($scope.event.volunteers[val]);
            }) : [];
            //dataGridUtil.buildMembersTableData(results);
            $scope.currId = ""; // holds value of the current row's member Id for CRUD ops
            $scope.checkedBoxes = [];

            angular.element(document).ready(function() {
                //toggle `popup` / `inline` mode
                $.fn.editable.defaults.mode = 'popup';
                $.fn.editable.defaults.ajaxOptions = {
                    type: 'PUT'
                };

                //if exists, destroy instance of table
                if ($.fn.DataTable.isDataTable($('#volunteersTable'))) {
                    $scope.volunteersTable.destroy();
                    console.log('inside the destroy');
                }

                $scope.volunteersTable = $('#volunteersTable').DataTable({
                    // ajax: 'testData/members.json',
                    data: dataSet,
                    // scrollX: true,
                    columns: [{
                        title: "KEY",
                        data: "key"
                    }, {
                        title: "First Name",
                        data: "first"
                    }, {
                        title: "Middle Name",
                        data: "middle"
                    }, {
                        title: "Last Name",
                        data: "last"
                    }, {
                        title: "Email",
                        data: "email",
                        orderable: false
                    }, {
                        title: "Mobile #",
                        data: "phone",
                        orderable: false
                    }],
                    'columnDefs': [{
                        targets: 0,
                        searchable: false,
                        orderable: false,
                        className: 'dt-body-center',
                        render: function() {
                            return '<input type="checkbox" class="volunteersTable-select">';
                        }
                    }],
                    'order': [
                        [1, 'desc']
                    ],
                    headerCallback: function(thead) {},
                    'rowCallback': function(row, data, dataIndex) {
                        // Get row ID
                        var rowId = data[0];

                        // If row ID is in the list of selected row IDs
                        if ($.inArray(rowId, $scope.rows_selected) !== -1) {
                            $(row).find('input[type="checkbox"]').prop('checked', true);
                            $(row).addClass('selected');
                        }
                    },
                    drawCallback: function(settings) {
                        // Handle click on checkbox
                        $('.volunteersTable-select').on('click', function(e) {
                            var $row = $(this).closest('tr');

                            // Get row data
                            var data = $scope.volunteersTable.row($row).data();

                            // Get row ID
                            var rowId = data["key"];

                            // Determine whether row ID is in the list of selected row IDs 
                            var index = $.inArray(rowId, $scope.rows_selected);

                            // If checkbox is checked and row ID is not in list of selected row IDs
                            if (this.checked && index === -1) {
                                $scope.rows_selected.push(rowId);

                                // Otherwise, if checkbox is not checked and row ID is in list of selected row IDs
                            } else if (!this.checked && index !== -1) {
                                $scope.rows_selected.splice(index, 1);
                            }

                            if (this.checked) {
                                $row.addClass('selected');
                            } else {
                                $row.removeClass('selected');
                            }
                            $scope.$apply();
                            // Update state of "Select all" control
                            // updateDataTableSelectAllCtrl(table);

                            // Prevent click event from propagating to parent
                            e.stopPropagation();
                        });

                    }
                });

                console.log($scope.volunteersTable);
            })
        }

        $scope.buildTable();

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

    });
