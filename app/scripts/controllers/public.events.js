/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of management console - events
 */
angular
  .module('ohanaApp')
  .controller('PublicEventsCtrl', function(
    $q,
    commonServices,
    $scope,
    $uibModal,
    Api,
    userService,
    $filter,
    $rootScope
  ) {
    'use strict';
    $scope.newQuery = {};
    $scope.userService = userService;
    // $scope.volunteerIsDisabled = false;
    $scope.allVolunteerIsDisableds = [];
    $scope.allParticipantIsDisableds = [];
    $scope.selected = null;

    var loadAll = function() {
      var getEvents = commonServices.getPublicEvents();
      // allEvents = [];
      $q.all([getEvents]).then(function(data) {
        console.log(data);
        if (data[0]) {
          // _.each(data[0], function(event) {
          //     allEvents.push(event);
          // });
          var count = 0;
          _.each(data[0], function(val, idx) {
            $scope.allVolunteerIsDisableds.push({
              key: idx,
              isDisabled: false,
            });
            $scope.allParticipantIsDisableds.push({
              key: idx,
              isDisabled: false,
            });
            $scope.checkAllVolunteerIsDisableds(idx, count);
            $scope.checkAllParticipantIsDisableds(idx, count);
            count++;
          });
          $scope.eventList = data[0];
          $scope.eventList2 = angular.copy($scope.eventList);
        } else {
          console.log('Failed to get Events...');
        }
      });
    };

    loadAll();

    $scope.checkAllVolunteerIsDisableds = function(key, idx) {
      if (!$scope.userService.getUserData()['email']) return;
      commonServices
        .getUserByEmailAtPath(
          $scope.userService.getUserData()['email'],
          '/events/' + key + '/volunteers'
        )
        .then(function(vol) {
          if (vol) {
            $scope.allVolunteerIsDisableds.some(function(val, i) {
              if (val['key'] == key) {
                $scope.allVolunteerIsDisableds[idx]['isDisabled'] = true;
                $scope.$apply();
                return true;
              }
            });
          }
        });
    };

    $scope.checkAllParticipantIsDisableds = function(key, idx) {
      if (!$scope.userService.getUserData()['email']) return;
      commonServices
        .getUserByEmailAtPath(
          $scope.userService.getUserData()['email'],
          '/events/' + key + '/participants'
        )
        .then(function(vol) {
          if (vol) {
            $scope.allParticipantIsDisableds.some(function(val, i) {
              if (val['key'] == key) {
                $scope.allParticipantIsDisableds[idx]['isDisabled'] = true;
                $scope.$apply();
                return true;
              }
            });
          }
        });
    };

    $scope.popup1 = {
      opened: false,
    };
    $scope.popup2 = {
      opened: false,
    };

    $scope.$watch('dt', function(val) {
      $scope.filtersRunner();
    });

    $scope.$watch('dt2', function(val) {
      $scope.filtersRunner();
    });

    $scope.filtersRunner = function() {
      $scope.search();
      if ($scope.dt) $scope.dateMath($scope.dt.getTime(), 'lower');
      if ($scope.dt2) $scope.dateMath($scope.dt2.getTime(), 'upper');
    };

    $scope.dateMath = function(date, bound) {
      switch (bound) {
        case 'lower':
          var lower_res = {};
          console.log($scope.eventList);
          Object.keys($scope.eventList).forEach(function(val, idx) {
            var evtObjToSearch = $scope.eventList[val];
            if (date <= evtObjToSearch['startTime'])
              lower_res[val] = $scope.eventList[val];
          });
          $scope.eventList = lower_res;
          break;
        case 'upper':
          var upper_res = {};
          console.log($scope.eventList);
          Object.keys($scope.eventList).forEach(function(val, idx) {
            var evtObjToSearch = $scope.eventList[val];
            if (evtObjToSearch['startTime'] <= date)
              upper_res[val] = $scope.eventList[val];
          });
          $scope.eventList = upper_res;
          break;
      }
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1,
    };
    $scope.open = function() {
      $scope.popup1.opened = true;
    };
    $scope.open2 = function() {
      $scope.popup2.opened = true;
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.search = function() {
      if (!$scope.newQuery.search) {
        $scope.eventList = $scope.eventList2;
        return;
      }

      var res = {};
      Object.keys($scope.eventList2).forEach(function(val, idx) {
        var evtObjToSearch = $scope.eventList2[val];
        for (var key in evtObjToSearch) {
          if (evtObjToSearch.hasOwnProperty(key)) {
            //string search match
            if (
              typeof evtObjToSearch[key] === 'string' &&
              evtObjToSearch[key].toLowerCase().includes($scope.newQuery.search)
            ) {
              res[val] = $scope.eventList2[val];
            } else if (
              typeof evtObjToSearch[key] === 'number' &&
              evtObjToSearch[key]
                .toString()
                .toLowerCase()
                .includes($scope.newQuery.search)
            ) {
              //match numbers
              res[val] = $scope.eventList2[val];
            }
          }
        }
      });
      $scope.eventList = res;
    };

    $scope.showDescription = function(index) {
      $scope.selected = $scope.eventList[index];
      var modalInstance = $uibModal.open({
        scope: $scope,
        templateUrl: '/parts/public.events.description.html',
        controller: 'PublicEventsDescriptionCtrl',
      });
    };

    // $scope.showDescription = function(index) {
    //   $scope.selected = $scope.eventList[index];
    //   console.log('Index is: ', index);
    //   var getEvents = commonServices.getEvent(index);

    //   $q.all([getEvents]).then(function(data) {
    //     if (data[0]) {
    //       _.each(data[0], function(event) {
    //         if ($scope.selected.email === event.email) {
    //           console.log('Event: ' + event.name);
    //           $scope.selected = event;
    //         }
    //       });
    //     } else {
    //       $scope.selected = null;
    //     }
    //   });
    //   if ($scope.selected != null) {
    //     var modalInstance = $uibModal.open({
    //       scope: $scope,
    //       templateUrl: '/parts/public.events.description.html',
    //       controller: 'PublicEventsDescriptionCtrl',
    //     });
    //   }
    // };

    $scope.addVolunteer = function(key, idx) {
      //email = email.trim();
      if ($scope.allVolunteerIsDisableds[idx]['isDisabled']) {
        var email = $scope.userService.getUserData()['email'];
        //check to see if the volunteer is a user at all.
        commonServices.getUserByEmail(email).then(
          function(data) {
            if (data) {
              var temp_key;
              _.each(data, function(val, idx) {
                temp_key = idx;
                data[idx]['key'] = idx;
              });

              commonServices
                .getData('userRoles/' + temp_key)
                .then(function(role) {
                  if (role['role'] !== 'Participant') {
                    //check to see if the volunteer exists per this event
                    commonServices
                      .getUserByEmailAtPath(
                        email,
                        '/events/' + key + '/volunteers'
                      )
                      .then(function(vol) {
                        console.log(vol);
                        if (vol) {
                          var entity_key = Object.keys(vol)[0];
                          //additional check for witness waiver(at account level)
                          // alert("line 182" + JSON.stringify(vol[entity_key]))
                          commonServices.removeData(
                            '/events/' + key + '/volunteers/',
                            entity_key
                          );
                          $scope.allVolunteerIsDisableds[idx][
                            'isDisabled'
                          ] = false;
                          $scope.$apply();
                        } else {
                          swal(
                            'Oops...',
                            'That volunteer has already been added',
                            'error'
                          );
                        }
                      });
                  } else {
                    swal(
                      'Oops...',
                      'User not authorized to be added as a volunteer.',
                      'error'
                    );
                  }
                });
            } else {
              swal('Oops...', "That user doesn't exists", 'error');
            }
          },
          function(err) {
            swal('Oops...', 'Unknown Error', 'error');
          }
        );
      } else {
        var email = $scope.userService.getUserData()['email'];
        //check to see if the volunteer is a user at all.
        commonServices.getUserByEmail(email).then(
          function(data) {
            if (data) {
              var temp_key;
              _.each(data, function(val, idx) {
                temp_key = idx;
                data[idx]['key'] = idx;
              });

              commonServices
                .getData('userRoles/' + temp_key)
                .then(function(role) {
                  if (role['role'] !== 'Participant') {
                    //check to see if the volunteer exists per this event
                    commonServices
                      .getUserByEmailAtPath(
                        email,
                        '/events/' + key + '/volunteers'
                      )
                      .then(function(vol) {
                        console.log(vol);
                        if (!vol) {
                          //check if the prospective volunteer is already signed up as a participant
                          commonServices
                            .getUserByEmailAtPath(
                              email,
                              '/events/' + key + '/participants'
                            )
                            .then(function(part) {
                              if (part) {
                                //if they are a participant then remove them from the participant table
                                var entity_key = Object.keys(part)[0];
                                commonServices.removeData(
                                  '/events/' +
                                    key +
                                    '/participants/' +
                                    entity_key
                                );
                                $scope.allParticipantIsDisableds[idx][
                                  'isDisabled'
                                ] = false;
                                $scope.$apply();
                              }
                              var areWaiversUnsignedObj = $scope.areWaiversUnsigned(
                                data[temp_key],
                                key
                              );
                              if (areWaiversUnsignedObj['witness']) {
                                //put up fill out form for signing the witness form
                                var modalInstance = $uibModal.open({
                                  templateUrl:
                                    '/parts/sign_witness_waiver.html',
                                  controller: 'SignWitnessWaiverCtrl',
                                  resolve: {
                                    // selectedUID: function() {
                                    //     return self.parentElement.parentElement.children[0].firstChild.value;
                                    // }
                                  },
                                });
                              }
                              //additional check for witness waiver(at account level)
                              //alert("line 247" + JSON.stringify(data[temp_key]))
                              commonServices.pushData(
                                '/events/' + key + '/volunteers',
                                data[temp_key]
                              );
                              $scope.allVolunteerIsDisableds[idx][
                                'isDisabled'
                              ] = true;
                              $scope.$apply();
                            });
                        } else {
                          swal(
                            'Oops...',
                            'That volunteer has already been added',
                            'error'
                          );
                        }
                      });
                  } else {
                    swal(
                      'Oops...',
                      'User not authorized to be added as a volunteer.',
                      'error'
                    );
                  }
                });
            } else {
              swal('Oops...', "That user doesn't exists", 'error');
            }
          },
          function(err) {
            swal('Oops...', 'Unknown Error', 'error');
          }
        );
      }
    };

    $scope.addParticipant = function(key, idx) {
      //email = email.trim();
      if ($scope.allParticipantIsDisableds[idx]['isDisabled']) {
        var email = $scope.userService.getUserData()['email'];
        //check to see if the volunteer is a user at all.
        commonServices.getUserByEmail(email).then(
          function(data) {
            if (data) {
              var temp_key;
              _.each(data, function(val, idx) {
                temp_key = idx;
                data[idx]['key'] = idx;
              });

              commonServices
                .getData('userRoles/' + temp_key)
                .then(function(role) {
                  // if (role["role"] !== "Participant") {
                  //check to see if the volunteer exists per this event
                  commonServices
                    .getUserByEmailAtPath(
                      email,
                      '/events/' + key + '/participants'
                    )
                    .then(function(vol) {
                      if (vol) {
                        var entity_key = Object.keys(vol)[0];
                        //additional check for witness waiver(at account level)
                        commonServices.removeData(
                          '/events/' + key + '/participants/' + entity_key
                        );
                        $scope.allParticipantIsDisableds[idx][
                          'isDisabled'
                        ] = false;
                        $scope.$apply();
                      } else {
                        swal(
                          'Oops...',
                          'That participant has already been deleted',
                          'error'
                        );
                      }
                    });
                });
            } else {
              swal('Oops...', "That user doesn't exists", 'error');
            }
          },
          function(err) {
            swal('Oops...', 'Unknown Error', 'error');
          }
        );
      } else {
        var email = $scope.userService.getUserData()['email'];
        //check to see if the volunteer is a user at all.
        commonServices.getUserByEmail(email).then(
          function(data) {
            if (data) {
              var temp_key;
              _.each(data, function(val, idx) {
                temp_key = idx;
                data[idx]['key'] = idx;
              });

              commonServices
                .getData('userRoles/' + temp_key)
                .then(function(role) {
                  // if (role["role"] !== "Participant") {
                  //check to see if the volunteer exists per this event
                  commonServices
                    .getUserByEmailAtPath(
                      email,
                      '/events/' + key + '/participants'
                    )
                    .then(function(part) {
                      console.log(part);
                      if (!part) {
                        //check if the prospective participant is already signed up as a volunteer
                        commonServices
                          .getUserByEmailAtPath(
                            email,
                            '/events/' + key + '/volunteers'
                          )
                          .then(function(vol) {
                            if (vol) {
                              //if they are a volunteer then remove them from the volunteer table
                              var entity_key = Object.keys(vol)[0];
                              commonServices.removeData(
                                '/events/' + key + '/volunteers/' + entity_key
                              );
                              $scope.allVolunteerIsDisableds[idx][
                                'isDisabled'
                              ] = false;
                              $scope.$apply();
                            }

                            var areWaiversUnsignedObj = $scope.areWaiversUnsigned(
                              data[temp_key],
                              key
                            );
                            if (areWaiversUnsignedObj['witness']) {
                              //put up fill out form for signing the witness form
                              var modalInstance = $uibModal.open({
                                templateUrl: '/parts/sign_witness_waiver.html',
                                controller: 'SignWitnessWaiverCtrl',
                                resolve: {
                                  // selectedUID: function() {
                                  //     return self.parentElement.parentElement.children[0].firstChild.value;
                                  // }
                                },
                              });
                            }
                            if (areWaiversUnsignedObj['event']) {
                              //filling out
                              //put up fill out form for signing the witness form
                              var modalInstance = $uibModal.open({
                                templateUrl: '/parts/sign_event_waiver.html',
                                controller: 'SignEventWaiver',
                                resolve: {
                                  eventKey: function() {
                                    return key;
                                  },
                                },
                              });
                            }
                            commonServices.pushData(
                              '/events/' + key + '/participants',
                              data[temp_key]
                            );
                            $scope.allParticipantIsDisableds[idx][
                              'isDisabled'
                            ] = true;
                            $scope.$apply();
                          });
                      } else {
                        swal(
                          'Oops...',
                          'That participant has already been added',
                          'error'
                        );
                      }
                    });
                });
            } else {
              swal('Oops...', "That user doesn't exists", 'error');
            }
          },
          function(err) {
            swal('Oops...', 'Unknown Error', 'error');
          }
        );
      }
    };

    //might need to move into
    $scope.areWaiversUnsigned = function(person_detail, event_key) {
      var checker_obj = {};
      if (person_detail['witness']) {
        //perform date substraction to see if witness waiver is still valid
        //first time date was saved
        var saved_date = new Date(person_detail['witness']['date_signed']);

        //date range from today's date
        var d1 = new Date(Date.now());
        var d2 = new Date(d1.getFullYear() - 1, d1.getMonth(), d1.getDate());
        if (saved_date < d2) {
          //the witness waiver has expired
          checker_obj['witness'] = true;
        } else {
          //witness waiver hasn't expired
          checker_obj['witness'] = false;
        }
      } else {
        //witness never signed a waiver
        checker_obj['witness'] = true;
      }
      if (
        person_detail['events'] &&
        person_detail['events'].hasOwnProperty(event_key)
      ) {
        //no signing needed
        checker_obj['event'] = false;
      } else {
        //needs signing
        checker_obj['event'] = true;
      }
      return checker_obj;
    };

    /*waiver object:
      waiver{
        date_signed

      }
    */
    // Api.events.query().$promise.then(
    // 	function (response) { // on success
    // 		$scope.eventList = response;
    // 		if (response.length === 0) {
    // 			swal({
    // 				text: "No events exist.",
    // 				type: 'warning',
    // 				timer: 2500
    // 			});
    // 		}
    //
    // 	},
    // 	function (response) { // on error
    // 		swal({
    // 			text: "Connection failed. Could not " + response.config.method + " from " + response.config.url,
    // 			type: 'warning',
    // 			timer: 2500
    // 		});
    // 	});
  });
