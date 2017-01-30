'use strict';

/**
 * @ngdoc service
 * @name ohanaApp.expenseservice
 * @description
 * # expenseservice
 * Service in the ohanaApp.
 */
angular.module('ohanaApp')
    .service('expenseservice', function(filterFilter, $firebaseArray) {
        this.expense = {
            BillId: "",
            Chapter: "",
            eventdate: "",
            email: "",
            SubmitDate: "",
            SubmitBy: "",
            SubmitAddress: "",
            Description: "",
            PaymentStatus: "Pending",
            // PaymentStatusBy: "",
            // PaymentStatusDate: "",
            PaymentLog: [{
                PayStatus: "",
                PayStatusBy: "",
                PayStatusDate: "",
                PayRole: "",
                PayStatusDescription: ""
            }],
            Amount: 0,
            ImageURL: [],
            Line: [{
                    "ID": 1,
                    "Description": "Mileage Rate - Travel @.25/mile",
                    "Quantity": 0, // this.exp.miles,
                    "Rate": 0.25,
                    "Amount": 0 //(this.exp.miles * .25)
                }, {
                    "ID": 2,
                    "Description": "Trailer Mileage Rate @.40/mile",
                    "Quantity": 0, //this.exp.trailermiles,
                    "Rate": 0.4,
                    "Amount": 0 //(this.exp.trailermiles * .4)
                }

            ]

        }

        this.addNewImage = function(obj) {

            this.expense.ImageURL.push(obj);
        }

        this.addNewImage = function(obj, BillId) {

            this.expense.ImageURL.push(obj);
        }


        this.getExpense = function() {
            console.log("Get Expense", expense);
            return expense;
        };

        this.addNewList = function(line) {
            expense.Line.push()

        }

        this.getExpenseAt = function(_billid) {
            this.getExpense();
            return filterFilter(expense, {
                BillId: _billid
            })[0];
        };


        this.getExpenseChapterList = function() {
            return Chapterlist;
        }

        /******************************************************
         *  New Expense / Expense Detail - Other Expense Line  *
         *******************************************************/
        this.LineDetails = [{
            'Description': '',
            'Amount': 0
        }];

        this.addNew = function(LineDetails) {
            this.LineDetails.push({
                'Description': "",
                'Amount': 0
            });
            console.log("Other expense - New Line Added", this.LineDetails);
        };


        this.deleteExpense = function(BillId) {

            var query = firebase.database().ref('expense/').orderByChild("BillId").equalTo(BillId);
            query.on('child_added', function(snap) {
                var obj = snap.val();
                // console.log("key ", snap.key);
                firebase.database().ref('expense/' + snap.key).remove()
                    .then(function(data) {
                        console.log('success : - ', BillId, ' data Deleted');
                        swal('Expense Deleted Successfully!', '', 'success');
                    })
                    .catch(function(error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log('ERROR: ' + error.code + ': ' + error.message);
                        console.log('Expense - ', BillId, ' Removal Failed');
                    });
            });

        }
        /******************************************************
         *        View Expense                                 *
         *******************************************************/

        this.getViewExpenseData = function(useremail, userRole, Chapter) {


            //console.log("getViewExpenseData", useremail, userRole, Chapter);

            var expenselist = [];
            switch (userRole) {
                case 'Volunteer':
                case 'Participant':
                    var ref = firebase.database().ref('/expense').orderByChild("email").equalTo(useremail);
                    break;
                case 'Chapter Lead':
                case 'National Staff':
                    var ref = firebase.database().ref('/expense').orderByChild("Chapter").equalTo(Chapter);
                    break;
                default:
                    var ref = firebase.database().ref('/expense').orderByChild("SubmitDate");
            }
            var ref = firebase.database().ref('/expense').orderByChild("SubmitDate");
            var viewExpenseList = $firebaseArray(ref);

            console.log("Service Expense ", viewExpenseList);
            return {
                viewExpenseList: viewExpenseList,
            }



        }


        this.getPastDue = function(submitdate) {
            console.log("Past Due Test", submitdate);
            var currentdate = new Date();
            var mdyy = submitdate.split('/');
            var receivedDate = new Date(mdyy[2], mdyy[0] - 1, mdyy[1]);
            var pastdue = Math.round((currentdate - receivedDate) / (1000 * 60 * 60 * 24));
            console.log("Past Due result", pastdue);
            //console.log("due", pastdue, currentdate, receivedDate);
            return pastdue;
        }

        this.buildExpenseTableData = function(useremail, userRole, Chapter, startdate, enddate, paystatus, searchtype) {

            // console.log("Get Data", useremail, userRole, Chapter, startdate, enddate, paystatus);
            var expenselist = [];
            var expenselistdata = [];
            var ref = '';
            switch (userRole) {
                case 'Volunteer':
                case 'Participant':
                    ref = firebase.database().ref('/expense').orderByChild("email").equalTo(useremail);
                    break;
                case 'Chapter Lead':
                    ref = firebase.database().ref('/expense').orderByChild("Chapter").equalTo(Chapter);
                    break;
                case 'National Staff':
                case 'admin':
                    ref = firebase.database().ref('/expense'); //.orderByChild("SubmitDate");
                    break;
            }

            var viewExpenseList = [];
            var expensearray = [];
            // var ref = firebase.database().ref('/expense').orderByChild("SubmitDate");
            viewExpenseList = $firebaseArray(ref);
            // console.log("view ", viewExpenseList, ref);
            var currentdate = new Date();

            viewExpenseList.$loaded(function(list) {
                    // viewExpenseList.$loaded().then(function(list) {
                    expensearray = [];
                    // console.log("key ", list, list.length, expensearray);
                    for (var i = 0; i < list.length; i++) {
                        // console.log("SubmitDate - ", list[i].SubmitDate);
                        var mdyy = list[i].SubmitDate.toString().split('/');
                        var receivedDate = new Date(mdyy[2], mdyy[0] - 1, mdyy[1]);
                        var pastdue = 0;
                        if (list[i].PaymentStatus != 'Paid' && list[i].PaymentStatus != 'Over Age') {
                            pastdue = Math.round((currentdate - receivedDate) / (1000 * 60 * 60 * 24));
                        } else
                            pastdue = '';
                        if (searchtype == 'overdue' && list[i].PaymentStatus != 'Paid' && list[i].PaymentStatus != 'Over Age') {
                            expensearray.push({
                                "SubmitDate": list[i].SubmitDate,
                                "SubmitBy": list[i].SubmitBy,
                                "eventdate": list[i].eventdate,
                                "Chapter": list[i].Chapter,
                                "Amount": list[i].Amount,
                                "PaymentStatus": list[i].PaymentStatus,
                                "pastdue": pastdue,
                                "BillId": list[i].BillId
                            });
                        } else {
                            expensearray.push({
                                "SubmitDate": list[i].SubmitDate,
                                "SubmitBy": list[i].SubmitBy,
                                "eventdate": list[i].eventdate,
                                "Chapter": list[i].Chapter,
                                "Amount": list[i].Amount,
                                "PaymentStatus": list[i].PaymentStatus,
                                "pastdue": pastdue,
                                "BillId": list[i].BillId
                            });
                        }


                    }

                    //date filter
                    // var ViewExpenseFilter = datefilter(expensearray, startdate, enddate, paystatus);
                    //use other methods for the $firebaseArray object
                    var retArray = [];
                    if (expensearray != null && startdate != null && enddate != null) {

                        angular.forEach(expensearray, function(obj) {

                            var receivedDate = obj.SubmitDate;

                            if (Date.parse(receivedDate) >= Date.parse(startdate) && Date.parse(receivedDate) <= Date.parse(enddate)) {
                                retArray.push(obj);
                                // console.log("Date ", Date.parse(receivedDate), receivedDate, startdate, enddate, retArray);
                            }
                        });
                    }
                    var retResults = [];
                    if (paystatus != null && retArray != null && paystatus != '') {
                        angular.forEach(retArray, function(obj) {

                            var tpaystatus = obj.PaymentStatus;

                            if (tpaystatus == paystatus) {
                                retResults.push(obj);
                                //console.log("paystatus ", retArray, retResults, paystatus, tpaystatus);
                            }

                        });
                    } else
                        retResults = retArray;
                    // console.log("key expe array", expensearray, retArray, retResults);


                    angular.element(document).ready(function() {
                        //toggle `popup` / `inline` mode
                        $.fn.editable.defaults.mode = 'popup';
                        $.fn.editable.defaults.ajaxOptions = {
                            type: 'PUT'
                        };
                        //if exists, destroy instance of table
                        if ($.fn.DataTable.isDataTable($('#expenseTable'))) {
                            $('#expenseTable').DataTable().destroy();
                        }

                        var table = $('#expenseTable').DataTable({
                            responsive: true,
                            autoWidth: false,
                            data: retResults,
                            "fnRowCallback": function(nRow, data, iDisplayIndex, iDisplayIndexFull) {
                                if ((data.pastdue > 30 && data.pastdue < 45) && (data.PaymentStatus != 'Paid' && data.PaymentStatus != 'Over Age')) {
                                    $(nRow).css('color', 'red')
                                }


                                if (data.pastdue > 44 && (data.PaymentStatus != 'Paid' && data.PaymentStatus != 'Over Age')) {
                                    $(nRow).css('color', 'red')
                                    $(nRow).css('font-weight', 'bold');
                                    $(nRow).css('background-color', 'yellow');
                                    $(nRow).css('font-size', '16px');
                                }
                            },
                            "pagingType": "full_numbers",
                            columns: [{
                                data: "Chapter",
                                width: "60px"
                            }, {
                                data: "SubmitDate",
                                width: "50px"
                            }, {
                                data: "SubmitBy",
                                width: "60px"
                            }, {
                                data: "eventdate",
                                width: "60px"
                            }, {
                                data: "Amount",
                                width: "60px"
                            }, {
                                data: "PaymentStatus",
                                width: "60px"
                            }, {
                                data: "pastdue",
                                width: "60px",

                            }],
                            'columnDefs': [{
                                targets: 0,

                                visible: userRole == 'National Staff'
                            }, {
                                targets: 3,
                                width: '50px'
                            }, {
                                targets: 5,
                                width: '90px'
                            }],
                            'order': [
                                [6, 'desc']
                            ],



                        })


                        $('#expenseTable').dataTable().yadcf([{

                                column_number: 0,
                                select_type: 'chosen',
                                filter_default_label: "Chapter"

                            }, {

                                column_number: 1,
                                select_type: 'chosen',
                                filter_default_label: "Submit Date"

                            }, {
                                column_number: 2,
                                select_type: 'chosen',
                                filter_default_label: "Expense Originator Name"
                            },

                            {
                                column_number: 3,
                                select_type: 'chosen',
                                filter_default_label: "Event Date"

                            }, {
                                column_number: 4,
                                select_type: 'chosen',
                                filter_default_label: "Amount"

                            }, {
                                column_number: 5,
                                select_type: 'chosen',
                                filter_default_label: "Payment Status"

                            }, {
                                column_number: 6,
                                select_type: 'chosen',
                                filter_default_label: "Past Due"

                            }
                        ]);

                        // var table = $('#expenseTable').DataTable();

                        $('#expenseTable tbody').on('click', 'tr', function() {
                            var data = table.row(this).data();
                            // alert('You clicked on ' + data.BillId + '\'s row');
                            window.location = "#/expense/expensedetail/" + data.BillId;
                        });

                        // $('a.toggle-vis').on('click', function(e) {
                        //     e.preventDefault();
                        //     var column = table.column($(this).attr('data-column'));
                        //     //Toggle the visibility    
                        //     console.log("Data Table - Hide - ", userRole);


                        //     column.visible(!column.visible());
                        // });

                    });
                    // console.log("key expe array1", expensearray);
                    // return expensearray;

                })
                .catch(function(error) {
                    console.error("error", error);
                });
            // console.log("key expe array1", viewExpenseList);
            // return viewExpenseList;
            // console.log("key expe array1", viewExpenseList);
        };

        this.datefilter = function(input, startdate, enddate, paystatus) {

            var retArray = [];
            if (input != null && startdate != null && enddate != null) {

                angular.forEach(input, function(obj) {

                    var receivedDate = obj.SubmitDate;

                    if (Date.parse(receivedDate) >= Date.parse(startdate) && Date.parse(receivedDate) <= Date.parse(enddate)) {
                        retArray.push(obj);
                        console.log("Date ", Date.parse(receivedDate), receivedDate, startdate, enddate, retArray);
                    }
                });

                var retResults = [];
                if (paystatus != null && retArray != null && paystatus != '') {
                    angular.forEach(retArray, function(obj) {

                        var tpaystatus = obj.PaymentStatus;

                        if (tpaystatus == paystatus) {
                            retResults.push(obj);
                            console.log("paystatus ", retArray, retResults, paystatus, tpaystatus);
                        }

                    });
                } else
                    retResults = retArray;

                return retResults;
            };
        };

        /******************************************************
         *        REPORT                                *
         *******************************************************/


        this.buildTableBody = function(data, columns) {
            var body = [];
            body.push(columns);

            data.forEach(function(row) {
                var dataRow = [];

                columns.forEach(function(column) {
                    dataRow.push(row[column].toString());
                })

                body.push(dataRow);
            });
            return body;
        }

        this.table = function(data, columns) {
            console.log("Table Function inside", data, columns);
            return {
                style: 'demoTable',
                widths: ['60', '150', '60', '60', '60', '60', '60', '60', '200'],

                table: {
                    headerRows: 1,
                    body: this.buildTableBody(data, columns)
                }
            };
        }
    });
