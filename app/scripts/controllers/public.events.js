/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of management console - events
 */
angular.module('ohanaApp')
    .controller('PublicEventsCtrl', function($q, commonServices, $scope, $uibModal, Api, selectValues, userService) {
        'use strict';
        $scope.newQuery = {};
        $scope.userService = userService;
        // $scope.volunteerIsDisabled = false;
        $scope.allVolunteerIsDisableds = [];
        $scope.allParticipantIsDisableds = [];



        var loadAll = function() {
            var getEvents = commonServices.getPublicEvents();
            // allEvents = [];
            $q.all([getEvents]).then(function(data) {
                if (data[0]) {
                    // _.each(data[0], function(event) {
                    //     allEvents.push(event);
                    // });
                    var count = 0;
                    _.each(data[0], function(val, idx) {
                        $scope.allVolunteerIsDisableds.push({
                            key: idx,
                            isDisabled: false
                        });
                        $scope.allParticipantIsDisableds.push({
                            key: idx,
                            isDisabled: false
                        });
                        $scope.checkAllVolunteerIsDisableds(idx, count);
                        $scope.checkAllParticipantIsDisableds(idx, count);
                        count++;
                    });
                    console.log(data[0])
                    $scope.eventList = data[0];
                } else {
                    console.log('Failed to get Events...');
                }
            });
        };

        loadAll();

        $scope.checkAllVolunteerIsDisableds = function(key, idx) {

            commonServices.getUserByEmailAtPath($scope.userService.getUserData()["email"], '/events/' + key + '/volunteers')
                .then(function(vol) {
                    if (vol) {
                        $scope.allVolunteerIsDisableds.some(function(val, i) {

                            if (val["key"] == key) {
                                $scope.allVolunteerIsDisableds[idx]["isDisabled"] = true;
                                $scope.$apply();
                                return true;
                            }
                        })
                    }
                });
        }

        $scope.checkAllParticipantIsDisableds = function(key, idx) {

            commonServices.getUserByEmailAtPath($scope.userService.getUserData()["email"], '/events/' + key + '/participants')
                .then(function(vol) {
                    if (vol) {
                        $scope.allParticipantIsDisableds.some(function(val, i) {
                            if (val["key"] == key) {
                                $scope.allParticipantIsDisableds[idx]["isDisabled"] = true;
                                $scope.$apply();
                                return true;
                            }
                        })
                    }
                });
        }

        $scope.search = function() {
            if ($scope.eventList.length > 0) {
                $scope.empty = false;

                if ($scope.newQuery.search == '*' || !($scope.newQuery.search)) {
                    loadAll();
                } else {
                    var eventsFound = [];
                    _.each($scope.eventList, function(event) {
                        _.each(event, function(attribute) {
                            if (angular.isString(attribute) && angular.isString($scope.newQuery.search)) {
                                if (_.includes(attribute.toLowerCase(), $scope.newQuery.search.toLowerCase())) {
                                    eventsFound.push(event);
                                    return false;
                                }
                            } else if (_.includes(attribute, $scope.newQuery.search)) {
                                eventsFound.push(event);
                                return false;
                            }
                        });
                    });
                    if (eventsFound.length == 0) {
                        console.log('no results');
                        $scope.empty = true;
                        $scope.noEventsFound = "No results for " + $scope.newQuery.search + " found.";
                    }
                    $scope.eventList = eventsFound;
                }
            }

        };


        $scope.showDescription = function(index) {
            $scope.currentEvent = $scope.eventList[index];
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/parts/public.events.description.html',
                controller: 'PublicEventsDescriptionCtrl'
            });

        };

        $scope.showDescription = function(index) {
            $scope.selected = $scope.eventList[index];
            console.log('Index is: ' + index);
            var getEvents = commonServices.getEvent($scope.selected);

            $q.all([getEvents]).then(function(data) {
                if (data[0]) {
                    _.each(data[0], function(event) {
                        if ($scope.selected.email === event.email) {
                            console.log('Event: ' + event.name);
                            $scope.selected = event;
                        }
                    });
                } else {
                    $scope.selected = null;
                }

            });
            if ($scope.selected != null) {
                var modalInstance = $uibModal.open({
                    scope: $scope,
                    templateUrl: '/parts/public.events.description.html',
                    controller: 'PublicEventsDescriptionCtrl'
                });

            }
        };

        $scope.addVolunteer = function(key, idx) {
            //email = email.trim();
            if ($scope.allVolunteerIsDisableds[idx]['isDisabled']) {
                var email = $scope.userService.getUserData()["email"];
                //check to see if the volunteer is a user at all. 
                commonServices.getUserByEmail(email)
                    .then(function(data) {
                        if (data) {
                            var temp_key;
                            _.each(data, function(val, idx) {
                                temp_key = idx;
                                data[idx]["key"] = idx;
                            });

                            commonServices.getData('userRoles/' + temp_key)
                                .then(function(role) {
                                    if (role["role"] !== "Participant") {
                                        //check to see if the volunteer exists per this event
                                        commonServices.getUserByEmailAtPath(email, '/events/' + key + '/volunteers')
                                            .then(function(vol) {
                                                console.log(vol);
                                                if (vol) {
                                                    var entity_key = Object.keys(vol)[0];
                                                    commonServices.removeData('/events/' + key + '/volunteers/', entity_key);
                                                    $scope.allVolunteerIsDisableds[idx]['isDisabled'] = false;
                                                    $scope.$apply();
                                                } else {
                                                    swal(
                                                        'Oops...',
                                                        "That volunteer has already been added",
                                                        'error'
                                                    );
                                                }

                                            })
                                    } else {
                                        swal(
                                            'Oops...',
                                            "User not authorized to be added as a volunteer.",
                                            'error'
                                        );
                                    }

                                })

                        } else {
                            swal(
                                'Oops...',
                                "That user doesn\'t exists",
                                'error'
                            );
                        }

                    }, function(err) {
                        swal(
                            'Oops...',
                            "Unknown Error",
                            'error'
                        );
                    });
            } else {
                var email = $scope.userService.getUserData()["email"];
                //check to see if the volunteer is a user at all. 
                commonServices.getUserByEmail(email)
                    .then(function(data) {
                        if (data) {
                            var temp_key;
                            _.each(data, function(val, idx) {
                                temp_key = idx;
                                data[idx]["key"] = idx;
                            });

                            commonServices.getData('userRoles/' + temp_key)
                                .then(function(role) {
                                    if (role["role"] !== "Participant") {
                                        //check to see if the volunteer exists per this event
                                        commonServices.getUserByEmailAtPath(email, '/events/' + key + '/volunteers')
                                            .then(function(vol) {
                                                console.log(vol);
                                                if (!vol) {
                                                    commonServices.pushData('/events/' + key + '/volunteers', data[temp_key]);
                                                    $scope.allVolunteerIsDisableds[idx]['isDisabled'] = true;
                                                    $scope.$apply();
                                                } else {
                                                    swal(
                                                        'Oops...',
                                                        "That volunteer has already been added",
                                                        'error'
                                                    );
                                                }

                                            })
                                    } else {
                                        swal(
                                            'Oops...',
                                            "User not authorized to be added as a volunteer.",
                                            'error'
                                        );
                                    }

                                })

                        } else {
                            swal(
                                'Oops...',
                                "That user doesn\'t exists",
                                'error'
                            );
                        }

                    }, function(err) {
                        swal(
                            'Oops...',
                            "Unknown Error",
                            'error'
                        );
                    });
            }


        }

        $scope.addParticipant = function(key, idx) {
                //email = email.trim();
                if ($scope.allParticipantIsDisableds[idx]['isDisabled']) {
                    var email = $scope.userService.getUserData()["email"];
                    //check to see if the volunteer is a user at all. 
                    commonServices.getUserByEmail(email)
                        .then(function(data) {
                            if (data) {
                                var temp_key;
                                _.each(data, function(val, idx) {
                                    temp_key = idx;
                                    data[idx]["key"] = idx;
                                });

                                commonServices.getData('userRoles/' + temp_key)
                                    .then(function(role) {
                                        // if (role["role"] !== "Participant") {
                                        //check to see if the volunteer exists per this event
                                        commonServices.getUserByEmailAtPath(email, '/events/' + key + '/participants')
                                            .then(function(vol) {
                                                if (vol) {
                                                    var entity_key = Object.keys(vol)[0];
                                                    commonServices.removeData('/events/' + key + '/participants/' + entity_key);
                                                    $scope.allParticipantIsDisableds[idx]['isDisabled'] = false;
                                                    $scope.$apply();
                                                } else {
                                                    swal(
                                                        'Oops...',
                                                        "That participant has already been deleted",
                                                        'error'
                                                    );
                                                }

                                            })

                                    })

                            } else {
                                swal(
                                    'Oops...',
                                    "That user doesn\'t exists",
                                    'error'
                                );
                            }

                        }, function(err) {
                            swal(
                                'Oops...',
                                "Unknown Error",
                                'error'
                            );
                        });
                } else {
                    var email = $scope.userService.getUserData()["email"];
                    //check to see if the volunteer is a user at all. 
                    commonServices.getUserByEmail(email)
                        .then(function(data) {
                            if (data) {
                                var temp_key;
                                _.each(data, function(val, idx) {
                                    temp_key = idx;
                                    data[idx]["key"] = idx;
                                });

                                commonServices.getData('userRoles/' + temp_key)
                                    .then(function(role) {
                                        // if (role["role"] !== "Participant") {
                                        //check to see if the volunteer exists per this event
                                        commonServices.getUserByEmailAtPath(email, '/events/' + key + '/participants')
                                            .then(function(vol) {
                                                console.log(vol);
                                                if (!vol) {
                                                    commonServices.pushData('/events/' + key + '/participants', data[temp_key]);
                                                    $scope.allParticipantIsDisableds[idx]['isDisabled'] = true;
                                                    $scope.$apply();
                                                } else {
                                                    swal(
                                                        'Oops...',
                                                        "That participant has already been added",
                                                        'error'
                                                    );
                                                }

                                            })

                                    })

                            } else {
                                swal(
                                    'Oops...',
                                    "That user doesn\'t exists",
                                    'error'
                                );
                            }

                        }, function(err) {
                            swal(
                                'Oops...',
                                "Unknown Error",
                                'error'
                            );
                        });
                }

            }
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
