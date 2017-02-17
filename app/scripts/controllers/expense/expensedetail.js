'use strict';

/**
 * @ngdoc function
 * @name ohanaApp.controller:ExpensedetailCtrl
 * @description
 * # ExpensedetailCtrl
 * Controller of the ohanaApp
 */
angular.module('ohanaApp')
    .controller('ExpenseDetailsCtrl', function($firebaseObject, $scope, userService, $routeParams, commonServices, expenseservice, $location, $uibModal, $log, $document, FileUploader) {

        $scope.expense = {};
        $scope.expense = expenseservice.expense;

        $scope.userRole = userService.getRole();
        $scope.userName = userService.getUserData();
        $scope.useremail = commonServices.getCurrentUserEmail();
        $scope.formModel = {};
        var uploader = $scope.uploader = new FileUploader({});
        //----Modal -- Payment Status Log  ---------//
        var $ctrl = this;

        $scope.openPaymentStatusLog = function() {
            $scope.$modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: "myModalContent.html",
                size: 'lg',
            })
        };

        $scope.ok = function() {
            $scope.$modalInstance.close();
        };

        $scope.cancel = function() {
            $scope.$modalInstance.dismiss('cancel');
        };


        // Initialize FORM field to clear old values in creating new expense.  
        $scope.LineDetails = [];
        $scope.LineDetails.length = 0;

        if ($scope.LineDetails.length) {
            for (var i = $scope.LineDetails.length; i > 0; i--) {
                $scope.LineDetails.pop();
            }
            // $scope.LineDetails = [];
            $scope.LineDetails.length = 0;
            $scope.LineDetails = expenseservice.LineDetails;
            $scope.LineDetails = [{
                'Description': '',
                'Amount': 0
            }];
        }

        //------------Addition Line Items--------------//
        $scope.addNew = function(LineDetails) {
            if ($scope.userRole == 'Volunteer' || $scope.userRole == 'Participant') {
                $scope.LineDetails.push({
                    'Description': "",
                    'Amount': 0
                });
                console.log($scope.LineDetails);
            }

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

        //Other Expense line amount change
        $scope.lineAmountChange = function() {
            var vTotalLineCost = 0;
            if ($scope.LineDetails.length) {

                for (var x = 0; x < $scope.LineDetails.length; x++) {
                    vTotalLineCost = vTotalLineCost + parseFloat($scope.LineDetails[x].Amount);
                    console.log("line amount change", x, vTotalLineCost, $scope.LineDetails[x].Amount, parseFloat($scope.LineDetails[x].Amount));

                }
            }
            $scope.TotalLineCost = vTotalLineCost;
            $scope.$applyAsync();
            // $scope.TotalLineCost = vTotalLineCost;
            // $scope.TotalLineCost = parseFloat(vTotalLineCost);
            // console.log("line amount change", $scope.TotalLineCost, $scope.LineDetails, parseFloat(item.Line[x].Amount));
        }


        //Go Back to View Expense Page
        $scope.GoBack = function() {
            window.location = "#/expense/viewexpense";
        }

        //View Image - Bigger size - in New Page  
        $scope.viewImage = function(img) {
            window.open(img, "Expense Image - " + $routeParams.BillId, "height=600,width=400");
        }

        //DELETE Selected Image  
        $scope.removeImage = function(imgname) {
            // window.open(img, "Expense Image - " + $routeParams.BillId, "height=600,width=400");
            alert(imgname);
            console.log('Image Delete Request SWAL ', imgname);
            swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(function() {
                expenseservice.deleteImage(imgname, $scope.vImageList)
                // alert(expenseservice.deleteImagearray($scope.vImageList, imgname))
                // $scope.applyAsync();
                // console.log("Image List - 0 ", $scope.vImageList);
            }, function(dismiss) {
                // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                if (dismiss === 'cancel') {
                    swal(
                        'Cancelled',
                        'Your document file is safe',
                        'error'
                    )
                }
            })

            console.log("Image List -  1 ", $scope.vImageList);
            var newDataList = [];
            newDataList.length = 0;
            angular.forEach($scope.vImageList, function(item) {
                if (item.length) {
                    var i = 0;

                    for (var x = 0; x < item.length; x++) {
                        console.log("Image Value Data - ", item[x].ImageName, x);
                        if (item[x].ImageName != imgname) {
                            newDataList.push(item[x]);
                        }
                    }
                }
            });

            console.log('ImageList: 2 -' + $scope.vImageList);
            $scope.vImageList = newDataList;
            console.log('ImageList: 3 -' + $scope.vImageList);
            $scope.updateImageInfo();


        }



        //Update Supporting Image File Changes 
        $scope.updateImageInfo = function() {

            var expenseupdate = {
                ImageURL: []
            };


            if ($scope.vImageList.length) {

                for (var x = 0; x < $scope.vImageList.length; x++) {
                    console.log("Update- image ", x, expenseupdate.ImageURL, $scope.vImageList);
                    expenseupdate.ImageURL.push({
                        "FileName": $scope.vImageList[x].ImageName,
                        "ID": x,
                        "ImageUrlLocation": $scope.vImageList[x].ImageSrc,
                    });
                }

            }

            var query = firebase.database().ref('expense/').orderByChild("BillId").equalTo($routeParams.BillId);
            query.on('child_added', function(snap) {
                var obj = snap.val();
                console.log("key image ", snap.key);
                firebase.database().ref('expense/' + snap.key).update(expenseupdate);
                // swal('Expense Updated Successfully!', '', 'success');
            });
        }

        //Load Expense Detail Information
        function loadexpensedata() {

            $scope.EditMode = " - EDIT mode";
            var ref = firebase.database().ref('expense').orderByChild("BillId").equalTo($routeParams.BillId);
            //alert($routeParams.BillId);   
            $scope.vimageurl = [];
            $scope.isdisabled = false;
            $scope.PayStatusLogList = [];
            $scope.vImageList = [];
            $scope.vImageList.length = 0;
            //Code added to remove $$HashKey in the array
            for (var x = 0; x < $scope.vImageList.length; x++) {
                // console.log("array ", x, $scope.PayStatusLogList.length);
                if ($scope.vImageList[x] != null) {
                    delete $scope.vImageList[x].$$hashKey;
                }

            }

            ref.on('value', function(snapshot) {
                //  $scope.$apply(function(){
                $scope.expense = snapshot.val();
                $scope.$applyAsync();

                angular.forEach($scope.expense, function(item) {

                    console.log("Expense Detail Loaded", $scope.expense, item.PaymentStatus);
                    var img = document.createElement('img');
                    var storage = firebase.storage();
                    var storageRef = firebase.storage().ref();
                    $scope.paystat = item.PaymentStatus;
                    $scope.expenseemail = item.email;
                    // if (document.getElementById) {
                    //     document.getElementById('OtherExpensebtn').style.visibility = 'visible';
                    // }
                    // document.getElementById('OtherExpensebtn').style.display = 'block';
                    $scope.OverageDisable = false;
                    if (item.PaymentStatus == 'Over Age') {
                        swal('Overage Expense - Not editable! ', '', 'error');

                        $scope.OverageDisable = true;
                        $scope.EditMode = " - READ-ONLY";
                        // document.getElementById('OtherExpensebtn').style.display = 'none';
                        // alert("1");
                    } else {
                        $scope.OverageDisable = false;
                        $scope.EditMode = " - EDIT ";
                    }

                    if ($scope.useremail != $scope.expenseemail) {
                        $scope.EditMode = " - READ-ONLY";
                        $scope.OverageDisable = true;
                        // document.getElementById('OtherExpensebtn').style.display = 'none';
                        // alert("2");
                    }

                    //---Payment Status Change Option for Chapter Lead and National Staff
                    $scope.paystatuslist = [];
                    switch ($scope.userRole) {
                        case 'Participant':
                        case 'Volunteer':
                            if (item.PaymentStatus == 'Submitted' || item.PaymentStatus == 'Returned' || item.PaymentStatus == 'Paid' || item.PaymentStatus == 'Paid' || item.PaymentStatus == 'Over Age') {
                                $scope.OverageDisable = true;
                                $scope.EditMode = " - READ-ONLY mode";
                                // document.getElementById('OtherExpensebtn').style.display = 'none';
                                // document.getElementById('OtherExpensebtn').style.visibility = 'hidden';
                                // alert("3");
                                break;
                            }
                            if ((item.PaymentStatus == 'Pending') || (item.PaymentStatus == 'Edit') || (item.PaymentStatus == 'ReSubmit')) {
                                $scope.OverageDisable = false;
                                $scope.EditMode = " - EDIT mode";
                                // document.getElementById('OtherExpensebtn').style.visibility = 'visible';
                                // alert("3 p R");
                            }
                            break;

                        case 'Chapter Lead':
                            if (item.PaymentStatus == 'Pending') {

                                $scope.paystatuslist = [{
                                    name: 'Pending',
                                    value: 'Pending'
                                }, {
                                    name: 'Submitted',
                                    value: 'Submitted'
                                }, {
                                    name: 'Resubmit',
                                    value: 'Resubmit'
                                }, {
                                    name: 'Over Age',
                                    value: 'Over Age'
                                }];
                            }
                            if (item.PaymentStatus == 'Returned') {

                                $scope.paystatuslist = [{
                                    name: 'Returned',
                                    value: 'Returned'
                                }, {
                                    name: 'Resubmit',
                                    value: 'Resubmit'
                                }, {
                                    name: 'Over Age',
                                    value: 'Over Age'
                                }];
                            }
                            if (($scope.useremail != $scope.expenseemail) && (item.PaymentStatus == 'Pending' || item.PaymentStatus == 'Returned')) {
                                $scope.EditMode = " - PAYMENT STATUS UPDATE ONLY";
                                $scope.OverageDisable = true;
                                // document.getElementById('divgoback').style.display = 'none';
                            }
                            if (($scope.useremail == $scope.expenseemail) && (item.PaymentStatus == 'Submitted' || (item.PaymentStatus == 'Edit') || item.PaymentStatus == 'Returned')) {
                                $scope.EditMode = " - EDIT mode";
                                $scope.OverageDisable = false;
                                // document.getElementById('OtherExpensebtn').style.display = 'block';
                            }

                            if (item.PaymentStatus == 'Paid' || item.PaymentStatus == 'Over Age') {
                                $scope.EditMode = " - READ-ONLY";
                                $scope.Overage
                                Disable = true;

                            }

                            // alert("4");
                            break;
                        case 'National Staff':
                            if (item.PaymentStatus == 'Submitted') {

                                $scope.paystatuslist = [{
                                    name: 'Submitted',
                                    value: 'Submitted'
                                }, {
                                    name: 'Returned',
                                    value: 'Returned'
                                }, {
                                    name: 'Paid',
                                    value: 'Paid'
                                }, {
                                    name: 'Over Age',
                                    value: 'Over Age'
                                }];
                            }


                            if (($scope.useremail != $scope.expenseemail) && (item.PaymentStatus == 'Submitted')) {
                                $scope.EditMode = " - PAYMENT STATUS UPDATE ONLY";
                                $scope.OverageDisable = true;
                                // document.getElementById('divgoback').style.display = 'none';
                            }

                            // alert("5");
                            break;

                    }
                    console.log(" status check - ", $scope.useremail, $scope.expenseemail, item.PaymentStatus);
                    // alert($scope.useremail);
                    var storageRefPic = '';
                    $scope.vimageurl = item.ImageURL;
                    var vTotalLineCost = 0;
                    //alert(item.ImageURL[0].FileName);

                    // --- clear $scope.LineDetails Array
                    $scope.LineDetails = [];
                    for (var i = $scope.LineDetails.length; i > 0; i--) {
                        $scope.LineDetails.pop();
                    }

                    //---ADD line item array ---//
                    $scope.TotalLineCost = 0;

                    if (item.Line.length) {
                        var i = 0;

                        for (var x = 0; x < item.Line.length; x++) {
                            // console.log("Scope Value Data - ", item.Line[x].Amount, x);

                            if (x > 1) {
                                vTotalLineCost = vTotalLineCost + parseFloat(item.Line[x].Amount);
                                // console.log("Load amount ", vTotalLineCost, parseFloat(item.Line[x].Amount));
                                $scope.LineDetails.push({
                                    "Description": item.Line[x].Description,
                                    "Amount": parseFloat(item.Line[x].Amount)
                                });

                            }
                        }

                        $scope.TotalLineCost = vTotalLineCost;
                        // console.log("Scope Value", item.Line, vTotalLineCost, $scope.TotalLineCost, $scope.LineDetails);
                        $scope.$applyAsync();

                    }

                    if (item.PaymentLog.length) {

                        for (var x = 0; x < item.PaymentLog.length; x++) {
                            // console.log("Inside", $scope.LineDetails[x]);

                            $scope.PayStatusLogList.push({
                                'PayStatus': item.PaymentLog[x].PayStatus,
                                'PayStatusBy': item.PaymentLog[x].PayStatusBy,
                                'PayStatusDate': item.PaymentLog[x].PayStatusDate,
                                'PayRole': item.PaymentLog[x].PayRole,
                                'PayStatusDescription': item.PaymentLog[x].PayStatusDescription
                            });

                        }
                        // console.log("Scope Payment Status", $scope.PayStatusLogList);
                    }


                    if (item.ImageURL) {
                        console.log("Hello Image check", item.ImageURL);
                        for (var i = 0; i < item.ImageURL.length; i++) {
                            console.log("Hello Image ", item.ImageURL[i].FileName);
                            var storageloc = '';
                            var urlinfo = '';
                            // imageList[i] = item.ImageURL[i].FileName;
                            storageloc = item.ImageURL[i].FileName;

                            storageRef.child(storageloc).getDownloadURL().then(function(url) {

                                $scope.vImageList.push({
                                    'ImageSrc': url,
                                    'ImageName': storageloc
                                });
                                console.log("Image Source - ", $scope.vImageList);
                                $scope.$applyAsync();

                            }).catch(function(error) {
                                // Handle any errors
                            });




                        }
                    }

                })


                //})
            })

        }

        $scope.getImageURL = function(storageloc) {

            var refspaedtServ = firebase.database().ref('expense/');
            $scope.spaedServ = $firebaseObject(refspaedtServ);
            $scope.url = refspaedtServ.once("value").then(function(rootSnapshot) {
                var lafoto = rootSnapshot.val().foto;
                console.log("Inside image ", lafoto)
                // var starsRef = firebase.storage().ref('fotos' + lafoto);
                var storageRef = firebase.storage().ref();
                return storageRef.child(storageloc).getDownloadURL().then(function(url) {
                    // return starsRef.getDownloadURL().then(function(url) {
                    console.log("la url ", url);
                    $scope.returnurl = url;
                    return url;
                }).catch(function(error) {

                });
            });



            // var storageRef = firebase.storage().ref();
            // return storageRef.child(storageloc).getDownloadURL().then(function(url) {

            //     $scope.returnurl = url;
            //     console.log("Image func - 0  ", $scope.returnurl);
            //     // return url;
            //     return $scope.returnurl
            // })
        }

        //-----Delete Expenses Created by the User --START-------//
        $scope.deleteexp = function() {
            var bill = $routeParams.BillId;
            console.log('Data Delete Request SWAL ', $routeParams.BillId);
            swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(function() {
                expenseservice.deleteExpense(bill)
                swal(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                window.location.href = "#/expense/viewexpense"
            }, function(dismiss) {
                // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                if (dismiss === 'cancel') {
                    swal(
                        'Cancelled',
                        'Your expense is safe',
                        'error'
                    )
                }
            })
        }
        //-----Delete Expenses Created by the User ---END----------//

        //Update Expense - SAVE  and SUBMIT - Parameter value 'update' or 'submit'
        $scope.updateexpense = function(updatetype) {

            var billid = $routeParams.BillId;
            var self = this;

            //var totalamt = (($scope.ExpDetail.dexedit.Line[0].Quantity * $scope.ExpDetail.dexedit.Line[0].Rate) + ($scope.ExpDetail.dexedit.Line[1].Quantity * $scope.ExpDetail.dexedit.Line[1].Rate));
            var totalamt = ((self.dexedit.Line[0].Quantity * self.dexedit.Line[0].Rate) + (self.dexedit.Line[1].Quantity * self.dexedit.Line[1].Rate));

            // var totalamt = ($scope.ExpDetail.dexedit.Line[0].Quantity * $scope.ExpDetail.dexedit.Line[0].Rate);
            //+ ($scope.ExpDetail.dexedit.Line[1].Quantity * $scope.ExpDetail.dexedit.Line[1].Rate));
            var StatusChangedBy = $scope.userName.name.first + ' ' + $scope.userName.name.last;
            var currentdate = new Date();
            var StatusChangedDate = "";
            if (currentdate.getHours() > 12) {
                StatusChangedDate = (currentdate.getMonth() + 1) + '/' + currentdate.getDate() + '/' + currentdate.getFullYear() + ' ' + (currentdate.getHours() - 12) + ':' + currentdate.getMinutes() + ':' + currentdate.getSeconds() + ' PM';

            } else {
                StatusChangedDate = (currentdate.getMonth() + 1) + '/' + currentdate.getDate() + '/' + currentdate.getFullYear() + ' ' + currentdate.getHours() + ':' + currentdate.getMinutes() + ':' + currentdate.getSeconds() + ' AM';

            };

            //Re-Submit for Participant/Volunteer - so when they update - status changes to Pending
            //Returned for Chapter Lead - Only Payment Status update  not here
            //Expense created by Chapter Lead - then SAVE will change status to Submitted
            if (updatetype == "update") {
                switch ($scope.paystat) {
                    case 'Resubmit':
                        $scope.paystat = 'Pending';
                        $scope.PayStatusLogList.push({
                            "PayStatus": 'Pending',
                            "PayStatusBy": StatusChangedBy,
                            "PayStatusDate": StatusChangedDate,
                            "PayRole": $scope.userRole,
                            "PayStatusDescription": 'Resending expense with fixes'

                        });
                        break;
                    case 'Returned':
                        $scope.paystat = 'Submitted';
                        $scope.PayStatusLogList.push({
                            "PayStatus": 'Submitted',
                            "PayStatusBy": StatusChangedBy,
                            "PayStatusDate": StatusChangedDate,
                            "PayRole": $scope.userRole,
                            "PayStatusDescription": 'Resending expense with fixes'

                        });
                        break;
                }
            } else {
                switch ($scope.userRole) {
                    case 'Participant':
                    case 'Volunteer':
                        $scope.paystat = 'Pending';
                        $scope.PayStatusLogList.push({
                            "PayStatus": 'Pending',
                            "PayStatusBy": StatusChangedBy,
                            "PayStatusDate": StatusChangedDate,
                            "PayRole": $scope.userRole,
                            "PayStatusDescription": 'Saved expense submitted to Chapter Lead'

                        });
                        break;
                    case 'Chapter Lead':
                        $scope.paystat = 'Submitted';
                        $scope.PayStatusLogList.push({
                            "PayStatus": 'Submitted',
                            "PayStatusBy": StatusChangedBy,
                            "PayStatusDate": StatusChangedDate,
                            "PayRole": $scope.userRole,
                            "PayStatusDescription": 'Saved expense submitted to National Staff'

                        });
                        break;
                }
            }

            //Code added to remove $$HashKey in the array
            for (var x = 0; x < $scope.PayStatusLogList.length; x++) {
                // console.log("array ", x, $scope.PayStatusLogList.length);
                if ($scope.PayStatusLogList[x] != null) {
                    delete $scope.PayStatusLogList[x].$$hashKey;
                }

            }

            var expenseupdate = {
                "Description": self.dexedit.Description,
                "Amount": totalamt,
                "PaymentStatus": $scope.paystat,
                "PaymentLog": $scope.PayStatusLogList,
                "Line": [{
                        "ID": "0",
                        "Description": self.dexedit.Line[0].Description,
                        "Quantity": self.dexedit.Line[0].Quantity, // this.exp.miles,
                        "Rate": self.dexedit.Line[0].Rate,
                        "Amount": self.dexedit.Line[0].Quantity * self.dexedit.Line[0].Rate //(this.exp.miles * .25)
                    }, {
                        "ID": "1",
                        "Description": self.dexedit.Line[1].Description,
                        "Quantity": self.dexedit.Line[1].Quantity, //this.exp.trailermiles,
                        "Rate": self.dexedit.Line[1].Rate,
                        "Amount": self.dexedit.Line[1].Quantity * self.dexedit.Line[1].Rate //(this.exp.trailermiles * .4)
                    }

                ],
                ImageURL: []
            };


            var oldimagecount = 0;
            if ($scope.vImageList !== undefined) {
                if ($scope.vImageList.length) {
                    oldimagecount = $scope.vImageList.length;
                    for (var x = 0; x < $scope.vImageList.length; x++) {
                        console.log("Update- image ", x, expenseupdate.ImageURL, $scope.vImageList);
                        expenseupdate.ImageURL.push({
                            "FileName": $scope.vImageList[x].ImageName,
                            "ID": x,
                            "ImageUrlLocation": $scope.vImageList[x].ImageSrc,
                        });
                    }
                }
            }


            var imagefilename = "";

            if ($scope.uploader !== undefined) {
                if ($scope.uploader.queue.length > 0) {
                    for (var x = 0; x < $scope.uploader.queue.length; x++) {
                        imagefilename = 'images/' + $routeParams.BillId + "_" + $scope.uploader.queue[x].file.name;

                        expenseupdate.ImageURL.push({
                            "FileName": imagefilename,
                            "ID": (x + 1 + oldimagecount),
                            "ImageUrlLocation": ""
                        })
                    }
                }
                var imageurl = '';
                if ($scope.uploader.queue.length > 0) {
                    imageurl = expenseservice.SaveImageData($routeParams.BillId, $scope.uploader.queue);

                    console.log("save image - ", imageurl);
                }
            }

            var lineamount = 0;
            if ($scope.LineDetails.length) {
                var i = 2;
                for (var x = 0; x < $scope.LineDetails.length; x++) {

                    lineamount = parseFloat(lineamount) + parseFloat($scope.LineDetails[x].Amount);
                    console.log("Update-", x, expenseupdate.Line, $scope.LineDetails, lineamount, totalamt);

                    expenseupdate.Line.push({
                        "ID": i,
                        "Description": $scope.LineDetails[x].Description,
                        "Quantity": 1,
                        "Rate": 1,
                        "Amount": parseFloat($scope.LineDetails[x].Amount)
                    });
                    i++;
                    // console.log("Update-", x, expenseupdate.Line, $scope.LineDetails[x].Amount, lineamount);
                }
                expenseupdate.Amount = totalamt + lineamount;
            }

            // var totalamt = totalamt + lineamount;
            console.log("Update", expenseupdate, totalamt);
            // alert(expenseupdate);
            var query = firebase.database().ref('expense/').orderByChild("BillId").equalTo($routeParams.BillId);
            query.on('child_added', function(snap) {
                var obj = snap.val();
                console.log("key ", snap.key);
                firebase.database().ref('expense/' + snap.key).update(expenseupdate);
                // alert("Expense Successfully Updated ");
                swal('Expense Updated Successfully!', '', 'success');


            });

            $location.path("expense/viewexpense");

        }


        $scope.UpdatePaymentStatus = function(billid, paymentstat, statreason) {

            console.log("Update Payment Status - ", billid, paymentstat, statreason);
            var StatusChangedBy = $scope.userName.name.first + ' ' + $scope.userName.name.last;

            var currentdate = new Date();
            var StatusChangedDate = "";

            if (currentdate.getHours() > 12) {
                StatusChangedDate = (currentdate.getMonth() + 1) + '/' + currentdate.getDate() + '/' + currentdate.getFullYear() + ' ' + (currentdate.getHours() - 12) + ':' + currentdate.getMinutes() + ':' + currentdate.getSeconds() + ' PM';

            } else {
                StatusChangedDate = (currentdate.getMonth() + 1) + '/' + currentdate.getDate() + '/' + currentdate.getFullYear() + ' ' + currentdate.getHours() + ':' + currentdate.getMinutes() + ':' + currentdate.getSeconds() + ' AM';

            }

            $scope.PayStatusLogList.push({
                "PayStatus": paymentstat,
                "PayStatusBy": StatusChangedBy,
                "PayStatusDate": StatusChangedDate,
                "PayRole": $scope.userRole,
                "PayStatusDescription": statreason
            });


            for (var x = 0; x < $scope.PayStatusLogList.length; x++) {
                // console.log("array ", x, $scope.PayStatusLogList.length);
                if ($scope.PayStatusLogList[x] != null) {
                    delete $scope.PayStatusLogList[x].$$hashKey;
                }

            }

            // console.log($scope.PayStatusLogList, $scope.PayStatusLogList.length);
            // var jsondata = angular.toJson($scope.PayStatusLogList);
            var ePaymentLog = {
                "PaymentStatus": paymentstat,
                "PaymentLog": $scope.PayStatusLogList
            };
            // console.log(expensedata, StatusChangedDate, $scope.PayStatusLogList, ePaymentLog, $routeParams.BillId, billid);
            var query = firebase.database().ref('expense').orderByChild("BillId").equalTo(billid);
            query.on('child_added', function(snap) {
                var obj = snap.val();
                console.log("key ", snap.key, ePaymentLog);
                //commonServices.updateData('expense/' + snap.key, ePaymentLog);
                // console.log(ePaymentLog);
                firebase.database().ref('expense/' + snap.key).update(ePaymentLog);

                swal('Payment Status Updated Successfully!', '', 'success');

            });


            $location.path("expense/viewexpense");

        }

        loadexpensedata();
        $scope.$applyAsync();

    });
