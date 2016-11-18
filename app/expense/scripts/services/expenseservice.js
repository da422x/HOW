'use strict';

/**
 * @ngdoc service
 * @name mainAppApp.expenseServices
 * @description
 * # expenseServices
 * Service in the mainAppApp - Expense .
 */
angular.module('mainAppApp')
  .service('expenseServices', function(filterFilter) {
  //['$rootScope', '$firebaseAuth', 'DAO' , function ($rootScope, $firebaseAuth, DAO) {


  this.expense = {
      BillId: "",
      Chapter: "MARYLAND CHAPTER",       
      eventdate: "",
      email:"",
      SubmitDate: "",
      Description: "",
      PaymentStatus: "unpaid",
      Amount: 0,
      ImageURL:[],
      Line: [{
          "ID": "1",
          "Description": "Mileage Rate - Travel @.25/mile",
          "Quantity":null,// this.exp.miles,
          "Amount": 0//(this.exp.miles * .25)
      }, {
          "ID": "2",
          "Description": "Trailer Mileage Rate @.40/mile",
          "Quantity": null,//this.exp.trailermiles,
          "Amount": 0//(this.exp.trailermiles * .4)
      }, {
          "ID": "3",
          "Description": "",
          "Quantity": "1",
          "Amount": null
      }, {
          "ID": "4",
          "Description": "",
          "Quantity": "1",
          "Amount": null
      }]

  }

  this.addNewImage = function(obj){
    this.expense.ImageURL.push(obj);
  }

var ref = firebase.database().ref('/expense').on('value', function(snapshot) {   
      $scope.expense =snapshot.val(); 
       
 }) 
     
 this.getExpense = function() {
    return expense;
  };

this.addNewList = function(line){
  expense.Line.push()

}

  this.getExpenseAt = function(_billid) {
    this.getExpense();
    return filterFilter(expense, {
      BillId: _billid
    })[0];
  };


 this.getExpenseChapterList = function () {
  return Chapterlist;
 }

})