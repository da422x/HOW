'use strict';

/**
 * @ngdoc function
 * @name ohanaApp.controller:NewexpenseCtrl
 * @description
 * # NewexpenseCtrl
 * Controller of the ohanaApp
 */
angular.module('ohanaApp')
    .controller('NewExpenseCtrl', function($scope, userService, expenseservice, commonServices, $location, $q) {

        var user = this;

        $scope.exp = {};
        $scope.exp = expenseservice.expense;


        // Initialize FORM field to clear old values in creating new expense.
        $scope.exp.Chapter = "";
        $scope.exp.email = "";
        $scope.exp.SubmitDate = "";
        $scope.exp.SubmitBy = "";
        $scope.exp.SubmitAddress = "";
        $scope.exp.Description = "";
        $scope.exp.PaymentStatus = "Pending";

        // $scope.handleFileSelect = handleFileSelect();

        $scope.exp.ImageURL = [];

        $scope.exp.Line[0].Quantity = 0; // this.exp.miles;
        $scope.exp.Line[0].Rate = 0.25;
        $scope.exp.Line[1].Quantity = 0; //this.exp.trailermiles;
        $scope.exp.Line[1].Rate = 0.4;
        $scope.exp.Line.length = 2;
        console.log("Exp Line Array len", $scope.exp.Line.length, $scope.exp.Line);
        // Initialize FORM field 
        // --- END ---------

        //---To remove the “No file chosen” tooltip from a file input --START
        // $(function() {
        //         $('input[type="file"]').change(function() {
        //             if ($(this).val() != "") {
        //                 $(this).css('color', '#333');
        //             } else {
        //                 $(this).css('color', 'transparent');
        //             }
        //         });
        //     })
        //---To remove the “No file chosen” tooltip from a file input --END

        $scope.lineamount = 0;
        $scope.role = "";
        $scope.exp.email = commonServices.getCurrentUserEmail();

        var userUID = userService.getId();
        var userData = commonServices.getData('/userData/' + userUID);
        $scope.userRole = userService.getRole();
        $scope.userName = userService.getUserData();
        $scope.userChapter = userService.getChapter();
        console.log("User Name info - ", $scope.userName);

        // var userRquests = commonServices.getData('/roleChangeRequests/');

        //        $q.all([userData, userRquests]).then(function(data) {
        //            $scope.profileData

        // = data[0];
        //            $scope.profileData.role = $scope.userRole;
        //            $scope.userUID = userUID;

        //        });

        $scope.fileadded = false;
        $scope.uploadImageFile = function() {
            var input = document.getElementById('files');
            if (input.files.length > 0) {
                $scope.fileadded = true;
            } else {
                $scope.fileadded = false;
            }
            console.log("File status check - ", input.files.length, $scope.fileadded)
        }
        //------------Addition Line Items--------------//
        $scope.LineDetails = [];
        $scope.LineDetails.length = 0;
        $scope.LineDetails = expenseservice.LineDetails;


        // Initialize FORM field to clear old values in creating new expense.
        if ($scope.LineDetails.length) {
            // for (var i = $scope.LineDetails.length; i > 0; i--) {
            //     $scope.LineDetails.pop();
            // }
            $scope.LineDetails = [];
            $scope.LineDetails.length = 0;
            $scope.LineDetails = expenseservice.LineDetails;
            $scope.LineDetails = [{
                'Description': '',
                'Amount': 0
            }];
        }

        // --- END ---------
        $scope.addNew = function(LineDetails) {
            // angular.extend($scope.LineDetails, expenseservice.addNew($scope.LineDetails));            
            $scope.LineDetails.push({
                'Description': "",
                'Amount': 0
            });
            console.log($scope.LineDetails);

        };

        $scope.remove = function() {
            var newDataList = [];
            $scope.selectedAll = false;
            angular.forEach($scope.LineDetails, function(selected) {
                if (!selected.selected) {
                    newDataList.push(selected);
                }
            });

            $scope.LineDetails = newDataList;
        };
        $scope.checkAll = function() {
            if (!$scope.selectedAll) {
                $scope.selectedAll = true;
            } else {
                $scope.selectedAll = false;
            }
            angular.forEach($scope.LineDetails, function(LineDetails) {
                LineDetails.selected = $scope.selectedAll;
            });
        };

        //------------UI Bootstrap Date -----START--------------//
        var currentdate = new Date();
        var priorDate = new Date().setDate(currentdate.getDate() - 60);
        $scope.exp.eventdate = currentdate;

        $scope.today = function() {
            $scope.exp.eventdate = new Date();

        };

        $scope.today();
        $scope.dateopen = function() {
            $scope.popup.opened = true;
        };

        $scope.clear = function() {
            $scope.exp.eventdate = new Date();

        };

        $scope.dateOptions = {
            'year-format': "'yyyy'",
            'starting-day': 1,
            minDate: priorDate,
            maxDate: new Date()

        };

        $scope.popup = {
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
        //------------UI Bootstrap Date -----END--------------//
        //Go Back to View Expense Page
        $scope.GoBack = function() {
            window.location = "#/expense/viewexpense";
        }

        $scope.createnewexpense = function() {

            var Line = [];
            var ImageFile = [];
            var BillId = [];
            var jsonString = '';
            var obj = {}; //new Object();
            var i = 0;
            var eventdate = $scope.exp.eventdate;
            $scope.exp.eventdate = (eventdate.getMonth() + 1) + '/' + eventdate.getDate() + '/' + eventdate.getFullYear();

            //Code added to remove $$HashKey in the array
            for (var x = 0; x < $scope.LineDetails.length; x++) {
                // console.log("array ", x, $scope.PayStatusLogList.length);
                if ($scope.LineDetails[x] != null) {
                    delete $scope.LineDetails[x].$$hashKey;
                }
            }

            //---ADD line item array ---//
            if ($scope.LineDetails.length) {
                var i = 2;
                for (var x = 0; x < $scope.LineDetails.length; x++) {
                    console.log("Inside", $scope.LineDetails[x]);
                    $scope.lineamount = parseFloat($scope.lineamount) + parseFloat($scope.LineDetails[x].Amount);
                    $scope.exp.Line.push({

                        "ID": i,
                        "Description": $scope.LineDetails[x].Description,
                        "Quantity": 1,
                        "Rate": 1,
                        "Amount": parseFloat($scope.LineDetails[x].Amount)
                    });
                    i++;
                }
                console.log("Scope Value", $scope.exp.Line);
            }

            var input = document.getElementById('files');
            $scope.exp.Chapter = $scope.userChapter;
            $scope.exp.SubmitBy = $scope.userName.name.first + ' ' + $scope.userName.name.last;
            // $scope.exp.SubmitBy = $scope.profileData.name.first + ' ' + $scope.profileData.name.last;

            var currentdate = new Date();

            // $scope.profileData.Chapter.charAt(1);
            $scope.exp.BillId = $scope.userName.Region.charAt(1) + $scope.userChapter.charAt(1) + $scope.userName.address.city.charAt(1) + currentdate.getFullYear() + (currentdate.getMonth() + 1) + currentdate.getDate() + +currentdate.getHours() + currentdate.getMinutes() + currentdate.getSeconds() + Math.floor((Math.random() * 1000) + 1);
            // $scope.exp.BillId = $scope.profileData.Region.charAt(1) + $scope.profileData.Chapter.charAt(1) + $scope.profileData.address.city.charAt(1) + currentdate.getFullYear() + (currentdate.getMonth() + 1) + currentdate.getDate() + +currentdate.getHours() + currentdate.getMinutes() + currentdate.getSeconds() + Math.floor((Math.random() * 1000) + 1);
            $scope.exp.SubmitDate = (currentdate.getMonth() + 1) + '/' + currentdate.getDate() + '/' + currentdate.getFullYear();
            $scope.exp.SubmitAddress = $scope.userName.address.line1 + ' , ' + $scope.userName.address.line2 + ' , ' + $scope.userName.address.city + ' , ' + $scope.userName.address.state + ' , ' + $scope.userName.address.zip;
            $scope.exp.Line[0].Amount = $scope.exp.Line[0].Quantity * $scope.exp.Line[0].Rate;
            $scope.exp.Line[1].Amount = $scope.exp.Line[1].Quantity * $scope.exp.Line[1].Rate;
            $scope.exp.Amount = (($scope.exp.Line[0].Quantity * $scope.exp.Line[0].Rate) + ($scope.exp.Line[1].Quantity * $scope.exp.Line[1].Rate) + (parseFloat($scope.lineamount) * 1));

            if ($scope.userRole == 'Chapter Lead') {
                $scope.exp.PaymentLog[0].PayStatus = "Submitted";
                $scope.exp.PaymentStatus = "Submitted";
            } else {
                $scope.exp.PaymentLog[0].PayStatus = "Pending";
                $scope.exp.PaymentStatus = "Pending";
            }
            $scope.exp.PaymentLog[0].PayStatusBy = $scope.exp.SubmitBy;
            $scope.exp.PaymentLog[0].PayRole = $scope.userRole;
            if (currentdate.getHours() > 12) {
                $scope.exp.PaymentLog[0].PayStatusDate = (currentdate.getMonth() + 1) + '/' + currentdate.getDate() + '/' + currentdate.getFullYear() + ' ' + (currentdate.getHours() - 12) + ':' + currentdate.getMinutes() + ':' + currentdate.getSeconds() + ' PM';

            } else {
                $scope.exp.PaymentLog[0].PayStatusDate = (currentdate.getMonth() + 1) + '/' + currentdate.getDate() + '/' + currentdate.getFullYear() + ' ' + currentdate.getHours() + ':' + currentdate.getMinutes() + ':' + currentdate.getSeconds() + ' AM';

            }
            $scope.exp.PaymentLog[0].PayStatusDescription = 'New Expense created';

            console.log("New expense ", $scope.exp.Chapter, $scope.exp.SubmitBy);

            var imageString;
            var imagefilename;
            //alert(jsonString);

            if (input.files.length > 0) {
                // jsonString = jsonString + ', ' + '"ImageURL" :  [  ';
                for (var x = 0; x < input.files.length; x++) {


                    imagefilename = 'images/' + $scope.exp.BillId + "_" + input.files[x].name;
                    expenseservice.addNewImage({
                        ID: (x + 1),
                        ImageUrlLocation: "",
                        FileName: imagefilename
                    })


                }


            }

            var datalocation = 'expense/';

            firebase.database().ref(datalocation).push(angular.fromJson(angular.toJson($scope.exp)))
                .then(function(jsonString) {
                    console.log('success : data pushed', $scope.exp);

                })
                .catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log('ERROR: ' + error.code + ': ' + error.message);
                });

            if (input.files.length > 0) {

                LoadImageData($scope.exp.BillId, datalocation);

            }

            swal('New Expense Created', 'for event ' + this.exp.eventdate, 'success');
            // alert("Success:  New Expense created for event - " + this.exp.eventdate);

            $location.path("expense/viewexpense");

        }



    });


function LoadImageData(UniqueBillId, datalocation) {


    var imageobj = {};
    var inp = document.getElementById('files');

    for (var i = 0; i < inp.files.length; ++i) {
        var filename = inp.files.item(i).name;


        var _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];
        var blnValid = false;
        for (var j = 0; j < _validFileExtensions.length; j++) {
            var sCurExtension = _validFileExtensions[j];

            if (filename.substr(filename.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {

                var storage = firebase.storage();

                var file = document.getElementById("files").files[i];
                console.log("load file - ", file);

                var storageRef = firebase.storage().ref();
                var path = storageRef.fullPath

                var filelocname = 'images/' + UniqueBillId + '_' + file.name;

                storageRef.child(filelocname).put(file).then(function(snapshot) {
                    console.log('Uploaded a blob or file!');
                });



            }
        }
    }
}
