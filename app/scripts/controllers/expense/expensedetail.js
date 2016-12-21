'use strict';

/**
 * @ngdoc function
 * @name ohanaApp.controller:ExpensedetailCtrl
 * @description
 * # ExpensedetailCtrl
 * Controller of the ohanaApp
 */
angular.module('ohanaApp')
    .controller('ExpenseDetailsCtrl', function($scope, $rootScope, $routeParams, commonServices, expenseservice, $location, $uibModal, $log, $document) {

        $scope.expense = {};
        $scope.expense = expenseservice.expense;
        $scope.userRole = $rootScope.userRole
        $scope.userName = $rootScope.userData;

        //----Modal -- Payment Status Log  ---------//
        var $ctrl = this;

        $scope.open = function() {
            $scope.$modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: "myModalContent.html",
                size: '',
            })
        };

        $scope.ok = function() {
            $scope.$modalInstance.close();
        };

        $scope.cancel = function() {
            $scope.$modalInstance.dismiss('cancel');
        };


        //------------Addition Line Items--------------//
        $scope.LineDetails = [];

        $scope.addNew = function(LineDetails) {
            if ($scope.userRole == 'Volunteer' || $scope.userRole == 'Participant') {
                $scope.LineDetails.push({
                    'Description': "",
                    'Amount': ""
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

                    console.log("line amount change", vTotalLineCost, $scope.LineDetails[x].Amount);

                }
            }

            $scope.$applyAsync();
            $scope.TotalLineCost = vTotalLineCost;
            // $scope.TotalLineCost = parseFloat(vTotalLineCost);
            // console.log("line amount change", $scope.TotalLineCost, $scope.LineDetails, parseFloat(item.Line[x].Amount));
        }

        function loadexpensedata() {


            var ref = firebase.database().ref('expense').orderByChild("BillId").equalTo($routeParams.BillId);
            //alert($routeParams.BillId);   
            $scope.vimageurl = [];
            $scope.isdisabled = false;
            $scope.PayStatusLogList = [];
            ref.on('value', function(snapshot) {
                //  $scope.$apply(function(){
                $scope.expense = snapshot.val();
                console.log("Expense Detail Loaded", $scope.expense);
                $scope.$applyAsync();


                angular.forEach($scope.expense, function(item) {

                    var img = document.createElement('img');
                    var storage = firebase.storage();
                    var storageRef = firebase.storage().ref();

                    var storageRefPic = '';
                    $scope.vimageurl = item.ImageURL;
                    var vTotalLineCost = 0;
                    //alert(item.ImageURL[0].FileName);

                    //---ADD line item array ---//
                    if (item.Line.length) {
                        var i = 2;
                        for (var x = 0; x < item.Line.length; x++) {

                            if (x > 1) {
                                vTotalLineCost = vTotalLineCost + parseFloat(item.Line[x].Amount);
                                console.log("Load amount ", vTotalLineCost, parseFloat(item.Line[x].Amount));
                                $scope.LineDetails.push({
                                    'Description': item.Line[x].Description,
                                    'Amount': item.Line[x].Amount
                                });
                            }
                        }
                        $scope.TotalLineCost = vTotalLineCost;
                        console.log("Scope Value", item.Line, $scope.TotalLineCost);
                        $scope.$applyAsync();

                    }

                    if (item.PaymentLog.length) {

                        for (var x = 0; x < item.PaymentLog.length; x++) {
                            // console.log("Inside", $scope.LineDetails[x]);

                            $scope.PayStatusLogList.push({
                                'PayStatus': item.PaymentLog[x].PayStatus,
                                'PayStatusBy': item.PaymentLog[x].PayStatusBy,
                                'PayStatusDate': item.PaymentLog[x].PayStatusDate,
                                'PayRole': item.PaymentLog[x].PayRole
                            });

                        }
                        console.log("Scope Payment Status", $scope.PayStatusLogList);
                    }

                    if (item.ImageURL) {

                        for (var i = 0; i < item.ImageURL.length; i++) {
                            console.log("Hello Image ", item.ImageURL[i].FileName);
                            var storageloc = '';

                            // imageList[i] = item.ImageURL[i].FileName;
                            storageloc = item.ImageURL[i].FileName;


                            if (i == 0) {

                                storageRef.child(storageloc).getDownloadURL().then(function(url) {
                                    document.getElementById("image0").src = url;
                                    document.getElementById("image0").hidden = false;

                                }).catch(function(error) {
                                    // Handle any errors
                                });
                            };

                            if (i == 1) {

                                storageRef.child(storageloc).getDownloadURL().then(function(url) {
                                    document.getElementById("image1").src = url;
                                    document.getElementById("image1").hidden = false;

                                }).catch(function(error) {
                                    // Handle any errors
                                });
                            };

                            if (i == 2) {
                                storageRef.child(storageloc).getDownloadURL().then(function(url) {
                                    document.getElementById("image2").src = url;
                                    document.getElementById("image2").hidden = false;

                                }).catch(function(error) {
                                    // Handle any errors
                                });
                            };

                            if (i == 3) {
                                storageRef.child(storageloc).getDownloadURL().then(function(url) {
                                    document.getElementById("image3").src = url;
                                    document.getElementById("image3").hidden = false;

                                }).catch(function(error) {
                                    // Handle any errors
                                });
                            };

                            if (i == 4) {
                                storageRef.child(storageloc).getDownloadURL().then(function(url) {
                                    document.getElementById("image4").src = url;
                                    document.getElementById("image4").hidden = false;

                                }).catch(function(error) {
                                    // Handle any errors
                                });
                            };

                            if (i == 5) {
                                storageRef.child(storageloc).getDownloadURL().then(function(url) {
                                    document.getElementById("image5").src = url;
                                    document.getElementById("image5").hidden = false;

                                }).catch(function(error) {
                                    // Handle any errors
                                });
                            };

                            if (i == 6) {
                                storageRef.child(storageloc).getDownloadURL().then(function(url) {
                                    document.getElementById("image6").src = url;
                                    document.getElementById("image6").hidden = false;

                                }).catch(function(error) {
                                    // Handle any errors
                                });
                            };

                            if (i == 7) {
                                storageRef.child(storageloc).getDownloadURL().then(function(url) {
                                    document.getElementById("image7").src = url;
                                    document.getElementById("image7").hidden = false;

                                }).catch(function(error) {
                                    // Handle any errors
                                });
                            };

                            if (i == 8) {
                                storageRef.child(storageloc).getDownloadURL().then(function(url) {
                                    document.getElementById("image8").src = url;
                                    document.getElementById("image8").hidden = false;

                                }).catch(function(error) {
                                    // Handle any errors
                                });
                            };

                            if (i == 9) {
                                storageRef.child(storageloc).getDownloadURL().then(function(url) {
                                    document.getElementById("image9").src = url;
                                    document.getElementById("image9").hidden = false;

                                }).catch(function(error) {
                                    // Handle any errors
                                });
                            };




                        }
                    }

                })


                //})
            })

        }


        $scope.updateexpense = function(billid) {


            var self = this;
            var totalamt = ((self.dexedit.Line[0].Quantity * self.dexedit.Line[0].Rate) + (self.dexedit.Line[1].Quantity * self.dexedit.Line[1].Rate));


            var expenseupdate = {
                "Description": self.dexedit.Description,
                "Amount": totalamt,
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

                ]
            };

            var lineamount = 0;
            if ($scope.LineDetails.length) {
                var i = 2;
                for (var x = 0; x < $scope.LineDetails.length; x++) {

                    // $scope.lineamount = parseFloat($scope.lineamount) + parseFloat($scope.LineDetails[x].Amount);

                    lineamount = parseFloat(lineamount) + parseFloat($scope.LineDetails[x].Amount);
                    // if (x > 1) {
                    expenseupdate.Line.push({

                        "ID": i,
                        "Description": $scope.LineDetails[x].Description,
                        "Quantity": 1,
                        "Rate": 1,
                        "Amount": parseFloat($scope.LineDetails[x].Amount)
                    });
                    //} 
                    i++;
                    console.log("Update-", x, expenseupdate.Line, $scope.LineDetails[x].Amount, lineamount);
                }
                expenseupdate.Amount = totalamt + lineamount;
            }

            // var totalamt = totalamt + lineamount;
            console.log("Update", expenseupdate, totalamt);
            // alert(expenseupdate);
            var query = firebase.database().ref('expense/').orderByChild("BillId").equalTo(billid);
            query.on('child_added', function(snap) {
                var obj = snap.val();
                console.log("key ", snap.key);
                firebase.database().ref('expense/' + snap.key).update(expenseupdate);
                // alert("Expense Successfully Updated ");
                swal('Expense Updated Successfully!', '', 'success');


            });

            $location.path("expense/viewexpense");

            //Need to work on this code to load new images part of update expense
            // logic need to be checked

            // var input = document.getElementById('files');
            // var y = 0;
            // var imagefilename;
            // var newimagestoload = input.files.length;
            // if (newimagestoload > 0) {
            //     // jsonString = jsonString + ', ' + '"ImageURL" :  [  ';
            //     for (var x = currentimagecount; x < (currentimagecount + newimagestoload); x++) {

            //         imagefilename = 'images/' + billid + "_" + input.files[y].name;
            //         console.log("Expense Detail Update Image", imagefilename);
            //         var addimage = {
            //             ID: (x),
            //             ImageUrlLocation: "",
            //             FileName: imagefilename
            //         };
            //         y = y + 1;
            //         console.log("New Image", addimage, imagefilename, x);

            //         firebase.database().ref('expense').orderByChild("BillId").equalTo(billid)
            //             .on("child_added", function(snapshot) {
            //                 firebase.database().ref('expense/' + snapshot.key + '/ImageURL/').push(addimage);
            //                 //.set(temp);
            //             });
            //     }


            // }


        }

        $scope.UpdatePaymentStatus = function(billid, paymentstat) {

            var StatusChangedBy = $scope.userName.name.first + ' ' + $scope.userName.name.last;
            // $scope.userinfo.viewuserdata[0].name.first + ' ' + $scope.userinfo.viewuserdata[0].name.last;

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
                "PayRole": $scope.userRole,
                "PayStatusDate": StatusChangedDate

            });
            var ePaymentLog = {
                "PaymentStatus": paymentstat,
                "PaymentLog": $scope.PayStatusLogList
            };

            console.log(StatusChangedDate, $scope.PayStatusLogList, ePaymentLog);
            var query = firebase.database().ref('expense/').orderByChild("BillId").equalTo(billid);
            query.on('child_added', function(snap) {
                var obj = snap.val();
                console.log("key ", snap.key);
                firebase.database().ref('expense/' + snap.key).update(ePaymentLog);

                swal('Expense Updated Successfully!', '', 'success');

            });


            $location.path("expense/viewexpense");

        }

        loadexpensedata();
        $scope.$applyAsync();

    });
