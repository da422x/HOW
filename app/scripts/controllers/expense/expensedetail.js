'use strict';

/**
 * @ngdoc function
 * @name ohanaApp.controller:ExpensedetailCtrl
 * @description
 * # ExpensedetailCtrl
 * Controller of the ohanaApp
 */
angular.module('ohanaApp')
    .controller('ExpenseDetailsCtrl', function($scope, $routeParams, commonServices, expenseservice, $location) {

        $scope.expense = {};
        $scope.userinfo = commonServices.getUserChapter();
        $scope.expense = expenseservice.expense;

        this.expenseupdate = {
            BillId: "",
            Description: "",
            Amount: 0,
            Line: [{
                "ID": "1",
                "Quantity": 0, // this.exp.miles,
                "Rate": 0.25,
                "Amount": 0 //(this.exp.miles * .25)
            }, {
                "ID": "2",
                "Quantity": 0, //this.exp.trailermiles,
                "Rate": 0.4,
                "Amount": 0 //(this.exp.trailermiles * .4)
            }, {
                "ID": "3",
                "Description": "",
                "Amount": 0
            }, {
                "ID": "4",
                "Description": "",
                "Amount": 0
            }]
        }

        //------------Addition Line Items--------------//
        $scope.LineDetails = [];

        $scope.addNew = function(LineDetails) {
            $scope.LineDetails.push({
                'Description': "",
                'Amount': ""
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

        // if ($scope.userinfo.viewuserdata[0].role != 'areacoordinator') {
        //     $scope.btn_remove =
        // }

        //  $scope.dexedit = this.expense;

        //$scope.$applyAsync();
        function loadexpensedata() {


            var ref = firebase.database().ref('expense').orderByChild("BillId").equalTo($routeParams.BillId);
            //alert($routeParams.BillId);   
            $scope.vimageurl = [];
            $scope.isdisabled = false;
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
                    //alert(item.ImageURL[0].FileName);

                    //---ADD line item array ---//
                    if (item.Line.length) {
                        var i = 2;
                        for (var x = 0; x < item.Line.length; x++) {
                            // console.log("Inside", $scope.LineDetails[x]);
                            if (x > 1) {
                                $scope.LineDetails.push({
                                    'Description': item.Line[x].Description,
                                    'Amount': item.Line[x].Amount
                                });
                            }
                        }
                        console.log("Scope Value", item.Line);
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
            var totalamt = ((self.dexedit.Line[0].Quantity * self.dexedit.Line[0].Rate) + (self.dexedit.Line[1].Quantity * self.dexedit.Line[1].Rate) + (self.dexedit.Line[2].Amount * 1) + (self.dexedit.Line[3].Amount * 1));


            var expenseupdate = {
                "Description": self.dexedit.Description,
                "Amount": totalamt,
                "Line": [{
                    "ID": "1",
                    "Quantity": self.dexedit.Line[0].Quantity, // this.exp.miles,
                    "Rate": self.dexedit.Line[0].Rate,
                    "Amount": self.dexedit.Line[0].Quantity * self.dexedit.Line[0].Rate //(this.exp.miles * .25)
                }, {
                    "ID": "2",
                    "Quantity": self.dexedit.Line[1].Quantity, //this.exp.trailermiles,
                    "Rate": self.dexedit.Line[1].Rate,
                    "Amount": self.dexedit.Line[1].Quantity * self.dexedit.Line[1].Rate //(this.exp.trailermiles * .4)
                }, {
                    "ID": "3",
                    "Description": self.dexedit.Line[2].Description,
                    "Amount": self.dexedit.Line[2].Amount
                }, {
                    "ID": "4",
                    "Description": self.dexedit.Line[3].Description,
                    "Amount": self.dexedit.Line[3].Amount
                }]
            };


            var query = firebase.database().ref('expense/').orderByChild("BillId").equalTo(billid);
            query.on('child_added', function(snap) {
                var obj = snap.val();
                console.log("key ", snap.key);
                firebase.database().ref('expense/' + snap.key).update(expenseupdate);
                // alert("Expense Successfully Updated ");
                swal('Expense Updated Successfully!', '', 'success');


            });

            // var currentimagecount = 0;
            // angular.forEach($scope.expense, function(item) {
            //     if (item.ImageURL) {
            //         currentimagecount = item.ImageURL.length;
            //     }
            // });

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

            var StatusChangedBy = $scope.userinfo.viewuserdata[0].name.first + ' ' + $scope.userinfo.viewuserdata[0].name.last;

            var currentdate = new Date();
            var StatusChangedDate = (currentdate.getMonth() + 1) + '/' + currentdate.getDate() + '/' + currentdate.getFullYear();

            var paymentstatupdate = {
                "PaymentStatus": paymentstat,
                "PaymentStatusBy": StatusChangedBy,
                "PaymentStatusDate": StatusChangedDate
            };

            var self = this;
            firebase.database().ref('expense').orderByChild("BillId").equalTo(billid)
                .on("child_added", function(snapshot) {

                    firebase.database().ref('expense/' + snapshot.key).update(paymentstatupdate);
                    //.set(temp);
                    swal('Payment Status Updated!', '', 'success');

                });

            $location.path("expense/viewexpense");

        }

        loadexpensedata();
        $scope.$applyAsync();

    });
