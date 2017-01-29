'use strict';

/**
 * @ngdoc function
 * @name ohanaApp.controller:ExpenseViewexpenseCtrl
 * @description
 * # ExpenseViewexpenseCtrl
 * Controller of the ohanaApp
 */
angular.module('ohanaApp')
    .controller('ViewExpenseController', function($scope, userService, $filter, $uibModal, expenseservice, commonServices, $q) {

        var self = this;
        var originalList = [];
        $scope.listS = "";
        $scope.lists = {};
        $scope.form = {};

        $scope.userlist = "";
        $scope.useremail = commonServices.getCurrentUserEmail();

        $scope.orderByField = 'SubmitDate';
        $scope.reverseSort = false;

        $scope.pageTitle = 'Search & Sort Table Records';
        $scope.sortType = 'SubmitDate'; // set the default sort type
        $scope.sortReverse = true; // set the default sort order
        $scope.searchText = ''; // set the default search/filter term

        //Go to New Expense Page
        $scope.neweexpense = function() {
            window.location = "#/expense/newexpense";
        }

        //---select
        $scope.selectedRow = null; // initialize our variable to null
        $scope.setClickedRow = function(index) { //function that sets the value of selectedRow to current index
            $scope.selectedRow = index;
        }

        //---Role Based information ---------------

        var userUID = userService.getId();
        var userData = commonServices.getData('/userData/' + userUID);
        $scope.userRole = userService.getRole();
        $scope.userName = userService.getUserData();
        $scope.userChapter = userService.getChapter();
        // var userRquests = commonServices.getData('/roleChangeRequests/');

        // $q.all([userData, userRquests]).then(function(data) {
        //     $scope.profileData = data[0];
        //     $scope.profileData.role = $scope.userRole;
        //     $scope.profilechapter = $scope.profileData.Chapter;
        //     $scope.userUID = userUID;

        // });
        $scope.Head = "";

        $scope.DateRangelist = [{
            name: 'Past Week',
            value: 'Past Week'
        }, {
            name: 'Past Month',
            value: 'Past Month'
        }, {
            name: 'Past 3 Month',
            value: 'Past 3 Month'
        }, {
            name: 'Past Year',
            value: 'Past Year'
        }, {
            name: 'Custom Range',
            value: 'Custom Range'
        }];
        $scope.DateFilter = $scope.DateRangelist[2];
        var currentdate = new Date();
        var firstday = new Date(currentdate - (1000 * 60 * 60 * 24 * 90));
        $scope.startdate = new Date(currentdate - (1000 * 60 * 60 * 24 * 90));
        $scope.disp_startdate = ($scope.startdate.getMonth() + 1) + '/' + +$scope.startdate.getDate() + '/' + $scope.startdate.getFullYear();
        $scope.disp_enddate = (currentdate.getMonth() + 1) + '/' + currentdate.getDate() + '/' + currentdate.getFullYear();

        // $scope.startdate = new Date(currentdate - (1000 * 60 * 60 * 24 * 90));
        $scope.enddate = currentdate;
        $scope.disp_filterdate = $scope.disp_startdate + ' - ' + $scope.disp_enddate;



        //Date Filter Change
        $scope.DateFilterChange = function() {

            switch ($scope.DateFilter.value) {
                case 'Past Week':
                    var currentdate = new Date();
                    $scope.startdate = new Date(currentdate - (1000 * 60 * 60 * 24 * 7));
                    $scope.enddate = currentdate;
                    $scope.disp_startdate = ($scope.startdate.getMonth() + 1) + '/' + +$scope.startdate.getDate() + '/' + $scope.startdate.getFullYear();
                    $scope.disp_enddate = (currentdate.getMonth() + 1) + '/' + currentdate.getDate() + '/' + currentdate.getFullYear();
                    $scope.disp_filterdate = $scope.disp_startdate + ' - ' + $scope.disp_enddate;
                    $scope.ExpenseSearch("normal");
                    break;

                case 'Past Month':
                    var currentdate = new Date();
                    $scope.startdate = new Date(currentdate - (1000 * 60 * 60 * 24 * 30));
                    $scope.enddate = currentdate;
                    $scope.disp_startdate = ($scope.startdate.getMonth() + 1) + '/' + +$scope.startdate.getDate() + '/' + $scope.startdate.getFullYear();
                    $scope.disp_enddate = (currentdate.getMonth() + 1) + '/' + currentdate.getDate() + '/' + currentdate.getFullYear();
                    $scope.disp_filterdate = $scope.disp_startdate + ' - ' + $scope.disp_enddate;
                    $scope.ExpenseSearch("normal");
                    break;

                case 'Past 3 Month':
                    var currentdate = new Date();
                    $scope.startdate = new Date(currentdate - (1000 * 60 * 60 * 24 * 90));
                    $scope.enddate = currentdate;
                    $scope.disp_startdate = ($scope.startdate.getMonth() + 1) + '/' + +$scope.startdate.getDate() + '/' + $scope.startdate.getFullYear();
                    $scope.disp_enddate = (currentdate.getMonth() + 1) + '/' + currentdate.getDate() + '/' + currentdate.getFullYear();
                    $scope.disp_filterdate = $scope.disp_startdate + ' - ' + $scope.disp_enddate;
                    $scope.ExpenseSearch("normal");
                    break;

                case 'Past Year':
                    var currentdate = new Date();
                    $scope.startdate = new Date(currentdate - (1000 * 60 * 60 * 24 * 365));
                    $scope.enddate = currentdate;
                    $scope.disp_startdate = ($scope.startdate.getMonth() + 1) + '/' + +$scope.startdate.getDate() + '/' + $scope.startdate.getFullYear();
                    $scope.disp_enddate = (currentdate.getMonth() + 1) + '/' + currentdate.getDate() + '/' + currentdate.getFullYear();
                    $scope.disp_filterdate = $scope.disp_startdate + ' - ' + $scope.disp_enddate;
                    $scope.ExpenseSearch("normal");
                    break;

                case 'Custom Range':
                    $scope.disp_startdate = '';
                    $scope.disp_enddate = '';
                    $scope.disp_filterdate = '';

                    break;

                    // case 'Overdue':
                    //     $scope.startdate = new Date(currentdate.getFullYear() - 5, 0, 1);
                    //     $scope.enddate = new Date(currentdate - (1000 * 60 * 60 * 24 * 30));
                    //     $scope.disp_startdate = ($scope.startdate.getMonth() + 1) + '/' + +$scope.startdate.getDate() + '/' + $scope.startdate.getFullYear();
                    //     $scope.disp_enddate = (scope.enddate.getMonth() + 1) + '/' + scope.enddate.getDate() + '/' + scope.enddate.getFullYear();
                    //     $scope.disp_filterdate = $scope.disp_startdate + ' - ' + $scope.disp_enddate;
                    //     $scope.ExpenseSearch();
                default:
                    break;

            }
        }

        // //----Modal -- Payment Status Log  ---------//
        // var $ctrl = this;

        // $scope.ok = function() {
        //     alert($scope.datefromto);
        //     console.log("modal ", $scope.$modalInstance.result);
        //     $scope.ExpenseSearch();
        //     $scope.$modalInstance.close();
        // };

        // $scope.cancel = function() {
        //     $scope.$modalInstance.dismiss('cancel');
        // };

        var LoggedUser = $scope.userName.name.first + ' ' + $scope.userName.name.last;




        switch ($scope.userRole) {
            case 'Volunteer':
            case 'Participant':
                $scope.HeadTitle = ' created by ' + LoggedUser;
                $scope.paystatuslist = [{
                    name: 'All',
                    value: ''
                }, {
                    name: 'Pending',
                    value: 'Pending'
                }, {
                    name: 'Submitted',
                    value: 'Submitted'
                }, {
                    name: 'Resubmit',
                    value: 'Resubmit'
                }, {
                    name: 'Approved',
                    value: 'Approved'
                }, {
                    name: 'Paid',
                    value: 'Paid'
                }, {
                    name: 'Over Age',
                    value: 'Over Age'
                }];
                $scope.PayStatus = $scope.paystatuslist[1];
                break;

            case 'Chapter Lead':
                $scope.HeadTitle = ' for ' + $scope.userChapter;
                $scope.paystatuslist = [{
                    name: 'All',
                    value: ''
                }, {
                    name: 'Pending',
                    value: 'Pending'
                }, {
                    name: 'Submitted',
                    value: 'Submitted'
                }, {
                    name: 'Resubmit',
                    value: 'Resubmit'
                }, {
                    name: 'Returned',
                    value: 'Returned'
                }, {
                    name: 'Approved',
                    value: 'Approved'
                }, {
                    name: 'Paid',
                    value: 'Paid'
                }, {
                    name: 'Over Age',
                    value: 'Over Age'
                }];
                $scope.PayStatus = $scope.paystatuslist[1];
                break;

            default:
                $scope.paystatuslist = [{
                    name: 'All',
                    value: ''
                }, {
                    name: 'Pending',
                    value: 'Pending'
                }, {
                    name: 'Submitted',
                    value: 'Submitted'
                }, {
                    name: 'Resubmit',
                    value: 'Resubmit'
                }, {
                    name: 'Returned',
                    value: 'Returned'
                }, {
                    name: 'Approved',
                    value: 'Approved'
                }, {
                    name: 'Paid',
                    value: 'Paid'
                }, {
                    name: 'Over Age',
                    value: 'Over Age'
                }];
                $scope.PayStatus = $scope.paystatuslist[2];
        }

        //---Past Due Days Calculation ---------
        $scope.getPastDue = function(submitdate) {
            var currentdate = new Date();
            var mdyy = submitdate.split('/');
            var receivedDate = new Date(mdyy[2], mdyy[0] - 1, mdyy[1]);
            var pastdue = Math.round((currentdate - receivedDate) / (1000 * 60 * 60 * 24));

            //console.log("due", pastdue, currentdate, receivedDate);
            return pastdue;
        }

        //------------UI Bootstrap Date -----START--------------//

        $scope.today = function() {
            $scope.startdate = firstday;
            $scope.enddate = currentdate;
        };

        $scope.today();

        $scope.dateopen = function() {
            $scope.popup.opened = true;
            $scope.disp_startdate = ($scope.startdate.getMonth() + 1) + '/' + +$scope.startdate.getDate() + '/' + $scope.startdate.getFullYear();
            $scope.$applyAsync();
        };

        $scope.dateopen1 = function() {
            $scope.popup1.opened = true;
            $scope.disp_enddate = ($scope.enddate.getMonth() + 1) + '/' + $scope.enddate.getDate() + '/' + $scope.enddate.getFullYear();
            $scope.$applyAsync();
        };


        $scope.clear = function() {
            $scope.startdate = new Date(currentdate.getFullYear(), 0, 1);
            $scope.enddate = currentdate;
        };

        $scope.dateOptions = {
            'year-format': "'yyyy'",
            'starting-day': 1
        };


        $scope.popup = {
            opened: false
        };
        $scope.popup1 = {
            opened: false
        };


        $scope.formats = ['MM/dd/yyyy'];
        $scope.format = $scope.formats[0];
        // 
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        $scope.ctrldate = {
            datetime: null
        };

        //------------UI Bootstrap Date -----END--------------//
        //----Past Due - Expense list function -------Start -----------//
        $scope.filterPastDue = function() {

            $scope.startdate = new Date(currentdate.getFullYear() - 5, 0, 1);
            $scope.enddate = new Date(currentdate - (1000 * 60 * 60 * 24 * 30));
            //(1000 * 60 * 60 * 24 * 60) - 60 Day prior calculation           

            switch ($scope.userRole) {
                case 'Volunteer':
                case 'Participant':
                    $scope.PayStatus = $scope.paystatuslist[1];

                    break;
                case 'Chapter Lead':

                    $scope.PayStatus = $scope.paystatuslist[1];
                    break;
                default:
                    $scope.PayStatus = $scope.paystatuslist[2];
            }
            $scope.disp_startdate = ($scope.startdate.getMonth() + 1) + '/' + +$scope.startdate.getDate() + '/' + $scope.startdate.getFullYear();
            $scope.disp_enddate = ($scope.enddate.getMonth() + 1) + '/' + $scope.enddate.getDate() + '/' + $scope.enddate.getFullYear();
            console.log($scope.userRole, $scope.PayStatus, $scope.startdate, $scope.enddate, $scope.disp_startdate, $scope.disp_enddate);
            $scope.DateFilter = $scope.DateRangelist[4];
            $scope.ExpenseSearch("Overdue");
        }

        //----Past Due - Expense list function -------END -----------//
        $scope.ExpenseSearch = function(searchtype) {
            console.log("SEARCH - ", $scope.useremail, $scope.userRole, $scope.userChapter, $scope.startdate, $scope.enddate, $scope.PayStatus.value);
            $scope.expensedataSet = expenseservice.buildExpenseTableData($scope.useremail, $scope.userRole, $scope.userChapter, $scope.startdate, $scope.enddate, $scope.PayStatus.value, searchtype);
            $scope.$applyAsync();

        }

        $scope.viewexpensedata = function() {

            //console.log("Service to be called", $scope.userChapter);
            // $scope.lists = expenseservice.getViewExpenseData($scope.useremail, $scope.userRole, $scope.userChapter);
            // originalList = $scope.lists.viewExpenseList;

            $scope.expensedataSet = expenseservice.buildExpenseTableData($scope.useremail, $scope.userRole, $scope.userChapter, $scope.startdate, $scope.enddate, $scope.PayStatus.value);
            $scope.$applyAsync();
            // console.log("Service to be called", $scope.expensedataSet);
            // angular.forEach($scope.expensedataSet, function(item) {
            //     console.log("Service to be called");
            // });

        }

        // var rptdata = [];
        var currentdate = new Date();
        var reportDate = (currentdate.getMonth() + 1) + '/' + currentdate.getDate() + '/' + currentdate.getFullYear();

        var GetTableData;



        //Get Report Data - Data fileterd based on Dropdown/Date value

        var GetJsonData = function() {
            var rptdata = [];
            var useremail = commonServices.getCurrentUserEmail();
            // $scope.userRole = $rootScope.userRole;
            // $scope.userName = $rootScope.userName;
            // $scope.userChapter = $rootScope.userChapter;
            angular.forEach($scope.lists, function(value, index) {

                    for (var i = 0; i < value.length; i++) {
                        // console.log("first list length", $scope.listS.length);
                        //$scope.listS === value[i].Chapter || $scope.listS === "") &&

                        console.log("first check - ", value[i].PaymentStatus, $scope.PayStatus.value);
                        console.log("second check - ", Date.parse(value[i].SubmitDate), Date.parse($scope.startdate), Date.parse($scope.enddate));
                        console.log("third check - ", $scope.userRole, value[i].email, useremail);

                        if ((value[i].PaymentStatus == $scope.PayStatus.value || $scope.PayStatus.value == "") &&
                            (Date.parse(value[i].SubmitDate) >= Date.parse($scope.startdate) && Date.parse(value[i].SubmitDate) <= Date.parse($scope.enddate)) &&
                            (($scope.userRole == 'Participant' || $scope.userRole == 'Volunteer') && (value[i].email == useremail))) {
                            var reportdata = {
                                "Date": value[i].eventdate,
                                "Business Purpose, Origin & Destination": value[i].Description,
                                "Miles Driven": parseInt(value[i].Line[0].Quantity),
                                "Travel @ .25/mile": numberWithCommas(Math.round(parseFloat(value[i].Line[0].Amount) * 100) / 100),
                                "Trailer Miles": parseInt(value[i].Line[1].Quantity),
                                "Trailer Hauling @ .40/mile": numberWithCommas(Math.round(parseFloat(value[i].Line[1].Amount) * 100) / 100),
                                "Other Expenses": numberWithCommas(Math.round(parseFloat(value[i].Line[2].Amount) * 100) / 100),
                                "Total": numberWithCommas(Math.round(parseFloat(value[i].Amount) * 100) / 100),
                                "Explanation of Other Expense": value[i].Line[2].Description
                            };

                            rptdata.push(reportdata);
                        }

                        if ((value[i].PaymentStatus == $scope.PayStatus.value || $scope.PayStatus.value == "") &&
                            (Date.parse(value[i].SubmitDate) >= Date.parse($scope.startdate) && Date.parse(value[i].SubmitDate) <= Date.parse($scope.enddate)) &&
                            ($scope.userRole == 'Chapter Lead' && $scope.userChapter == value[i].Chapter)) {
                            var reportdata = {
                                "Date": value[i].eventdate,
                                "Business Purpose, Origin & Destination": value[i].Description,
                                "Miles Driven": parseInt(value[i].Line[0].Quantity),
                                "Travel @ .25/mile": numberWithCommas(Math.round(parseFloat(value[i].Line[0].Amount) * 100) / 100),
                                "Trailer Miles": parseInt(value[i].Line[1].Quantity),
                                "Trailer Hauling @ .40/mile": numberWithCommas(Math.round(parseFloat(value[i].Line[1].Amount) * 100) / 100),
                                "Other Expenses": numberWithCommas(Math.round(parseFloat(value[i].Line[2].Amount) * 100) / 100),
                                "Total": numberWithCommas(Math.round(parseFloat(value[i].Amount) * 100) / 100),
                                "Explanation of Other Expense": value[i].Line[2].Description
                            };

                            rptdata.push(reportdata);
                        }

                        if ((value[i].PaymentStatus == $scope.PayStatus.value || $scope.PayStatus.value == "") &&
                            (Date.parse(value[i].SubmitDate) >= Date.parse($scope.startdate) && Date.parse(value[i].SubmitDate) <= Date.parse($scope.enddate)) &&
                            $scope.userRole == 'National Staff') {
                            var reportdata = {
                                "Date": value[i].eventdate,
                                "Business Purpose, Origin & Destination": value[i].Description,
                                "Miles Driven": parseInt(value[i].Line[0].Quantity),
                                "Travel @ .25/mile": numberWithCommas(Math.round(parseFloat(value[i].Line[0].Amount) * 100) / 100),
                                "Trailer Miles": parseInt(value[i].Line[1].Quantity),
                                "Trailer Hauling @ .40/mile": numberWithCommas(Math.round(parseFloat(value[i].Line[1].Amount) * 100) / 100),
                                "Other Expenses": numberWithCommas(Math.round(parseFloat(value[i].Line[2].Amount) * 100) / 100),
                                "Total": numberWithCommas(Math.round(parseFloat(value[i].Amount) * 100) / 100),
                                "Explanation of Other Expense": value[i].Line[2].Description
                            };

                            rptdata.push(reportdata);
                        }

                        console.log("report", i, rptdata);
                    } //for loop 
                }) //for each


            return rptdata;



        }

        $scope.CreateExpenseReport = function() {
            var t = 0;


            console.log("Get Report Data", $scope.lists, $scope.startdate, $scope.enddate);

            var Chaptername = $scope.userChapter;
            var sdate = ($scope.startdate.getMonth() + 1) + '/' + $scope.startdate.getDate() + '/' + $scope.startdate.getFullYear();
            var edate = ($scope.enddate.getMonth() + 1) + '/' + $scope.enddate.getDate() + '/' + $scope.enddate.getFullYear();
            var email = commonServices.getCurrentUserEmail();
            var name = $scope.userName.name.first + ' ' + $scope.userName.name.last;
            var address = $scope.userName.address.line1 + ' , ' + $scope.userName.address.line2;
            var cityinfo = $scope.userName.address.city + ' , ' + $scope.userName.address.state + ' , ' + $scope.userName.address.zip;

            // var address = $scope.profileData.address.line1 + ', ' + $scope.profileData.address.line2;
            // var cityinfo = $scope.profileData.address.city + ', ' + $scope.profileData.address.state + ', ' + $scope.profileData.address.zip;
            $scope.expenseservice = expenseservice;
            console.log("Get Report Data", $scope.listS, $scope.startdate, $scope.enddate);
            console.log("1report entery", $scope.userRole, $scope.userChapter);

            var datatest = GetJsonData();
            console.log("check data old", datatest);

            var docDefinition = {
                pageOrientation: 'landscape',
                header: {
                    margin: 10,
                    columns: [


                        {
                            margin: [10, 0, 0, 0],
                            text: 'HOW Expense Report',
                            fontSize: 14,
                            bold: true,
                            alignment: 'center'
                        },
                    ]
                },
                footer: {
                    columns: [
                        reportDate,

                        {
                            text: 'AT&T',
                            alignment: 'right'
                        }
                    ]
                },


                styles: {
                    header: {
                        bold: true,
                        color: '#000',
                        fontSize: 11
                    },
                    demoTable: {
                        color: '#666',
                        fontSize: 10
                    }
                },
                content: [



                    {
                        canvas: [{
                            type: 'line',
                            x1: 0,
                            y1: 5,
                            x2: 750,
                            y2: 5,
                            lineWidth: 0.5
                        }]
                    }, {
                        text: '\n'
                    }, {
                        columns: [{
                            stack: [
                                // second column consists of paragraphs
                                'Payable To: ' + name,
                                'Address : ' + address,
                                'City/State/Zip : ' + cityinfo
                            ],
                            fontSize: 11
                        }, {
                            stack: [
                                // second column consists of paragraphs
                                'Chapter Name : ' + Chaptername,
                                'Email Id :' + email
                            ],
                            fontSize: 11
                        }, {
                            stack: [
                                // second column consists of paragraphs
                                'Expense From : ' + sdate,
                                'Expense To : ' + edate
                            ],
                            fontSize: 11
                        }]
                    }, {
                        text: '\n'
                    },

                    {
                        width: '',
                        text: ''
                    },

                    expenseservice.table(datatest, ['Date', 'Business Purpose, Origin & Destination', 'Miles Driven', 'Travel @ .25/mile', 'Trailer Miles', 'Trailer Hauling @ .40/mile', 'Other Expenses', 'Total', 'Explanation of Other Expense'])

                ],

            };

            //alert(docDefinition);
            //table( datatest, ['EventDate', 'Description', 'MilesDriven','MileageAmount', 'TrailerMile', 'TrailerAmount','OtherExpense', 'ExpenseAmount','OtherExpenseDesc'])
            //  table( datatest, ['Event Date', 'Description', 'Miles Driven','Mileage Amount', 'Trailer Mile', 'Trailer Amount','Other Expense', 'Expense Amount','Other Expense Desc'])

            //console.log("PDF", docDefinition, GetTableData());
            pdfMake.createPdf(docDefinition).download('ExpenseReport.pdf');

        }

        $scope.idSelectedBill = null;
        $scope.setSelected = function(idSelectedBill) {
            $scope.idSelectedBill = idSelectedBill;
            // alert("expense/expensedetail/" + $scope.idSelectedBill);
            window.location = "#/expense/expensedetail/" + $scope.idSelectedBill;

            // $location.path("#/expense/expensedetail/" + $scope.idSelectedBill);
        };




    });



function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
