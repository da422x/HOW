'use strict';

/**
 * @ngdoc function
 * @name ohanaApp.controller:NewexpenseCtrl
 * @description
 * # NewexpenseCtrl
 * Controller of the ohanaApp
 */
angular.module('ohanaApp')
  .controller('NewExpenseCtrl', function ($scope, expenseservice, commonServices, $location) {
   
   var user = this;

 $scope.exp = {};
 $scope.exp = expenseservice.expense;

 $scope.exp.email = commonServices.getCurrentUserEmail();
 $scope.userinfo = commonServices.getUserChapter();
 //   alert($scope.userinfo.viewuserdata[0].name.first, $scope.userinfo.viewuserdata[0].name.last);


 $scope.createnewexpense = function() {

     var Line = [];
     var ImageFile = [];
     var BillId = [];
     var jsonString = '';
     var obj = {}; //new Object();
     var i = 0;
     console.log("New expense entry ");
     var input = document.getElementById('files');
     $scope.exp.Chapter = $scope.userinfo.viewuserdata[0].Chapter;
     $scope.exp.SubmitBy = $scope.userinfo.viewuserdata[0].name.first + ' ' + $scope.userinfo.viewuserdata[0].name.last;
     $scope.exp.PaymentStatus = "Pending";
     var currentdate = new Date();
     $scope.exp.BillId = $scope.userinfo.viewuserdata[0].address.state + currentdate.getFullYear() + (currentdate.getMonth() + 1) + currentdate.getDate() + +currentdate.getHours() + currentdate.getMinutes() + currentdate.getSeconds() + Math.floor((Math.random() * 1000) + 1);
     $scope.exp.SubmitDate = (currentdate.getMonth() + 1) + '/' + currentdate.getDate() + '/' + currentdate.getFullYear();
     $scope.exp.SubmitAddress = $scope.userinfo.viewuserdata[0].address.line1 + ' , ' + $scope.userinfo.viewuserdata[0].address.line2 + ' , ' + $scope.userinfo.viewuserdata[0].address.city + ' , ' + $scope.userinfo.viewuserdata[0].address.state + ' , ' + $scope.userinfo.viewuserdata[0].address.zip;
     $scope.exp.Line[0].Amount = $scope.exp.Line[0].Quantity * $scope.exp.Line[0].Rate;
     $scope.exp.Line[1].Amount = $scope.exp.Line[1].Quantity * $scope.exp.Line[1].Rate;
     $scope.exp.Amount = (($scope.exp.Line[0].Quantity * $scope.exp.Line[0].Rate) + ($scope.exp.Line[1].Quantity * $scope.exp.Line[1].Rate) + ($scope.exp.Line[2].Amount * 1) + ($scope.exp.Line[3].Amount * 1))

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

             console.log('success : data pushed');

         })
         .catch(function(error) {
             var errorCode = error.code;
             var errorMessage = error.message;
             console.log('ERROR: ' + error.code + ': ' + error.message);
         });

     if (input.files.length > 0) {

         LoadImageData($scope.exp.BillId, datalocation);

     }
     alert("Success:  New Expense created for event - " + this.exp.eventdate);

     $location.path("#/expense_view");

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