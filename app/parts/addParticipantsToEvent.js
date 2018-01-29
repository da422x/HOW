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

    $scope.initialize = function() {

      $scope.clearSearch();
      $scope.searchTypes = ['Name', 'Phone', 'Chapter', 'Email'];
      $scope.searchType = 'Name';
      $scope.chapters = $rootScope.siteData.chapters;
      $scope.searchChapter = $scope.chapters[0];
      $scope.foundParticipant = [];
      $scope.selectedParticipant = [];

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

    $scope.runSearch = function() {

      //
      var searchPromise;

      console.log($scope.searchType);


      switch($scope.searchType) {
        case 'Name':
          break;
        case 'Email':
          break;
        case 'Phone':
          break;
        case 'Chapter':
          if ($scope.searchChapter) {

            searchPromise = commonServices.queryChapterkey($scope.searchChapter.key);

            $q.all([searchPromise]).then(function(data) {
              if (data[0]) {
                _.each(data[0], function(user, key) {
                  user.nameText = user.name.first + ' ' + user.name.last;
                  user.key = key;
                  $scope.foundParticipants.push(user);
                });
              }
            });

          }
          break;
        default:
          break;

      }

    };

    $scope.addFoundParticipant = function() {
      if ($scope.foundParticipant[0]) {
        var selectedAlready = false;
        _.each($scope.selectedParticipants, function(selectedParts) {
          if (selectedParts.key === $scope.foundParticipant[0].key) {
            $scope.selectedAlready = true;
            return;
          }
        });
        if (selectedAlready) {
          
        } else {
          $scope.selectedParticipants.push($scope.foundParticipant[0]);
        }
      }
    };

    $scope.clearSearch = function() {
      $scope.searchFirst = false;
      $scope.searchLast = false;
      $scope.searchEmail = false;
      $scope.searchPhone = false;
      $scope.searchChapter = false;
      $scope.foundParticipants = [];
      $scope.selectedParticipants = [];
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
