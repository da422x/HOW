'use strict';

/**
 * @ngdoc function
 * @name ohanaApp.controller:ExpenseViewexpenseCtrl
 * @description
 * # ExpenseViewexpenseCtrl
 * Controller of the ohanaApp
 */
angular.module('ohanaApp')
    .controller('ViewExpenseController', function($scope, $filter, expenseservice, commonServices, localStorageService, $q) {

        var self = this;
        var originalList = [];
        $scope.listS = "";
        $scope.lists = {};

        $scope.userlist = "";
        var currentdate = new Date();
        var firstday = new Date(currentdate.getFullYear(), 0, 1);
        $scope.startdate = firstday;
        $scope.useremail = commonServices.getCurrentUserEmail();

        $scope.orderByField = 'SubmitDate';
        $scope.reverseSort = false;

        $scope.pageTitle = 'Search & Sort Table Records';
        $scope.sortBy = 'name'; // default value
        $scope.sortDescending = false; // default ascending
        $scope.searchText = ''; // default blank

        //---Role Based information ---------------

        var userUID = localStorageService.get('sessionUserUID');
        var userData = commonServices.getData('/userData/' + userUID);
        $scope.userRole = localStorageService.get('sessionUserRole');
        $scope.userName = localStorageService.get('sessionUserName');
        $scope.userChapter = localStorageService.get('sessionUserChapter');
        var userRquests = commonServices.getData('/roleChangeRequests/');

        $q.all([userData, userRquests]).then(function(data) {
            $scope.profileData = data[0];
            $scope.profileData.role = $scope.userRole;
            $scope.profilechapter = $scope.profileData.Chapter;
            $scope.userUID = userUID;

        });
        $scope.Head = "";
        switch ($scope.userRole) {
            case 'Volunteer':
            case 'Participant':
                $scope.PayStatus = "Pending";
                $scope.HeadTitle = ' created by ' + $scope.userName;
                break;
            case 'Leadership Team Member':
            case 'Chapter Lead':
                $scope.PayStatus = "Pending";
                $scope.HeadTitle = ' for ' + $scope.userChapter;
                break;
            default:
                $scope.PayStatus = "Approved";
        }
        //------------UI Bootstrap Date -----START--------------//

        $scope.today = function() {
            $scope.startdate = firstday;
            $scope.enddate = currentdate;
        };

        $scope.today();

        $scope.dateopen = function() {
            $scope.popup.opened = true;
        };

        $scope.dateopen1 = function() {
            $scope.popup1.opened = true;
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
            $scope.startdate = new Date(currentdate.getFullYear(), 0, 1);
            $scope.enddate = new Date(currentdate - (1000 * 60 * 60 * 24 * 60));
            //(1000 * 60 * 60 * 24 * 60) - 60 Day prior calculation

            switch ($scope.userRole) {
                case 'Volunteer':
                case 'Participant':
                    $scope.PayStatus = "Pending";

                    break;
                case 'Leadership Team Member':
                    $scope.PayStatus = "Pending";
                    break;
                default:
                    $scope.PayStatus = "Approved";
            }

        }

        //----Past Due - Expense list function -------END -----------//

        $scope.viewexpensedata = function() {

            console.log("Service to be called", $scope.userChapter);
            $scope.lists = originalList = expenseservice.getViewExpenseData($scope.useremail, $scope.userRole, $scope.userChapter);
            console.log("Controller Expense List Data", $scope.lists, originalList);

        };


        // var rptdata = [];
        var currentdate = new Date();
        var reportDate = (currentdate.getMonth() + 1) + '/' + currentdate.getDate() + '/' + currentdate.getFullYear();

        var GetTableData;



        //Get Report Data - Data fileterd based on Dropdown/Date value

        var GetJsonData = function() {
            var rptdata = [];

            angular.forEach($scope.lists, function(value, index) {

                    for (var i = 0; i < value.length; i++) {
                        // console.log("first list length", $scope.listS.length);
                        if (($scope.listS === value[i].Chapter || $scope.listS === "") && (value[i].PaymentStatus === $scope.PayStatus || $scope.PayStatus === "") &&
                            (Date.parse(value[i].SubmitDate) >= Date.parse($scope.startdate) && Date.parse(value[i].SubmitDate) <= Date.parse($scope.enddate)) && $scope.userinfo.viewuserdata[0].role != 'coordinator') {
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
                            // console.log("first if");
                            rptdata.push(reportdata);
                        }

                        console.log("Real Value", value[i].SubmitDate, $scope.startdate, $scope.enddate, $scope.userinfo.viewuserdata[0].Chapter, value[i].Chapter, $scope.userinfo.viewuserdata[0].role, 'coordinator', value[i].PaymentStatus, $scope.PayStatus);
                        if (($scope.userinfo.viewuserdata[0].Chapter == value[i].Chapter && $scope.userinfo.viewuserdata[0].role == 'coordinator') && (value[i].PaymentStatus === $scope.PayStatus || $scope.PayStatus === "") &&
                            (Date.parse(value[i].SubmitDate) >= Date.parse($scope.startdate) && Date.parse(value[i].SubmitDate) <= Date.parse($scope.enddate))) {

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

                            // console.log("second if");
                            rptdata.push(reportdata);
                        }

                        console.log("report", i, rptdata);
                    } //for loop 
                }) //for each
            console.log("JSON DATA", rptdata);

            return rptdata;



        }

        $scope.CreateExpenseReport = function() {
            var t = 0;


            console.log("Get Report Data", $scope.lists, $scope.startdate, $scope.enddate);

            var Chaptername = $scope.userinfo.viewuserdata[0].Chapter;
            var sdate = $scope.startdate;
            var edate = $scope.enddate;
            var email = $scope.userinfo.viewuserdata[0].email;
            var name = $scope.userinfo.viewuserdata[0].name.first + ' ' + $scope.userinfo.viewuserdata[0].name.last;
            var address = $scope.userinfo.viewuserdata[0].address.line1 + ', ' + $scope.userinfo.viewuserdata[0].address.line2;
            var cityinfo = $scope.userinfo.viewuserdata[0].address.city + ', ' + $scope.userinfo.viewuserdata[0].address.state + ', ' + $scope.userinfo.viewuserdata[0].address.zip;
            $scope.expenseservice = expenseservice;
            console.log("Get Report Data", $scope.listS, $scope.startdate, $scope.enddate);
            console.log("Get Report Data", Chaptername, sdate, edate);
            //var datatest = expenseservice.GetJsonData(this.Chaptername, this.sdate, this.edate);
            console.log("1Get Report Data", $scope.listS, $scope.startdate, $scope.enddate);
            console.log("1report entery", $scope.userinfo.role, $scope.userinfo.Chapter);

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
            //alert($scope.idSelectedBill); 
        };




    });



function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
