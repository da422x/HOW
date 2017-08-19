/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:SignEventWaiver
 * @description
 * # SignEventWaiver
 * Controller of the ohanaApp
 */
angular.module('ohanaApp')
  .controller('SignEventWaiver', ['$scope', '$rootScope', '$q', 'commonServices', 'userService', '$uibModalInstance', 'howLogService', 'eventKey',
    function($scope, $rootScope, $q, commonServices, userService, $uibModalInstance, howLogService, eventKey) {
      'use strict';
      // $uibModalInstance.dismiss('cancel');
      // $rootScope.siteData.regionsChapters;
      // commonServices.getData('/userData/' + selectedUID);
      var d = document;
      // $uibModalInstance.dismiss('cancel');
      // $rootScope.siteData.regionsChapters;
      // commonServices.getData('/userData/' + selectedUID);

      // $scope.pdfService = pdfService;
      // $scope.updateMediaWaiverTemplate = function(a, idx) {
      //     var val = a.value;
      //     var c = document.getElementById("the-canvas1").getContext("2d");
      // }

      $scope.updateMediaWaiverTemplate = function(a, idx) {
        var val = a.value;
        $scope.superObj[a.id] = a.value; //document.getElementById("the-canvas1").getContext("2d")
      }
      $scope.submitData = function() {
        $scope.updateMediaWaiverTemplate(d.getElementById("author_name"), 2);
        $scope.updateMediaWaiverTemplate(d.getElementById("author_date"), 3);
        // overlayWitnessSignature();
        $scope.updateMediaWaiverTemplate(d.getElementById("witness_name"), 13);
        $scope.updateMediaWaiverTemplate(d.getElementById("witness_date"), 14);
        commonServices.pushData('/userData/' + userService.getId() + '/events/' + eventKey, $scope.superObj);

        $uibModalInstance.dismiss('cancel');
      }
      $scope.superObj = {};
    }
  ]);
