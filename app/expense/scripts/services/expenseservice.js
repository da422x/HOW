 
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

  $scope.expense = [];
var ref = firebase.database().ref('/expense').on('value', function(snapshot) {   
      $scope.expense =snapshot.val(); 
       
 }) 
     
 this.getExpense = function() {
    return expense;
  };

  this.getExpenseAt = function(_billid) {
    this.getExpense();
    return filterFilter(expense, {
      BillId: _billid
    })[0];
  };