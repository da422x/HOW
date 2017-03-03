'use strict';

/**
 * @ngdoc function
 * @name ohanaApp.controller:ExpenseExpenseconfigCtrl
 * @description
 * # ExpenseExpenseconfigCtrl
 * Controller of the ohanaApp
 */
angular.module('ohanaApp')
    .controller('ExpenseExpenseconfigCtrl', function($scope, commonServices, userService, $q, $location) {

        $scope.ConfigLog = [];
        $scope.expenseconfig = [];
        $scope.ConfigLog.length = 0;
        $scope.expenseconfig.length = 0;
        $scope.expenseconfigdata = [];

        $scope.opened = {};

        $scope.open = function($event, elementOpened) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened[elementOpened] = !$scope.opened[elementOpened];
        };

        $scope.expenseconfig.startdate = new Date();
        $scope.expenseconfig.enddate = new Date();
        $scope.expenseconfig = [];
        $scope.expenseconfig.length = 0;

        $scope.saveConfig = function(data, id) {

            $scope.expenseconfigdata.push({
                id: id,
                startdate: $scope.expenseconfig[id - 1].startdate,
                enddate: $scope.expenseconfig[id - 1].enddate,
                MileRate: $scope.expenseconfig[id - 1].MileRate,
                TrailerRate: $scope.expenseconfig[id - 1].TrailerRate,
                OverAgeWarning: $scope.expenseconfig[id - 1].OverAgeWarning,
                OverAgeError: $scope.expenseconfig[id - 1].OverAgeError,
                OverAgeDays: $scope.expenseconfig[id - 1].OverAgeDays,
            });

            $scope.expenseconfigdata.push(data);

            angular.extend(data, {
                id: id
            });

            // $scope.expenseconfig = $scope.expenseconfigdata;
            $scope.updateconfigdata();
            console.log("save ", data, id, $scope.expenseconfigdata);
        };

        // remove user
        $scope.removeConfig = function(index) {
            $scope.expenseconfig.splice(index, 1);
            // $scope.expenseconfig = $scope.expenseconfigdata;
            $scope.updateconfigdata();
        };

        // add user
        $scope.addConfig = function() {
            var recid = 0;

            if ($scope.expenseconfig !== undefined) {
                recid = $scope.expenseconfig.length + 1;
                $scope.inserted = {
                    "id": $scope.expenseconfig.length + 1,
                    "startdate": '',
                    "enddate": '',
                    "MileRate": 0,
                    "TrailerRate": 0,
                    "OverAgeWarning": 0,
                    "OverAgeError": 0,
                    "OverAgeDays": 0

                };


                console.log("good");
            } else {
                console.log("emo");
                $scope.expenseconfig = [];
                $scope.inserted = {
                    "id": 1,
                    "startdate": '',
                    "enddate": '',
                    "MileRate": 0,
                    "TrailerRate": 0,
                    "OverAgeWarning": 0,
                    "OverAgeError": 0,
                    "OverAgeDays": 0

                };

            }


            $scope.expenseconfig.push($scope.inserted);
        };

        //---------------


        //Initial Config Load

        function loadexpenseconfig() {
            $scope.expenseconfig = [];
            $scope.expenseconfig.length = 0;
            $scope.ConfigLog = [];
            $scope.ConfigLog.length = 0;
            console.log("Entry");
            commonServices.getData('/Config/')
                .then(function(data) {
                    if (data) {
                        $scope.ConfigLog = data.ExpenseLog;
                        $scope.expenseconfig = data.Expense;
                        $scope.$apply(function() {});
                        $scope.buildConfigData();
                        // console.log("Entry2", $scope.ConfigLog);
                    } else {
                        $scope.expenseconfig.push({
                            "id": 1,
                            "startdate": '',
                            "enddate": '',
                            "MileRate": 0,
                            "TrailerRate": 0,
                            "OverAgeWarning": 0,
                            "OverAgeError": 0,
                            "OverAgeDays": 0

                        });
                        $scope.ConfigLog = [];
                        console.log("Entry3");
                    }

                })
                .catch(function(error) {
                    console.log("Entry4");
                    $scope.expenseconfig = [];
                    $scope.ConfigLog = [];
                });

            // $scope.buildConfigData();

        }

        loadexpenseconfig();


        //Go Back to View Expense Page
        $scope.GoBack = function() {
            $location.path('/expense/viewexpense');
        }

        $scope.updateconfigdata = function() {
            $scope.userName = userService.getUserData();
            var StatusChangedBy = $scope.userName.name.first + ' ' + $scope.userName.name.last;

            var currentdate = new Date();
            var StatusChangedDate = "";
            if (currentdate.getHours() > 12) {
                StatusChangedDate = currentdate.getFullYear() + '-' + ("0" + (currentdate.getMonth() + 1)).slice(-2) + '-' + ("0" + currentdate.getDate()).slice(-2) + ' ' + ("0" + (currentdate.getHours() - 12)).slice(-2) + ':' + ("0" + currentdate.getMinutes()).slice(-2) + ':' + ("0" + currentdate.getSeconds()).slice(-2) + ' PM';
            } else {
                StatusChangedDate = currentdate.getFullYear() + '-' + ("0" + (currentdate.getMonth() + 1)).slice(-2) + '-' + ("0" + currentdate.getDate()).slice(-2) + ' ' + ("0" + currentdate.getHours()).slice(-2) + ':' + ("0" + currentdate.getMinutes()).slice(-2) + ':' + ("0" + currentdate.getSeconds()).slice(-2) + ' AM';

            }

            $scope.ConfigLog.push({
                "StatusBy": StatusChangedBy,
                "StatusDate": StatusChangedDate
            });


            for (var x = 0; x < $scope.ConfigLog.length; x++) {
                if ($scope.ConfigLog[x] != null) {
                    delete $scope.ConfigLog[x].$$hashKey;
                }
            }
            for (var x = 0; x < $scope.expenseconfig.length; x++) {
                if ($scope.expenseconfig[x] != null) {
                    delete $scope.expenseconfig[x].$$hashKey;
                }
            }
            $scope.config = {
                Expense: $scope.expenseconfig,
                ExpenseLog: $scope.ConfigLog
            }


            // This is to update configuration value
            commonServices.updateData('/Config/', $scope.config);
            // console.log("called", $scope.config);
            swal({
                text: "Updated Expense Config",
                type: 'success',
                timer: 2500
            })
            loadexpenseconfig();
            $scope.buildConfigData();


        }

        //Build Expense Amount Data Table for viewing expense
        $scope.buildConfigData = function() {

            angular.element(document).ready(function() {
                //toggle `popup` / `inline` mode
                $.fn.editable.defaults.mode = 'popup';
                $.fn.editable.defaults.ajaxOptions = {
                    type: 'PUT'
                };
                //if exists, destroy instance of table
                if ($.fn.DataTable.isDataTable($('#ConfigStatusTable'))) {
                    $scope.EVTable.destroy();
                }
                // var selected = [];
                $scope.EVTable = $('#ConfigStatusTable').removeAttr('width').DataTable({
                    responsive: true,
                    autoWidth: false,
                    data: $scope.ConfigLog, // tabledata,
                    scrollY: "200px",
                    // scrollX: false,
                    scrollCollapse: true,
                    paging: false,

                    // fixedColumns: true,
                    // "pagingType": "full_numbers",

                    columns: [{
                        data: "StatusDate",
                        title: "Status Date",
                        width: "70px"
                    }, {
                        data: "StatusBy",
                        title: "Status By",
                        width: "90px",

                    }],
                    'columnDefs': [{
                            targets: 0,
                            width: "25%"
                        }, {
                            targets: 1,
                            width: "35%"
                        }



                    ],
                    'order': [
                        [0, 'desc']
                    ],



                });




            });

        }

    });
