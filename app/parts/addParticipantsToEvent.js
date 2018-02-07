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
    step,
    $rootScope,
    $q,
    commonServices,
    $scope,
    $uibModalInstance,
    $uibModal
  ) {
    'use strict';

    $scope.initialize = function() {
      $scope.searchTypes = ['Name', 'Phone', 'Chapter', 'Email'];
      $scope.searchType = 'Chapter';
      $scope.selectedParticipants = [];

      $('#guest_phone').mask('(999)999-9999');
      $('#search_phone').mask('(999)999-9999');

      // Add selected events participants list.
      if (event.participants) {
        // Handle guests in participants list.
        var currentList = [];
        _.each(event.participants, function(current_participant) {
          currentList.push(current_participant);
        });

        // Get id for each participant, and create promise.
        var promiseArray = [];
        var guestList = [];
        _.each(currentList, function(participant) {
          if (participant.guest) {
            participant.nameText =
              participant.name.first +
              ' ' +
              participant.name.last +
              ' - ' +
              participant.email;
            guestList.push(participant);
          } else {
            promiseArray.push(
              commonServices.getData('userData/' + participant.key)
            );
          }
        });

        // Run promise array and handle returned data.
        $q.all(promiseArray).then(function(data) {
          if (data) {
            _.each(data, function(udata) {
              udata.nameText =
                udata.name.first + ' ' + udata.name.last + ' - ' + udata.email;
              _.each(currentList, function(current_participant) {
                if (current_participant.key === udata.key) {
                  udata.guest = current_participant.guest;
                  return;
                }
              });
              $scope.selectedParticipants.push(udata);
            });
          } else {
            $scope.selectedParticipants = [];
          }
          $scope.selectedParticipants = $scope.selectedParticipants.concat(
            guestList
          );
        });
      }

      $scope.chapters = $rootScope.siteData.chapters;
      $scope.searchChapter = $scope.chapters[0];
      $scope.foundParticipant = false;
      $scope.removeParticipants = false;
      $scope.memberOrGuest = 'Member';
    };

    $scope.addParticipantToCurrentEvent = function() {
      var updateList = [];
      if (!_.isEmpty($scope.selectedParticipants)) {
        _.each($scope.selectedParticipants, function(selected_user) {
          // Handle guest accounts.
          if (selected_user.guest) {
            updateList.push({
              key: selected_user.key,
              guest: selected_user.guest,
              name: selected_user.name,
              phone: selected_user.phone,
              email: selected_user.email,
              waiver: false,
            });
          } else {
            updateList.push({
              key: selected_user.key,
              guest: selected_user.guest,
            });
          }
        });
      }

      // Update participants list.
      commonServices.updateData(
        'events/' + event.key + '/participants',
        updateList
      );
      swal('Saved', 'Participants List updated!', 'success');
      $scope.cancel();
    };

    $scope.createGuest = function() {
      // Generate key to be used on guest obj.
      var generateGuestKey = commonServices.getNewKey(
        'events/' + event.key + '/participants'
      );
      var existsAlready = false;

      $q.all([generateGuestKey]).then(function(data) {
        if (data[0]) {
          _.each($scope.selectedParticipants, function(currentUser) {
            if (currentUser.email === $scope.guestEmail) {
              existsAlready = true;
              return;
            }
          });

          // Create guest object.
          if (existsAlready) {
            var errorString =
              'Guest email matches a participant in the current participants list, please change email.';
            swal('Duplicate Email', errorString, 'error');
          } else {
            var guestObj = {
              key: data[0],
              guest: true,
              nameText:
                $scope.guestFirst +
                ' ' +
                $scope.guestLast +
                ' - ' +
                $scope.guestEmail,
              name: {
                first: $scope.guestFirst,
                last: $scope.guestLast,
              },
              phone: $scope.guestPhone,
              email: $scope.guestEmail,
            };

            // Reset fields.
            $scope.clearGuestForm();

            // Add guest obj to fount list.
            $scope.foundParticipants.push(guestObj);
          }
        }
      });
    };

    $scope.runSearch = function() {
      // Initliazed Variables.
      var searchPromise = [];
      $scope.foundParticipants = [];

      switch ($scope.searchType) {
        case 'Name':
          if ($scope.searchFirst || $scope.searchLast) {
            // Search for participant via first and last name.
            if ($scope.searchFirst) {
              searchPromise.push(
                commonServices.queryUserFirstName($scope.searchFirst)
              );
            }

            if ($scope.searchLast) {
              searchPromise.push(
                commonServices.queryUserLastName($scope.searchLast)
              );
            }

            $q.all(searchPromise).then(function(data) {
              if (data[0] || data[1]) {
                _.each(data[0], function(user, key) {
                  user.nameText =
                    user.name.first + ' ' + user.name.last + ' - ' + user.email;
                  user.key = key;
                  $scope.foundParticipants.push(user);
                });

                _.each(data[1], function(user, key) {
                  user.nameText =
                    user.name.first + ' ' + user.name.last + ' - ' + user.email;
                  user.key = key;
                  $scope.foundParticipants.push(user);
                });

                $scope.foundParticipants = _.uniq(
                  $scope.foundParticipants,
                  'key'
                );
              }

              // Show user if no participants are available.
              if (_.isEmpty($scope.foundParticipants)) {
                $scope.foundParticipants.push({
                  key: false,
                  nameText:
                    '< No participants available in - ' +
                    $scope.searchChapter.text +
                    ' >',
                });
              }
            });
          }
          break;
        case 'Email':
          if ($scope.searchEmail) {
            // Search for participants via email.
            $scope.foundParticipants = [];
            searchPromise.push(
              commonServices.queryUserEmail($scope.searchEmail)
            );
            $q.all(searchPromise).then(function(data) {
              if (data[0]) {
                _.each(data[0], function(user, key) {
                  user.nameText =
                    user.name.first + ' ' + user.name.last + ' - ' + user.email;
                  user.key = key;
                  user.guest = false;
                  $scope.foundParticipants.push(user);
                });
              }

              // Show user if no participants are available.
              if (_.isEmpty($scope.foundParticipants)) {
                $scope.foundParticipants.push({
                  key: false,
                  nameText:
                    '< No participants available in - ' +
                    $scope.searchChapter.text +
                    ' >',
                });
              }
            });
          }
          break;
        case 'Phone':
          if ($scope.searchPhone) {
            // Search for participants via email.
            $scope.foundParticipants = [];
            searchPromise.push(
              commonServices.queryUserPhone($scope.searchPhone)
            );
            $q.all(searchPromise).then(function(data) {
              if (data[0]) {
                _.each(data[0], function(user, key) {
                  user.nameText =
                    user.name.first + ' ' + user.name.last + ' - ' + user.email;
                  user.key = key;
                  user.guest = false;
                  $scope.foundParticipants.push(user);
                });
              }

              // Show user if no participants are available.
              if (_.isEmpty($scope.foundParticipants)) {
                $scope.foundParticipants.push({
                  key: false,
                  nameText:
                    '< No participants available in - ' +
                    $scope.searchChapter.text +
                    ' >',
                });
              }
            });
          }
          break;
        case 'Chapter':
          if ($scope.searchChapter) {
            // Search for participants via chapter key.
            $scope.foundParticipants = [];
            searchPromise.push(
              commonServices.queryChapterkey($scope.searchChapter.key)
            );
            $q.all(searchPromise).then(function(data) {
              if (data[0]) {
                _.each(data[0], function(user, key) {
                  user.nameText =
                    user.name.first + ' ' + user.name.last + ' - ' + user.email;
                  user.key = key;
                  user.guest = false;
                  $scope.foundParticipants.push(user);
                });
              }

              // Show user if no participants are available.
              if (_.isEmpty($scope.foundParticipants)) {
                $scope.foundParticipants.push({
                  key: false,
                  nameText:
                    '< No participants available in - ' +
                    $scope.searchChapter.text +
                    ' >',
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
      if ($scope.foundParticipant) {
        // Initialize Variables
        var selectedAlready = false;
        var duplicates = [];

        // Check to see if users have already been added.
        _.each($scope.foundParticipant, function(addUser) {
          if (addUser.guest) {
            $scope.foundParticipants = [];
            $scope.foundParticipant = [];
            $scope.selectedParticipants.push(addUser);
            return;
          } else {
            _.each($scope.selectedParticipants, function(currentUser) {
              if (currentUser.key === addUser.key) {
                selectedAlready = true;
                return;
              }
            });

            // Add participant if they havent already, duplicates get added to dup list.
            if (selectedAlready) {
              duplicates.push(addUser.nameText);
              selectedAlready = false;
            } else {
              addUser.guest = false;
              $scope.selectedParticipants.push(addUser);
            }
          }
        });

        // Show users were duplicates in add request.
        if (!_.isEmpty(duplicates)) {
          var errorString = '';
          _.each(duplicates, function(dups) {
            errorString += '&nbsp;&nbsp;' + dups + '<br>';
          });
          errorString +=
            '<br>have already been added to the selected participants list';
          swal('Duplicates Found', errorString, 'error');
        }
      }
    };

    $scope.removeSelectedParticipants = function() {
      if ($scope.removeParticipants) {
        // Filter out participants that need to be removed.
        _.each($scope.removeParticipants, function(removeUser) {
          $scope.selectedParticipants = _.filter(
            $scope.selectedParticipants,
            function(currentUser) {
              return currentUser.key !== removeUser.key;
            }
          );
        });
        $scope.removeParticipants = false;
      }
    };

    // Clear fields.
    $scope.clearSearch = function() {
      $scope.searchFirst = undefined;
      $scope.searchLast = undefined;
      $scope.searchEmail = undefined;
      $scope.searchPhone = undefined;
      $scope.foundParticipants = [];
      $scope.foundParticipant = false;
      $scope.search_form.$setValidity();
      $scope.search_form.$setPristine();
      $scope.search_form.$setUntouched();
    };

    // Clear sub form guest.
    $scope.clearGuestForm = function() {
      $scope.guestFirst = undefined;
      $scope.guestLast = undefined;
      $scope.guestEmail = undefined;
      $scope.guestPhone = undefined;
      $scope.search_form.$setValidity();
      $scope.search_form.$setPristine();
      $scope.search_form.$setUntouched();
      $scope.foundParticipants = [];
    };

    // close Modal.
    $scope.cancel = function() {
      var getEventData = commonServices.getData('events/' + event.key);
      $q.all([getEventData]).then(function(data) {
        // Get must recent data for event.
        data[0].key = event.key;
        event = data[0];

        // Move user back to manage event for now (change this when we reuse module)
        $uibModalInstance.dismiss('cancel');
        $uibModal.open({
          templateUrl: '/parts/manageParticipants.html',
          controller: 'ManageParticipantsCtrl',
          resolve: {
            event: function() {
              return event;
            },
            step: function() {
              return step;
            },
          },
        });
      });
    };
  });
