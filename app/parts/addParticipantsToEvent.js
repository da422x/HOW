/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:AddParticipantToEvent
 * @description
 * # AddParticipantToEvent
 * Controller of the ohanaApp
 */
angular
  .module('ohanaApp')
  .controller('AddParticipantToEvent', function(
    event,
    $rootScope,
    $q,
    commonServices,
    $scope,
    $uibModalInstance,
    $uibModal
  ) {
    'use strict';

    console.log(event);

    $scope.initialize = function() {

      $scope.searchTypes = ['Name', 'Phone', 'Chapter', 'Email'];
      $scope.selectedType = 'Name';
    };

    $scope.addParticipantToCurrentEvent = function(eventKey, userKey) {

        if (eventKey && userKey) {

            // Build paticipantObj
            var paticipantObj = {
                userKey: userKey
            };

            var addParticipantPromise = commonServices.pushData('events/' + eventKey + '/participants', paticipantObj);

            $q.all([addParticipantPromise]).then(function(data) {

                // TODO: Check for failure. and handle accordingly
                
            });

        } else {

            //TODO: Throw error for missing data.

        }

    };
    
    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');

      // Move user back to manage event for now (change this when we reuse module)
      $uibModal.open({
        templateUrl: '/parts/manageParticipants.html',
        controller: 'ManageParticipantsCtrl',
        resolve: {
          event: function() {
            return event;
          }
        }
      });

    };

  });
