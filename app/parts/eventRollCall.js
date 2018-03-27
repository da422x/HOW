/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:EventRollCall
 * @description
 * # EventRollCall
 * Controller of the ohanaApp
 */
angular
  .module('ohanaApp')
  .controller('EventRollCall', function(
    eventData,
    $rootScope,
    $q,
    commonServices,
    $scope,
    $uibModalInstance,
    $uibModal
  ) {
    'use strict';

    $scope.eventData = eventData;

    $scope.initialize = function() {
      $scope.userList = $scope.eventData.event.participants;
      $scope.getUserData($scope.eventData.event.participants);
    };

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

    $scope.getUserData = function(userList) {
      var promiseArray = [];
      if (_.isUndefined(userList) || _.isEmpty(userList)) {
        // Display Error.
        $scope.listEmpty = true;
      } else {
        // Get id for each participant, and create promise.
        var guestList = [];
        var guestCounter = 0;
        _.each(userList, function(user) {
          if (!user.guest) {
            promiseArray.push(
              commonServices.getData('userData/' + user.key)
            );
          }
          guestCounter++;
        });

        // Run promise array and handle returned data.
        $q.all(promiseArray).then(function(data) {

          _.each(data, function(userData) {
            var counter = 0;
            _.each($scope.userList, function(currentUser) {
              if (userData.key === currentUser.key) {
                $scope.userList[counter].name = userData.name;
                $scope.userList[counter].email = userData.email;
                return false;
              }
              counter++;
            });
          });

          $scope.setColor();
        
          console.log($scope.userList);
        });
      }
    };

    $scope.isAttending = function(userData) {
      var counter = 0;
      var status = true;
      if (userData.attended) {
        status = false;
      }

      _.each($scope.userList, function(ul) {
        if (ul.key === userData.key) {
          $scope.userList[counter].attended = status;
          $scope.userList[counter].color = (status ? '#68C65E' : '#FD858B');
          commonServices.updateData('events/' + $scope.eventData.event.key + '/participants/' + counter + '/attended', status);
          return;
        }
        counter++;
      });
    };

    $scope.setColor = function() {
      var counter = 0;
      _.each($scope.userList, function(currentUser) {
        $scope.userList[counter].color = (currentUser.attended ? '#68C65E' : '#FD858B');
        counter++;
      });
    };

    
  });
