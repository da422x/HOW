'use strict';

/**
 * @ngdoc function
 * @name ohanaApp.controller:NewexpenseCtrl
 * @description
 * # NewexpenseCtrl
 * Controller of the ohanaApp
 */
angular.module('ohanaApp')
    .controller('NewExpenseCtrl', function($scope, userService, expenseservice, commonServices, $location, $q, FileUploader) {

        var user = this;

        $scope.exp = {};
        $scope.exp = expenseservice.expense;
        expenseservice.deleteExpense("oRa2017126133420299");
        expenseservice.deleteExpense("aAe201728132644713");

        // Initialize FORM field to clear old values in creating new expense.
        $scope.exp.Chapter = "";
        $scope.exp.email = commonServices.getCurrentUserEmail();
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
        // console.log("Exp Line Array len", $scope.exp.Line.length, $scope.exp.Line);
        // Initialize FORM field  --- END ---------

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

        //---FILE UPLOADER ---START ---------

        var uploader = $scope.uploader = new FileUploader({
            // if (!empty($_FILES)) {

            //     $tempPath = $_FILES['file']['tmp_name'];
            //     $uploadPath = dirname(__FILE__).DIRECTORY_SEPARATOR.
            //     'uploads'.DIRECTORY_SEPARATOR.$_FILES['file']['name'];

            //     move_uploaded_file($tempPath, $uploadPath);

            //     $answer = array('answer' => 'File transfer completed');
            //     $json = json_encode($answer);

            //     echo $json;

            // } else {

            //     echo 'No files';

            // }
        });
        // var uploader = $scope.uploader = function() {
        //     // url: 'upload.php'
        //     var inp = document.getElementById('fileimage');
        //     for (var i = 0; i < item.length; ++i) {
        //         var filename = inp.fileimage.item(i).name;
        //         console.log("Image - ", i, filename);
        //     };

        // };
        // FILTERS

        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/ , options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/ , filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem.file.name);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        // console.info('uploader', uploader);
        //----FILE UPLOADER ---END------

        $scope.lineamount = 0;
        var userUID = userService.getId();
        var userData = commonServices.getData('/userData/' + userUID);
        $scope.userRole = userService.getRole();
        $scope.userName = userService.getUserData();
        $scope.userChapter = userService.getChapter();
        $scope.useremail = commonServices.getCurrentUserEmail();
        console.log("User Name info - ", $scope.userName, $scope.exp.email);

        $scope.checkeditexist = function() {
            var aedit = 0;
            $scope.Editlist = expenseservice.getViewExpenseData($scope.useremail, $scope.userRole, $scope.userChapter);
            $scope.Editlist.$loaded().then(function() {

                angular.forEach($scope.Editlist, function(list) {
                    if (list.PaymentStatus == 'Edit' && list.email == $scope.useremail) {
                        aedit = aedit + 1;
                        $scope.isEditexist = "true";
                    }
                    // console.log("Edit exist", aedit, list.PaymentStatus, list.BillId, $scope.isEditexist);

                });
            });

            // console.log("Edit exist", $scope.isEditexist);
        }

        //if EDIT exist, user can not save new expense in EDIT status - Only 1 Edit allowed per user
        //SAVE it for later button hidden
        $scope.checkeditexist();

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
            var uploader = $scope.uploader = new FileUploader({});

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

        //Clear value in Expense Page
        $scope.ClearFields = function() {

            $scope.exp.Chapter = "";
            $scope.exp.email = commonServices.getCurrentUserEmail();
            $scope.exp.SubmitDate = "";
            $scope.exp.SubmitBy = "";
            $scope.exp.SubmitAddress = "";
            $scope.exp.Description = "";
            $scope.exp.PaymentStatus = "Pending";
            $scope.exp.ImageURL = [];
            $scope.exp.Line[0].Quantity = 0;
            $scope.exp.Line[0].Rate = 0.25;
            $scope.exp.Line[1].Quantity = 0;
            $scope.exp.Line[1].Rate = 0.4;
            $scope.exp.Line.length = 2;
            $scope.LineDetails = [];
            $scope.LineDetails.length = 0;
            $scope.LineDetails = expenseservice.LineDetails;

        }

        // -- SAVE THE EXPENSE FOR LATER USE
        $scope.saveitforlater = function() {
            var eventdate = $scope.exp.eventdate;
            var meventdate = (eventdate.getMonth() + 1) + '/' + eventdate.getDate() + '/' + eventdate.getFullYear();
            $scope.exp.email = commonServices.getCurrentUserEmail();
            $scope.CalculateAmount();
            // var inp = document.getElementById('fileimage');
            if ($scope.uploader !== undefined) {
                console.log("file name", $scope.uploader.queue.length, $scope.uploader.queue);
                for (var i = 0; i < $scope.uploader.queue.length; ++i) {
                    var filename = $scope.uploader.queue[i].file.name;
                    console.log("file name", filename);
                }
            }


            swal({
                title: 'Need more time to submit',
                text: "Expense will be saved in EDIT status!",
                type: 'info',
                html: '<table><tr><td class="swaltdl ">Event Date : </td><td class="swaltdl "><b>' + meventdate + '</b> </td></tr>' +
                    '<tr><td class="swaltdl ">Description : </td><td class="swaltdl "><b>' + $scope.exp.Description + '</td></tr> ' +
                    '<tr><td class="swaltdl ">Total Expense Amount : </td><td class="swaltdr "><b>$ ' + $scope.exp.Amount + '</b></td></tr></table>',

                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, SAVE it!'
            }).then(function() {

                $scope.createnewexpense("SAVE")
                window.location.href = "#/expense/viewexpense"
            })

        }

        // -- CREATE NEW EXPENSE
        $scope.confirmnewexpense = function() {
            var eventdate = $scope.exp.eventdate;
            var meventdate = (eventdate.getMonth() + 1) + '/' + eventdate.getDate() + '/' + eventdate.getFullYear();
            $scope.CalculateAmount();
            // var inp = document.getElementById('fileimage');
            console.log("file name", $scope.uploader.queue.length, $scope.uploader.queue, $scope.exp.email);
            for (var i = 0; i < $scope.uploader.queue.length; ++i) {
                var filename = $scope.uploader.queue[i].file.name;
                console.log("file name", filename);
            }


            if ($scope.exp.Description.length == 0 || $scope.uploader.queue.length == 0) {
                swal({
                    title: 'Required fields Missing',
                    type: 'error',
                    html: '<table><tr><td class="swaltdl ">Event Date : </td><td class="swaltdl "><b>' + meventdate + '</b> </td></tr>' +
                        '<tr><td class="swaltdl ">Description : </td><td class="swaltdl "><b>' + $scope.exp.Description + '</td></tr> ' +
                        '<tr><td class="swaltdl ">No. of supporting documents Loaded : </td><td class="swaltdr "><b> ' + $scope.uploader.queue.length + '</b></td> </tr></table>',

                })
            } else {
                swal({
                    title: 'Please confirm New Expense',
                    text: "Created Expense will be reviewed by Chapter Lead and National Staff!",
                    type: 'info',
                    html: '<table><tr><td class="swaltdl ">Event Date : </td><td class="swaltdl "><b>' + meventdate + '</b> </td></tr>' +
                        '<tr><td class="swaltdl ">Description : </td><td class="swaltdl "><b>' + $scope.exp.Description + '</td></tr> ' +
                        '<tr><td class="swaltdl ">Miles Amount : </td><td class="swaltdr "><b>$ ' + $scope.exp.Line[0].Amount + '</b></td></tr>' +
                        '<tr><td class="swaltdl ">Trailer Mileage Amount : </td><td class="swaltdr "><b>$ ' + $scope.exp.Line[1].Amount + '</b></td></tr>' +
                        '<tr><td class="swaltdl ">Other Expense Amount : </td><td class="swaltdr "><b>$ ' + $scope.lineamount + '</b></td></tr>' +
                        '<tr><td class="swaltdl ">Total Expense Amount : </td><td class="swaltdr "><b>$ ' + $scope.exp.Amount + '</b></td></tr></table>',

                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, create it!'
                }).then(function() {

                    $scope.createnewexpense("Pending")
                    window.location.href = "#/expense/viewexpense"
                })
            }
        }

        $scope.CalculateAmount = function() {

            if ($scope.LineDetails.length) {
                var i = 2;
                for (var x = 0; x < $scope.LineDetails.length; x++) {
                    // console.log("Inside", $scope.LineDetails[x]);
                    $scope.lineamount = Math.round((parseFloat($scope.lineamount) + parseFloat($scope.LineDetails[x].Amount)) * 100) / 100;
                    $scope.exp.Line.push({

                        "ID": i,
                        "Description": $scope.LineDetails[x].Description,
                        "Quantity": 1,
                        "Rate": 1,
                        "Amount": parseFloat($scope.LineDetails[x].Amount)
                    });
                    i++;
                }
                // console.log("Scope Value", $scope.exp.Line);
            }

            $scope.exp.Line[0].Amount = Math.round(($scope.exp.Line[0].Quantity * $scope.exp.Line[0].Rate) * 100) / 100;
            $scope.exp.Line[1].Amount = Math.round(($scope.exp.Line[1].Quantity * $scope.exp.Line[1].Rate) * 100) / 100;
            $scope.exp.Amount = Math.round(((($scope.exp.Line[0].Quantity * $scope.exp.Line[0].Rate) + ($scope.exp.Line[1].Quantity * $scope.exp.Line[1].Rate) + (parseFloat($scope.lineamount) * 1))) * 100) / 100;

        }

        $scope.createnewexpense = function(expensetype) {

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

            $scope.exp.email = commonServices.getCurrentUserEmail();


            $scope.exp.Chapter = $scope.userChapter;
            $scope.exp.SubmitBy = $scope.userName.name.first + ' ' + $scope.userName.name.last;
            // $scope.exp.SubmitBy = $scope.profileData.name.first + ' ' + $scope.profileData.name.last;

            var currentdate = new Date();

            // $scope.profileData.Chapter.charAt(1);
            $scope.exp.BillId = $scope.userName.Region.charAt(1) + $scope.userChapter.charAt(1) + $scope.userName.address.city.charAt(1) + currentdate.getFullYear() + (currentdate.getMonth() + 1) + currentdate.getDate() + +currentdate.getHours() + currentdate.getMinutes() + currentdate.getSeconds() + Math.floor((Math.random() * 1000) + 1);

            $scope.exp.SubmitDate = (currentdate.getMonth() + 1) + '/' + currentdate.getDate() + '/' + currentdate.getFullYear();
            $scope.exp.SubmitAddress = $scope.userName.address.line1 + ' , ' + $scope.userName.address.line2 + ' , ' + $scope.userName.address.city + ' , ' + $scope.userName.address.state + ' , ' + $scope.userName.address.zip;

            if ($scope.userRole == 'Chapter Lead') {
                $scope.exp.PaymentLog[0].PayStatus = "Submitted";
                $scope.exp.PaymentStatus = "Submitted";
            } else {
                $scope.exp.PaymentLog[0].PayStatus = "Pending";
                $scope.exp.PaymentStatus = "Pending";
            }

            //-- Expense entry saved for future submission
            if (expensetype == 'SAVE') {
                $scope.exp.PaymentLog[0].PayStatus = "Edit";
                $scope.exp.PaymentStatus = "Edit";
                $scope.exp.PaymentLog[0].PayStatusDescription = 'Expense saved for later submission';
            } else
                $scope.exp.PaymentLog[0].PayStatusDescription = 'New Expense created';


            $scope.exp.PaymentLog[0].PayStatusBy = $scope.exp.SubmitBy;
            $scope.exp.PaymentLog[0].PayRole = $scope.userRole;
            if (currentdate.getHours() > 12) {
                $scope.exp.PaymentLog[0].PayStatusDate = (currentdate.getMonth() + 1) + '/' + currentdate.getDate() + '/' + currentdate.getFullYear() + ' ' + (currentdate.getHours() - 12) + ':' + currentdate.getMinutes() + ':' + currentdate.getSeconds() + ' PM';

            } else {
                $scope.exp.PaymentLog[0].PayStatusDate = (currentdate.getMonth() + 1) + '/' + currentdate.getDate() + '/' + currentdate.getFullYear() + ' ' + currentdate.getHours() + ':' + currentdate.getMinutes() + ':' + currentdate.getSeconds() + ' AM';

            }
            // $scope.exp.PaymentLog[0].PayStatusDescription = 'New Expense created';

            console.log("New expense ", $scope.exp.Chapter, $scope.exp.SubmitBy, $scope.exp.email);

            var imageString;
            var imagefilename;
            //alert(jsonString);

            var input = document.getElementById('files');
            // if (input.files.length > 0) {
            if ($scope.uploader.queue.length > 0) {
                // jsonString = jsonString + ', ' + '"ImageURL" :  [  ';
                for (var x = 0; x < $scope.uploader.queue.length; x++) {


                    imagefilename = 'images/' + $scope.exp.BillId + "_" + $scope.uploader.queue[x].file.name
                    //input.files[x].name;
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

            if ($scope.uploader !== undefined) {

                var imageurl = '';
                if ($scope.uploader.queue.length > 0) {
                    imageurl = expenseservice.SaveImageData($scope.exp.BillId, $scope.uploader.queue);

                    console.log("save image - ", imageurl);
                }
            }

            if (expensetype == 'SAVE') {
                swal('Expense is Saved for future submission', 'for event ' + this.exp.eventdate, 'success');
            } else {
                swal('New Expense Created', 'for event ' + this.exp.eventdate, 'success');
            }

            $location.path("expense/viewexpense");

        }



    });

// function LoadImageData(UniqueBillId, datalocation, imageinfo) {

//     // $scope.uploader.queue[i].file.name

//     var imageobj = {};
//     // var inp = document.getElementById('fileimage');
//     console.log("file image ", imageinfo[0].file.name);

//     for (var i = 0; i < imageinfo.length; ++i) {
//         var filename = imageinfo[i].file.name
//             //inp.files.item(i).name;


//         var _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];
//         var blnValid = false;
//         for (var j = 0; j < _validFileExtensions.length; j++) {
//             var sCurExtension = _validFileExtensions[j];

//             if (filename.substr(filename.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {

//                 var storage = firebase.storage();

//                 var file = imageinfo[i]._file;
//                 //document.getElementById("fileimage").files[i];
//                 console.log("load file - ", file);

//                 var storageRef = firebase.storage().ref();
//                 var path = storageRef.fullPath

//                 var filelocname = 'images/' + UniqueBillId + '_' + file.name;

//                 storageRef.child(filelocname).put(file).then(function(snapshot) {
//                     console.log('Uploaded a blob or file!');
//                 });



//             }
//         }
//     }

//     // var imageobj = {};
//     // var inp = document.getElementById('files');

//     // for (var i = 0; i < inp.files.length; ++i) {
//     //     var filename = inp.files.item(i).name;


//     //     var _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];
//     //     var blnValid = false;
//     //     for (var j = 0; j < _validFileExtensions.length; j++) {
//     //         var sCurExtension = _validFileExtensions[j];

//     //         if (filename.substr(filename.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {

//     //             var storage = firebase.storage();

//     //             var file = document.getElementById("files").files[i];
//     //             console.log("load file - ", file);

//     //             var storageRef = firebase.storage().ref();
//     //             var path = storageRef.fullPath

//     //             var filelocname = 'images/' + UniqueBillId + '_' + file.name;

//     //             storageRef.child(filelocname).put(file).then(function(snapshot) {
//     //                 console.log('Uploaded a blob or file!');
//     //             });



//     //         }
//     //     }
//     // }
// }
