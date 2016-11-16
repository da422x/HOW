'use strict';

/**
 * @ngdoc function
 * @name mainAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mainAppApp
 */
angular.module('mainAppApp')
  .controller('ViewExpenseCtrl', function ($scope, $filter) {

    var originalList = [];
    $scope.listS = "";
    $scope.lists = {};

    $scope.filterChapters = function (input) {
      var res = [];
      if (Object.keys(input).length !== 0) {

        Object.keys(input).forEach(function (ele, idx, arr) {
          if (res.indexOf(input[ele].Chapter) == -1) {
            res.push(input[ele].Chapter)
          }
        })
        console.log(res);
        return res;
      }
    }

    $scope.filterTable = function () {
      if ($scope.listS) {
        var temp = {};
        Object.keys(originalList).forEach(function (ele) {

          if (originalList[ele].Chapter == $scope.listS)
            temp[ele] = originalList[ele];
        })

        $scope.lists = temp;
      }
      else
        $scope.lists = originalList;

    }

    $scope.viewexpensedata = function () {

      var ref = firebase.database().ref('/expense').on('value', function (snapshot) {

        $scope.lists = originalList = snapshot.val();
        console.log("sample", originalList);
        $scope.chapters = $scope.filterChapters(snapshot.val())
        $scope.$applyAsync();  //added to avoid lag in ng-repeat update on load
      })
    }


    $scope.filterPaidStatus = function () {
      //$scope.counter++;
      console.log('Paid Status filter');
    };



    $scope.idSelectedBill = null;
    $scope.setSelected = function (idSelectedBill) {
      $scope.idSelectedBill = idSelectedBill;
      //alert($scope.idSelectedBill); 
    };



  });
