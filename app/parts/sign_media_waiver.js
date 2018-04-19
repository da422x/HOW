/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:SignEventWaiver
 * @description
 * # SignEventWaiver
 * Controller of the ohanaApp
 */
angular
  .module('ohanaApp')
  .controller('SignMediaWaiver', function(
    eventData,
    $rootScope,
    $q,
    commonServices,
    $scope,
    $uibModalInstance,
    $uibModal,
    dataGridUtil
  ) {
    'use strict';
    $scope.eventData = eventData;

    $scope.waiverForm = {};

    console.log('got into the modal!');

    // Date time picker options
    $scope.datePopup = {
      opened: false,
    };

    $scope.openDate = function() {
      $scope.datePopup.opened = true;
    };

    $scope.witnessDate = {
      opened: false,
    };

    $scope.openWitnessDate = function() {
      $scope.witnessDate.opened = true;
    };

    $scope.updateMediaWaiverTemplate = function(a, idx) {
      var val = a.value;
      $scope.superObj[a.id] = a.value; //document.getElementById("the-canvas1").getContext("2d")
    };
    $scope.submitData = function(form) {
      if (form.$invalid) {
        console.log('got an error');
        swal({
          text:
            'The form has required fields that are missing data or formatted improperly.',
          type: 'error',
          customClass: 'modal-border',
        });
      } else {
        console.log('submitting data!');
      }
    };
    $scope.superObj = {};

    // close Modal.
    $scope.cancel = function() {
      var getEventData = commonServices.getData(
        'events/' + $scope.eventData.event.key
      );
      $q.all([getEventData]).then(function(data) {
        // Get must recent data for event.
        $scope.eventData.event = data[0];

        // Move user back to manage event for now (change this when we reuse module)
        $uibModalInstance.dismiss('cancel');
        $uibModal.open({
          templateUrl: '/parts/manageParticipants.html',
          controller: 'ManageParticipantsCtrl',
          resolve: {
            eventData: function() {
              return $scope.eventData;
            },
          },
        });
      });
    };
  });
