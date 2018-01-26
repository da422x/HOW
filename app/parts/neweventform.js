/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:NewuserdirectoryformCtrl
 * @description
 * # NewEventFormCtrl
 * Controller of the ohanaApp
 */
angular
  .module('ohanaApp')
  .controller('NewEventFormCtrl', function(
    $q,
    $scope,
    $uibModalInstance,
    commonServices,
    userService,
    $rootScope
  ) {
    'use strict';

    $scope.initialize = function() {
      $('#phonenum').mask('(999)999-9999');
      $scope.newEvent = $scope.newEvent || {};
      $scope.chapters = $scope.siteData.chapters;
      $scope.isAdmin = false;

      // Set Admin flag.
      if (userService.getRole() === 'National Staff') {
        $scope.isAdmin = true;
      }

      if (!$scope.isEdit) {
        $scope.newEvent.chapter = userService.getChapter();
        $scope.newEvent.eventOwner = {
          key: userService.getId(),
          name: userService.getUserName(),
          email: userService.getUserEmail()
        };
        $scope.newEvent.eventManager = {
          key: userService.getId(),
          name: userService.getUserName(),
          email: userService.getUserEmail()
        };
      }
      $scope.eventManagerUpdate($scope.newEvent.chapter);
    };

    // handles getting data for Event Manager and Event Owner Drop downs.
    $scope.eventManagerUpdate = function(selectedChapter) {

      // Get User for the selected chapter.
      var newDataSet = commonServices.queryChapterkey(selectedChapter.key);
      var newRoleData = commonServices.getData('/userRoles/');
      $scope.eventManagerList = [];
      $scope.eventOwnerList = [];

      // Run promise.
      $q.all([newDataSet, newRoleData]).then(function(userData) {
        _.each(userData[1], function(userRole, userKey1) {
          if (userRole.role !== 'Participant') {
            _.each(userData[0], function(chapterUser, userKey2) {
              if (userKey1 === userKey2) {
                
                // Event User Object.
                var eventUserObj = {
                    key: userKey2,
                    name: chapterUser.name.first + ' ' + chapterUser.name.last,
                    email: chapterUser.email
                };

                // Volunteers cannot be owners.
                if (userRole.role === 'Volunteer') {
                  $scope.eventManagerList.push(eventUserObj);
                } else {
                  $scope.eventOwnerList.push(eventUserObj);
                  $scope.eventManagerList.push(eventUserObj);
                }

              }
            });
          }
        });

        if (_.isEmpty($scope.eventOwnerList)) {
          $scope.eventOwnerList.push({
            key: false,
            name: ' -- CHAPTER OWNER UNAVAILABLE --'
          });
          $scope.newEvent.eventOwner = $scope.eventOwnerList[0];
        }

        if (_.isEmpty($scope.eventManagerList)) {
          $scope.eventManagerList.push({
            key: false,
            name: ' -- CHAPTER MANAGER UNAVAILABLE --'
          });
          $scope.newEvent.eventManager = $scope.eventManagerList[0];
        }

      });

    };

    // calendar options
    $scope.format = 'MM/dd/yyyy';
    $scope.startpopup = {
      opened: false,
    };

    $scope.startopen = function() {
      $scope.startpopup.opened = true;
    };

    $scope.startDateOptions = {
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1,
      showWeeks: false,
    };

    $scope.endpopup = {
      opened: false,
    };

    $scope.endopen = function() {
      $scope.endpopup.opened = true;
    };

    $scope.endDateOptions = {
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1,
      showWeeks: false,
    };

    $scope.today = function() {
      //TODO: Check if the event date is actually set
      var dateToday = new Date();
      $scope.st = dateToday;
      $scope.et = dateToday;
    };

    $scope.today();

    // event status radio data
    $scope.states = [
      'upcoming-open',
      'upcoming-closed', 
      'in-session', 
      'past'
    ];

    // empty submit object
    $scope.newEvent = $scope.newEvent || {};

    $scope.postEvent = function() {
      var result = null;
      // submit form
      $scope.newEvent.startTime = $scope.st.getTime();
      $scope.newEvent.endTime = $scope.et.getTime();
      $scope.newEvent.initiator = $rootScope.userId;

      if (!$scope.isEdit) {
        $scope.newEvent.status = 'upcoming-open';
        delete $scope.newEvent.chapter['$$hashKey'];
        result = commonServices.pushData('/events/', $scope.newEvent);
        $q.all([result]).then(function(data) {
          if (data[0]) {
            $uibModalInstance.close();
            swal({
              text: 'Adding Event',
              type: 'success',
              timer: 2500,
            });
          } else {
            swal({
              text: 'Something happened....',
              type: 'error',
              timer: 2500,
            });
          }
        });
      } else {
        var key = $scope.newEvent['key'];
        delete $scope.newEvent['key'];
        delete $scope.newEvent['$$hashKey'];
        result = commonServices.updateData('/events/' + key, $scope.newEvent);
        $uibModalInstance.close();
        swal({
          text: 'Saving Event Update',
          type: 'success',
          timer: 2500,
        });
      }
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });
