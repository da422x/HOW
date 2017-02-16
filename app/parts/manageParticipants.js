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

        $scope.event = event;
        $scope.new_row = {
            first: "",
            middle: "",
            last: "",
            email: "",
            phone: ""
        }
        $scope.buildTable = function() {
            var i;
            var packet;
            var dataSet = [{
                key: 'hai',
                first: 'Thaddeus',
                middle: 'Ivan',
                last: 'Madison',
                email: 'thaddeus.madison@gmail.com',
                phone: '5044604713'
            }, {
                key: 'hai2',
                first: 'Bobby',
                middle: '',
                last: 'Salas',
                email: 'bobby.salas@gmail.com',
                phone: '9874563814'
            }] //dataGridUtil.buildMembersTableData(results);
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
                            return '<input type="checkbox" id="participantsTable-select">';
                        }
                    }],
                    'order': [
                        [1, 'desc']
                    ],
                    headerCallback: function(thead) {},
                    rowCallback: function(row, data, index) {

                    },
                    drawCallback: function(settings) {}
                });

                console.log($scope.participantsTable);
            })
        }

        $scope.buildTable();

    });
