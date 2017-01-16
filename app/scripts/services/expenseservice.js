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
                    "ID": "1",
                    "Description": "Mileage Rate - Travel @.25/mile",
                    "Quantity": 0, // this.exp.miles,
                    "Rate": 0.25,
                    "Amount": 0 //(this.exp.miles * .25)
                }, {
                    "ID": "2",
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

            switch (userRole) {
                case 'Volunteer':
                case 'Participant':
                    var ref = firebase.database().ref('/expense').orderByChild("email").equalTo(useremail);
                    break;
                case 'Leadership Team Member':
                case 'Chapter Lead':
                    var ref = firebase.database().ref('/expense').orderByChild("Chapter").equalTo(Chapter);
                    break;
                default:
                    var ref = firebase.database().ref('/expense').orderByChild("SubmitDate");
            }
            // var ref = firebase.database().ref('/expense').orderByChild("SubmitDate");
            var viewExpenseList = $firebaseArray(ref);

            //console.log("Service Expense ", viewExpenseList);
            return {
                viewExpenseList: viewExpenseList,
            }

        }


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
