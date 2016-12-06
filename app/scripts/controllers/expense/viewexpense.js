'use strict';

/**
 * @ngdoc function
 * @name ohanaApp.controller:ExpenseViewexpenseCtrl
 * @description
 * # ExpenseViewexpenseCtrl
 * Controller of the ohanaApp
 */
angular.module('ohanaApp')
    .controller('ViewExpenseController', function($scope, $filter, commonServices, expenseservice) {

        var self = this;
        var originalList = [];
        $scope.listS = "";
        $scope.lists = {};
        $scope.PayStatus = "Pending";
        $scope.userlist = "";
        var currentdate = new Date();
        var firstday = new Date(currentdate.getFullYear(), 0, 1);
        $scope.startdate = firstday;
        // $scope.enddate = currentdate;



        $scope.orderByField = 'SubmitDate';
        $scope.reverseSort = false;

        $scope.pageTitle = 'Search & Sort Table Records';
        $scope.sortBy = 'name'; // default value
        $scope.sortDescending = false; // default ascending
        $scope.searchText = ''; // default blank

        $scope.viewexpensedata = function() {
            console.log("Service to be called");
            $scope.lists = originalList = expenseservice.getViewExpenseData();
            console.log("Controller Expense List Data", $scope.lists);
            $scope.userinfo = commonServices.getUserChapter();
            console.log("Controller User Data", $scope.userinfo);
        };


        var rptdata = [];
        var currentdate = new Date();
        var reportDate = (currentdate.getMonth() + 1) + '/' + currentdate.getDate() + '/' + currentdate.getFullYear();

        var GetTableData;



        //Get Report Data - Data fileterd based on Dropdown/Date value

        var GetJsonData = function() {
            console.log("Get Report Data", $scope.listS, $scope.startdate, $scope.enddate);

            var sdate = $scope.startdate;
            var edate = $scope.enddate;
            var tstart = sdate.split("/");
            var tend = edate.split("/");

            console.log("report entery", rptdata);
            angular.forEach($scope.lists, function(value, index) {
                console.log("JSON DATA Entery", value.length);
                for (var i = 0; i < value.length; i++) {
                    var subDate = value[i].SubmitDate;
                    var subDates = subDate.split("/");

                    if ($scope.listS.length > 0) {


                        // console.log("date ", value[i], value[i].SubmitDate, $scope.startdate, $scope.enddate);
                        if (($scope.listS === value[i].Chapter) && (value[i].PaymentStatus === $scope.PayStatus || $scope.PayStatus === "") &&
                            (Date(subDates[2], subDates[1] - 1, subDates[0]) >= Date(tstart[2], tstart[1] - 1, tstart[0]) &&
                                Date(subDates[2], subDates[1] - 1, subDates[0]) <= Date(tend[2], tend[1] - 1, tend[0]))) {
                            // (value[i].SubmitDate >= $scope.startdate) && (value[i].SubmitDate <= $scope.enddate)) {
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
                            // console.log("JSON Chapter", value[i].Chapter, $scope.listS);
                            // console.log("JSON Date", value[i].SubmitDate, $scope.startdate, $scope.enddate);
                            //alert($scope.rpttabledata[t]);
                            rptdata.push(reportdata);
                            console.log("Payment first ", value[i].PaymentStatus, $scope.PayStatus);
                        }

                    } else {

                        if ((value[i].PaymentStatus === $scope.PayStatus || $scope.PayStatus === "") &&
                            (Date(subDates[2], subDates[1] - 1, subDates[0]) >= Date(tstart[2], tstart[1] - 1, tstart[0]) &&
                                Date(subDates[2], subDates[1] - 1, subDates[0]) <= Date(tend[2], tend[1] - 1, tend[0]))) {
                            //  if ((value[i].SubmitDate >= $scope.startdate) && (value[i].SubmitDate <= $scope.enddate)) {
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
                            //alert($scope.rpttabledata[t]);
                            rptdata.push(reportdata);
                            console.log("JSON No Chapter Date", value[i].SubmitDate, $scope.startdate, $scope.enddate);
                            console.log("Payment second", value[i].PaymentStatus, $scope.PayStatus);

                        }

                    }



                    console.log("report", i, rptdata);
                }
            })
            console.log("JSON DATA", rptdata);

            return rptdata;



        }

        $scope.CreateExpenseReport = function() {
            var t = 0;


            console.log("Get Report Data", $scope.lists, $scope.startdate, $scope.enddate);

            var Chaptername = $scope.listS;
            var sdate = $scope.startdate;
            var edate = $scope.enddate;
            $scope.expenseservice = expenseservice;
            console.log("Get Report Data", $scope.listS, $scope.startdate, $scope.enddate);
            console.log("Get Report Data", Chaptername, sdate, edate);
            //var datatest = expenseservice.GetJsonData(this.Chaptername, this.sdate, this.edate);
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

                        { text: 'AT&T', alignment: 'right' }
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
                                'Payable To: Name',
                                'Address 1',
                                'City/State/Zip'
                            ],
                            fontSize: 11
                        }, {
                            stack: [
                                // second column consists of paragraphs
                                'Chapter Name: ',
                                'Email Id'
                            ],
                            fontSize: 11
                        }, {
                            stack: [
                                // second column consists of paragraphs
                                'Expense From : ',
                                'Expense To : '
                            ],
                            fontSize: 11
                        }]
                    }, {
                        text: '\n'
                    },

                    { width: '', text: '' },

                    expenseservice.table(datatest, ['Date', 'Business Purpose, Origin & Destination', 'Miles Driven', 'Travel @ .25/mile', 'Trailer Miles', 'Trailer Hauling @ .40/mile', 'Other Expenses', 'Total', 'Explanation of Other Expense'])

                ],
                // styles: {
                //     header: {
                //         bold: true,
                //         color: '#000',
                //         fontSize: 11
                //     },
                //     demoTable: {
                //         color: '#666',
                //         fontSize: 9,
                //         width: 750,
                //         alignment: 'right'
                //     }
                // }
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
