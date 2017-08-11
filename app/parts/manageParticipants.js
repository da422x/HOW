/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:ManageParticipantsCtrl
 * @description
 * # ManageParticipantsCtrl
 * Controller of the ohanaApp
 */
angular.module('ohanaApp')
    .controller('ManageParticipantsCtrl', function(event, $rootScope, $q, commonServices, $scope, $uibModalInstance) {
        'use strict';
        $scope.rows_selected = [];
        $scope.event = event;
        $scope.new_row = {
            key: "",
            name: {
                first: "",
                last: ""
            },
            email: "",
            phone: ""
        }

        // $scope.addParticipant = function() {
        //     commonServices.pushData('/events/' + $scope.event.key + '/participants', $scope.new_row);
        //     $scope.reloadData();
        // }

        $scope.addParticipant = function(email, key) {
            if (!email) {
                swal(
                    'Oops...',
                    "The email field is required.",
                    'error'
                );
            }
            email = email.trim();
            //check to see if the participant is a user at all. 
            commonServices.getUserByEmail(email)
                .then(function(data) {
                    if (data) {
                        var temp_key;
                        _.each(data, function(val, idx) {
                            temp_key = idx;
                            data[idx]["key"] = idx;
                        });

                        // commonServices.getData('userRoles/' + temp_key)
                        //     .then(function(role) {
                        // if (role["role"] !== "Participant") {
                        //check to see if the participant exists per this event
                        commonServices.getUserByEmailAtPath(email, '/events/' + key + '/participants')
                            .then(function(part) {
                                if (!part) {
                                    //check if the prospective participant is already signed up as a volunteer
                                    commonServices.getUserByEmailAtPath(email, '/events/' + key + '/volunteers')
                                        .then(function(vol) {
                                            if (vol) {
                                                //if they are a volunteer then remove them from the volunteer table
                                                var entity_key = Object.keys(vol)[0];
                                                commonServices.removeData('/events/' + key + '/volunteers/' + entity_key);
                                            }
                                            commonServices.pushData('/events/' + key + '/participants', data[temp_key]);
                                            $scope.reloadData();
                                        });
                                } else {
                                    swal(
                                        'Oops...',
                                        "That participant has already been added",
                                        'error'
                                    );
                                    $scope.reloadData();
                                }

                            })

                    } else {
                        //query for this event 
                        //if true, then say the guest has already been added
                        commonServices.getUserByEmailAtPath(email, '/events/' + key + '/participants')
                            .then(function(vol) {
                                console.log(vol);
                                if (!vol) {
                                    //if false, check if all the fields have been filled out.
                                    if ($scope.new_row.name.first && $scope.new_row.name.last && $scope.new_row.email && $scope.new_row.phone) {
                                        commonServices.pushData('/events/' + $scope.event.key + '/participants', $scope.new_row);
                                        swal(
                                            'Success',
                                            "The guest has been added successfully!",
                                            'success'
                                        );
                                        $scope.reloadData();
                                    } else {
                                        swal(
                                            'Oops...',
                                            "First name, Last name, email, and phone is required to register a guest",
                                            'error'
                                        );
                                        $scope.reloadData();
                                    }
                                } else {
                                    swal(
                                        'Oops...',
                                        "That guest has already been added",
                                        'error'
                                    );
                                    $scope.reloadData();
                                }
                            });

                        $scope.reloadData();
                    }

                }, function(err) {
                    swal(
                        'Oops...',
                        "Unknown Error",
                        'error'
                    );
                    $scope.reloadData();
                });


        }
        $scope.reloadData = function() {
            commonServices.getData('/events/' + $scope.event.key + '/participants')
                .then(function(data) {
                    $scope.event.participants = data;
                    $scope.buildTable();
                });
        }
        $scope.deleteParticipants = function() {
            $scope.rows_selected.forEach(function(val, idx) {
                commonServices.removeData('/events/' + $scope.event.key + '/participants/' + val);

            })
            $scope.reloadData();
        }

        $scope.buildTable = function() {
            var i;
            var packet;
            var dataSet = [];
            var tmp = ($scope.event.participants) ? Object.keys($scope.event.participants).forEach(function(val, idx) {
                $scope.event.participants[val]["key"] = val;
                dataSet.push($scope.event.participants[val]);
            }) : [];
            console.log('the dataset is ', dataSet)
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
                if ($.fn.DataTable.isDataTable($('#participantsTable'))) {
                    $scope.participantsTable.destroy();
                    console.log('inside the destroy');
                }

                $scope.participantsTable = $('#participantsTable').DataTable({
                    // ajax: 'testData/members.json',
                    data: dataSet,
                    // scrollX: true,
                    columns: [{
                        title: "KEY",
                        data: "key"
                    }, {
                        title: "First Name",
                        data: "name.first"
                    }, {
                        title: "Last Name",
                        data: "name.last"
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
                            return '<input type="checkbox" class="participantsTable-select">';
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
                        $('.participantsTable-select').on('click', function(e) {
                            var $row = $(this).closest('tr');

                            // Get row data
                            var data = $scope.participantsTable.row($row).data();

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

                console.log($scope.participantsTable);
            })
        }

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

    });
