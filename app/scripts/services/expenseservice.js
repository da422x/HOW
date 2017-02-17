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

            var expenselist = [];
            switch (userRole) {
                case 'Volunteer':
                case 'Participant':
                    var ref = firebase.database().ref('/expense').orderByChild("email").equalTo(useremail);
                    break;
                case 'Chapter Lead':
                    // case 'National Staff':

                    var ref = firebase.database().ref('/expense').orderByChild("Chapter").equalTo(Chapter);
                    break;
                default:
                    var ref = firebase.database().ref('/expense').orderByChild("SubmitDate");
                    break;
            }

            var viewExpenseList = $firebaseArray(ref);

            return viewExpenseList;
        }

        //expense dash data 
        this.getlast12month = function() {

            var today = new Date();
            var theMonths = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
            var montharray = [];
            var aMonth = today.getMonth();
            // console.log("current mon", aMonth, today.getMonth() - 1);
            var i;
            for (i = 0; i < 13; i++) {
                if (i != 0) {
                    montharray.push(theMonths[aMonth]);
                }
                aMonth++;
                if (aMonth > 11) {
                    aMonth = 0;
                }
            }
            return montharray;
        }

        //expense dash data 
        this.getlast12monthyear = function() {

            var today = new Date();
            var theMonths = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
            var montharray = [];

            var makeDate = new Date(today);
            makeDate = new Date(makeDate.setMonth(makeDate.getMonth() - 12));
            var ayear = makeDate.getFullYear();
            var aMonth = makeDate.getMonth();

            // console.log("current mon", aMonth, today.getMonth(), ayear, makeDate, today.toString("MMMM"));
            var i;
            for (i = 0; i < 13; i++) {

                // console.log("month", theMonths[aMonth], aMonth, i, " xxx ", makeDate, makeDate.getFullYear(), montharray);
                if (i != 0) {

                    montharray.push(theMonths[aMonth] + '-' + makeDate.getFullYear());
                }
                aMonth++;

                if (aMonth > 11) {
                    aMonth = 0;
                }
                makeDate = new Date(makeDate.setMonth(makeDate.getMonth() + 1));
            }
            return montharray;
        }

        this.getPastDue = function(eventdate) {

            var currentdate = new Date();
            var mdyy = eventdate.toString().split('/');
            var receivedDate = new Date(mdyy[2], mdyy[0] - 1, mdyy[1]);
            var pastdue = Math.round((currentdate.setHours(0, 0, 0, 0) - receivedDate) / (1000 * 60 * 60 * 24));
            // console.log("Past Due result", pastdue);
            //console.log("due", pastdue, currentdate, receivedDate);
            return pastdue;
        }

        this.getEditStatusrec = function() {

            var ref = firebase.database().ref('/expense').orderByChild("PaymentStatus").equalTo("Edit");
            var editExpenseList = $firebaseArray(ref);
            return editExpenseList;
        }

        this.getEditExpenseData = function(billid) {

            var ref = firebase.database().ref('/expense').orderByChild("BillId").equalTo(billid);
            var expense = $firebaseArray(ref);
            return expense;
        }


        this.GetViewExpenseTableData = function(useremail, userRole, Chapter) {

            // console.log("Get Data", useremail, userRole, Chapter, startdate, enddate, paystatus);
            var expenselist = [];
            var expenselistdata = [];
            var ref = '';
            switch (userRole) {
                case 'Volunteer':
                case 'Participant':
                    ref = firebase.database().ref('/expense').orderByChild("email").equalTo(useremail);
                    console.log("ref-1");
                    break;
                case 'Chapter Lead':
                    ref = firebase.database().ref('/expense').orderByChild("Chapter").equalTo(Chapter);
                    console.log("ref-2");
                    break;
                case 'National Staff':
                case 'admin':
                    ref = firebase.database().ref('/expense'); //.orderByChild("SubmitDate");\
                    console.log("ref-3");
                    break;
            }

            var viewExpenseList = [];
            // var expensearray = [];

            // var ref = firebase.database().ref('/expense').orderByChild("SubmitDate");
            viewExpenseList = $firebaseArray(ref);
            // console.log("view ", viewExpenseList, ref);
            return viewExpenseList;
            // var currentdate = new Date();

            // viewExpenseList.$loaded(function(list) {
            //         // viewExpenseList.$loaded().then(function(list) {
            //         expensearray = [];

            //         // console.log("key ", list, list.length, expensearray);
            //         for (var i = 0; i < list.length; i++) {
            //             // console.log("SubmitDate - ", list[i].SubmitDate);
            //             var mdyy = list[i].SubmitDate.toString().split('/');
            //             var receivedDate = new Date(mdyy[2], mdyy[0] - 1, mdyy[1]);
            //             var pastdue = 0;

            //             // get current date with 12AM .setHours(0, 0, 0, 0)
            //             if (list[i].PaymentStatus != 'Paid' && list[i].PaymentStatus != 'Over Age') {
            //                 pastdue = Math.round((currentdate.setHours(0, 0, 0, 0) - receivedDate) / (1000 * 60 * 60 * 24));
            //             } else
            //                 pastdue = '';

            //             if (searchtype == 'edit' && list[i].PaymentStatus == 'Edit') {
            //                 // && list[i].PaymentStatus != 'Over Age') {

            //                 expensearray.push({
            //                     "SubmitDate": list[i].SubmitDate,
            //                     "SubmitBy": list[i].SubmitBy,
            //                     "eventdate": list[i].eventdate,
            //                     "Chapter": list[i].Chapter,
            //                     "Amount": list[i].Amount,
            //                     "PaymentStatus": list[i].PaymentStatus,
            //                     "pastdue": pastdue,
            //                     "BillId": list[i].BillId
            //                 });
            //                 // console.log("Edit - ", expensearray, searchtype, list[i].PaymentStatus);
            //             } else {
            //                 if (searchtype != 'edit') {
            //                     expensearray.push({
            //                         "SubmitDate": list[i].SubmitDate,
            //                         "SubmitBy": list[i].SubmitBy,
            //                         "eventdate": list[i].eventdate,
            //                         "Chapter": list[i].Chapter,
            //                         "Amount": list[i].Amount,
            //                         "PaymentStatus": list[i].PaymentStatus,
            //                         "pastdue": pastdue,
            //                         "BillId": list[i].BillId
            //                     });
            //                     // console.log("Non-Edit - ", expensearray, searchtype, list[i].PaymentStatus);
            //                 }
            //             }
            //         }

            //         //date filter
            //         // var ViewExpenseFilter = datefilter(expensearray, startdate, enddate, paystatus);
            //         //use other methods for the $firebaseArray object
            //         var retArray = [];
            //         if (expensearray != null && startdate != null && enddate != null) {

            //             angular.forEach(expensearray, function(obj) {

            //                 var receivedDate = obj.SubmitDate;

            //                 if (Date.parse(receivedDate) >= Date.parse(startdate) && Date.parse(receivedDate) <= Date.parse(enddate)) {
            //                     retArray.push(obj);
            //                     // console.log("Date ", Date.parse(receivedDate), receivedDate, startdate, enddate, retArray);
            //                 }
            //             });
            //         }
            //         var retResults = [];
            //         if (paystatus != null && retArray != null && paystatus != '') {
            //             angular.forEach(retArray, function(obj) {

            //                 var tpaystatus = obj.PaymentStatus;

            //                 if (tpaystatus == paystatus) {
            //                     retResults.push(obj);
            //                     //console.log("paystatus ", retArray, retResults, paystatus, tpaystatus);
            //                 }

            //             });
            //         } else
            //             retResults = retArray;
            //         // console.log("key expe array", expensearray, retArray, retResults);


            //         angular.element(document).ready(function() {
            //             //toggle `popup` / `inline` mode
            //             $.fn.editable.defaults.mode = 'popup';
            //             $.fn.editable.defaults.ajaxOptions = {
            //                 type: 'PUT'
            //             };
            //             //if exists, destroy instance of table
            //             if ($.fn.DataTable.isDataTable($('#expenseTable'))) {
            //                 $('#expenseTable').DataTable().destroy();
            //             }

            //             var table = $('#expenseTable').DataTable({
            //                 responsive: true,
            //                 autoWidth: false,
            //                 data: retResults,
            //                 "fnRowCallback": function(nRow, data, iDisplayIndex, iDisplayIndexFull) {
            //                     if ((data.pastdue > 30 && data.pastdue < 45) && (data.PaymentStatus != 'Paid' && data.PaymentStatus != 'Over Age')) {
            //                         $(nRow).css('color', 'red')
            //                     }


            //                     if (data.pastdue > 44 && (data.PaymentStatus != 'Paid' && data.PaymentStatus != 'Over Age')) {
            //                         $(nRow).css('color', 'red')
            //                         $(nRow).css('font-weight', 'bold');
            //                         $(nRow).css('background-color', 'yellow');
            //                         $(nRow).css('font-size', '16px');
            //                     }
            //                 },
            //                 "pagingType": "full_numbers",
            //                 columns: [{}, {
            //                     data: "Chapter",
            //                     width: "60px"
            //                 }, {
            //                     data: "SubmitDate",
            //                     width: "50px"
            //                 }, {
            //                     data: "SubmitBy",
            //                     width: "60px"
            //                 }, {
            //                     data: "eventdate",
            //                     width: "60px"
            //                 }, {
            //                     data: "Amount",
            //                     width: "60px",
            //                     render: $.fn.dataTable.render.number(',', '.', 2)
            //                 }, {
            //                     data: "PaymentStatus",
            //                     width: "60px"
            //                 }, {
            //                     data: "pastdue",
            //                     width: "60px",

            //                 }],
            //                 'columnDefs': [{
            //                     targets: 0,
            //                     searchable: false,
            //                     orderable: false,
            //                     className: 'dt-body-center',
            //                     visible: userRole == 'National Staff',
            //                     render: function() {
            //                         return '<input type="checkbox" id="membersTable-select">';
            //                     }
            //                 }, {
            //                     targets: 1,
            //                     visible: userRole == 'National Staff'
            //                 }, {
            //                     targets: 4,
            //                     width: '50px'
            //                 }, {
            //                     targets: 6,
            //                     width: '90px'
            //                 }],
            //                 'order': [
            //                     [7, 'desc']
            //                 ],
            //                 headerCallback: function(thead) {
            //                     if (userRole == 'National Staff') {
            //                         $(thead).find('th').eq(0).html('<input type="checkbox" id="expenseTable-select-all">');
            //                     }
            //                 },
            //                 rowCallback: function(row, data, index) {
            //                     $(row).find('input[type="checkbox"]').eq(0).attr('value', data.BillId)

            //                 },

            //             });


            //             $('#expenseTable').dataTable().yadcf([{

            //                     column_number: 1,
            //                     select_type: 'chosen',
            //                     filter_default_label: "Chapter"

            //                 }, {

            //                     column_number: 2,
            //                     select_type: 'chosen',
            //                     filter_default_label: "Submit Date"

            //                 }, {
            //                     column_number: 3,
            //                     select_type: 'chosen',
            //                     filter_default_label: "Expense Originator Name"
            //                 },

            //                 {
            //                     column_number: 4,
            //                     select_type: 'chosen',
            //                     filter_default_label: "Event Date"

            //                 }, {
            //                     column_number: 5,
            //                     select_type: 'chosen',
            //                     filter_default_label: "Amount"

            //                 }, {
            //                     column_number: 6,
            //                     select_type: 'chosen',
            //                     filter_default_label: "Payment Status"

            //                 }, {
            //                     column_number: 7,
            //                     select_type: 'chosen',
            //                     filter_default_label: "Past Due"

            //                 }
            //             ]);

            //             // var table = $('#expenseTable').DataTable();

            //             $('#expenseTable tbody').on('click', 'tr', function() {
            //                 var data = table.row(this).data();
            //                 // alert('You clicked on ' + data.BillId + '\'s row');
            //                 window.location = "#/expense/expensedetail/" + data.BillId;
            //             });

            //             // Handle click on "Select all" control
            //             $('#expenseTable-select-all').on('click', function() {
            //                 // Get all rows with search applied
            //                 var rows = table.rows({
            //                     'search': 'applied'
            //                 }).nodes();
            //                 // Check/uncheck checkboxes for all rows in the table
            //                 $('input[type="checkbox"]', rows).prop('checked', this.checked);
            //             });

            //             // Handle click on checkbox to set state of "Select all" control
            //             $('#expenseTable tbody').on('change', 'input[type="checkbox"]', function() {
            //                 // If checkbox is not checked
            //                 if (!this.checked) {
            //                     var el = $('#expenseTable-select-all').get(0);
            //                     // If "Select all" control is checked and has 'indeterminate' property
            //                     if (el && el.checked && ('indeterminate' in el)) {
            //                         // Set visual state of "Select all" control
            //                         // as 'indeterminate'
            //                         el.indeterminate = true;
            //                     }
            //                 }
            //             });

            //         });

            //     })
            //     .catch(function(error) {
            //         console.error("error", error);
            //     });

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
         *        Expense Supporting Documents - Images         *
         *******************************************************/

        this.deleteImage = function(Imagename, Imagearray) {

            // Create a reference to the file to delete
            var storageRef = firebase.storage().ref();
            var desertRef = storageRef.child(Imagename);
            var newDataList = [];
            console.log("Image Aarray - 0 ", Imagearray, newDataList);
            desertRef.delete().then(function() {
                console.log('success : - ', Imagename, ' Image Deleted');
                swal(
                    'Removed!',
                    'Your supporting document file has been removed.',
                    'success'
                );
                // console.log('ImageList: 2 -' + Imagelist);
                angular.forEach(Imagearray, function(item) {
                    if (item.length) {
                        var i = 0;

                        for (var x = 0; x < item.length; x++) {
                            if (item[x].ImageName != Imagename) {
                                newDataList.push(item[x]);
                            }
                        }
                    }
                });
                console.log("Image Aarray -  1 ", Imagearray, newDataList);

            }).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log('ERROR: ' + error.code + ': ' + error.message);
                console.log('Image - ', Imagename, ' Removal Failed');
            });
        }

        this.deleteImagearray = function(Imagearray, imgname) {

            // Create a reference to the file to delete

            var newDataList = [];
            angular.forEach(Imagearray, function(item) {
                if (item.length) {
                    var i = 0;

                    for (var x = 0; x < item.length; x++) {
                        if (item[x].ImageName != imgname) {
                            newDataList.push(item[x]);
                        }
                    }
                }
            });
            console.log("Image Aarray - ", Imagearray, newDataList);

            return newDataList;

        }


        this.SaveImageData = function(UniqueBillId, imageinfo) {

            // $scope.uploader.queue[i].file.name

            var imageobj = {};
            // var inp = document.getElementById('fileimage');
            console.log("file image ", imageinfo[0].file.name);

            for (var i = 0; i < imageinfo.length; ++i) {
                var filename = imageinfo[i].file.name
                    //inp.files.item(i).name;


                var _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];
                var blnValid = false;
                for (var j = 0; j < _validFileExtensions.length; j++) {
                    var sCurExtension = _validFileExtensions[j];

                    if (filename.substr(filename.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {

                        var storage = firebase.storage();

                        var file = imageinfo[i]._file;
                        //document.getElementById("fileimage").files[i];
                        console.log("load file - ", file);

                        var storageRef = firebase.storage().ref();
                        var path = storageRef.fullPath

                        var filelocname = 'images/' + UniqueBillId + '_' + file.name;

                        storageRef.child(filelocname).put(file).then(function(snapshot) {
                            if (snapshot !== undefined) {



                                return storageRef.child(filelocname).getDownloadURL()
                                    .then(function(url) {
                                        console.log("Image func - ", url);
                                        return url;



                                    })
                               // console.log('Uploaded a blob or file!');
                            }

                        });

                    }
                }
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
