/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:ManageParticipantsCtrl
 * @description
 * # ManageParticipantsCtrl
 * Controller of the ohanaApp
 */
angular
  .module('ohanaApp')
  .controller('ManageParticipantsCtrl', function(
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
      $scope.getCurrentParticipantsData(event.participants);
    };

    $scope.addParticipantToEvent = function() {
      $uibModal.open({
        templateUrl: '/parts/addParticipantsToEvent.html',
        controller: 'AddParticipantToEvent',
        resolve: {
          event: function() {
            return event;
          }
        }
      });

      $scope.cancel();
    };

    $scope.removeParticipantFromEvent = function(participantKey, eventKey) {

      // Remove user from
      if (participantKey && eventKey) {

        // Remove user from event participants list
        commonServices.removeData('events/' + eventKey + '/participants/' + participantKey);
        delete event.participants[participantKey];

        // TODO: Notify user when complete.

      } else {

        // TODO: Missing data throw error message.

      }
    };

    $scope.getCurrentParticipantsData = function(participantsList) {

      // Initialze Variables.
      var promiseArray = [];

      if (_.isUndefined(participantsList) || _.isEmpty(participantsList)) {

        // TODO: Handle view for no particpants.

      } else {

        // Get id for each participant, and create promise.
        _.each(participantsList, function(participant) {
          promiseArray.push(commonServices.getData('userData/' + participant.key));
        });

        // Run promise array and handle returned data.
        $q.all(promiseArray).then(function(data) {
          console.log(data);
        });

      }

    };
    
    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };

  });
