'use strict';

/**
 * @ngdoc function
 * @name mainAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mainAppApp
 */
angular.module('mainAppApp')
  .controller('ViewExpenseCtrl',  function($scope, $filter) {
     
  

 $scope.lists = {};

  $scope.viewexpensedata = function()
  {

       var ref = firebase.database().ref('/expense').on('value', function(snapshot) { 
       $scope.lists =snapshot.val(); 
      $scope.$applyAsync();  //added to avoid lag in ng-repeat update on load
       })
  }

 
$scope.filterPaidStatus = function() {
    //$scope.counter++;
	console.log('Paid Status filter');
  };
 


$scope.idSelectedBill = null;
$scope.setSelected = function (idSelectedBill) {
  $scope.idSelectedBill = idSelectedBill;
  	//alert($scope.idSelectedBill); 
};

  

});
 