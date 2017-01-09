/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc directive
 * @name ohanaApp.directive:masternavigation
 * @description
 * # masternavigation
 */
angular.module('ohanaApp')
    .directive('masterNavigation', function() {
        'use strict';
        return {
            templateUrl: 'views/masternav.html',
            restrict: 'E',

            controller: function($state, $rootScope, commonServices, $scope, $uibModal) {
                $scope.sessionState = $rootScope.sessionState;
                $scope.sessionUserRole = $rootScope.userRole;
                $scope.$on('changeSessionState', function(event, arg) {
                    $scope.sessionState = arg;
                });
                $scope.$on('changeSessionUserRole', function(event, arg) {
                    $scope.sessionUserRole = arg;
                });



                // toggle mobile menu
                $scope.menuActive = false;
                $scope.toggleMenu = function() {
                    if ($scope.menuActive === false) {
                        $('.hamburger--slider').addClass('is-active');
                        $('.mobilenavtoggle button').css('position', 'fixed');
                        $('.mobilenavtoggle button').css('margin-right', '8px');
                        $scope.menuActive = true;
                    } else if ($scope.menuActive === true) {
                        $('.hamburger--slider').removeClass('is-active');
                        $('.mobilenavtoggle button').css('position', 'absolute');
                        $('.mobilenavtoggle button').css('margin-right', '0px');
                        $scope.menuActive = false;
                    }
                };

                // close menu on mobile menu select
                $scope.dismissMenu = function() {
                    $scope.menuActive = false;
                    $('.hamburger--slider').removeClass('is-active');
                    $('.mobilenavtoggle button').css('position', 'absolute');
                    $('.mobilenavtoggle button').css('margin-right', '0px');
                    $scope.menuActive = false;
                };

                // logout function
                $scope.logout = function() {
                    $scope.sessionState = false;
                    $rootScope.sessionState = false;
                    commonServices.signout();
                };

                // all nav setups
                $scope.leftnav = [{
                    state: "#/whoweare",
                    text: "WHO WE ARE"
                }, {
                    state: "#/getinvolved",
                    text: "GET INVOLVED"
                }, {
                    state: "#/publicEvents",
                    text: "EVENTS"
                }];

                $scope.rightnav = [{
                    state: "#/login",
                    text: "LOGIN"
                }, ];

                $scope.rightnavloggedin = [{
                    state: "#/manage/dash",
                    text: "MANAGE"
                }, {}];

                $scope.participantNav = [{
                    state: "#/manage/events",
                    text: "Events"
                }, {
                    state: "#/manage/profile",
                    text: "My Profile"
                }, {
                    state: "#/expense/viewexpense",
                    text: "Expense"
                }, {
                    state: "#/manage/chapterchat",
                    text: "Chapter Chat"
                }];

                $scope.volunteerNav = [{
                    state: "#/manage/events",
                    text: "Events"
                }, {
                    state: "#/manage/training",
                    text: "My Training"
                }, {
                    state: "#/manage/profile",
                    text: "My Profile"
                }, {
                    state: "#/expense/viewexpense",
                    text: "Expense"
                }, {
                    state: "#/manage/chapterchat",
                    text: "Chapter Chat"
                }];

                $scope.ltmNav = [{
                    state: "#/manage/events",
                    text: "Events"
                }, {
                    state: "#/dash/broadcasts",
                    text: "Broadcasts"
                }, {
                    state: "#/inventory",
                    text: "Inventory"
                }, {
                    state: "#/manage/training",
                    text: "My Training"
                }, {
                    state: "#/manage/directory",
                    text: "Member Directory"
                }, {
                    state: "#/manage/profile",
                    text: "My Profile"
                }, {
                    state: "#/expense/viewexpense",
                    text: "Expense"
                }, {
                    state: "#/manage/chapterchat",
                    text: "Chapter Chat"
                }];

                $scope.nationalNav = [{
                    state: "#/manage/events",
                    text: "Events"
                }, {
                    state: "#/dash/broadcasts",
                    text: "Broadcasts"
                }, {
                    state: "#/inventory",
                    text: "Inventory"
                }, {
                    state: "#/manage/training",
                    text: "My Training"
                }, {
                    state: "#/manage/directory",
                    text: "Member Directory"
                }, {
                    state: "donors",
                    text: "Donor Management"
                }, {
                    state: "#/superAdmin",
                    text: "Administration"
                }, {
                    state: "#/manage/profile",
                    text: "My Profile"
                }, {
                    state: "#/expense/viewexpense",
                    text: "Expense"
                }, {
                    state: "#/manage/chapterchat",
                    text: "Chapter Chat"
                }];

                $scope.adminNav = [{
                    state: "#/manage/events",
                    text: "Events"
                }, {
                    state: "#/dash/broadcasts",
                    text: "Broadcasts"
                }, {
                    state: "#/inventory",
                    text: "Inventory"
                }, {
                    state: "#/manage/training",
                    text: "My Training"
                }, {
                    state: "#/manage/directory",
                    text: "Member Directory"
                }, {
                    state: "donors",
                    text: "Donor Management"
                }, {
                    state: "#/superAdmin",
                    text: "Administration"
                }, {
                    state: "#/manage/profile",
                    text: "My Profile"
                }, {
                    state: "#/expense/viewexpense",
                    text: "Expense"
                }, {
                    state: "#/manage/chapterchat",
                    text: "Chapter Chat"
                }];

                $scope.showDonate = function() {
                    window.open("https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=5WAD6PF3BUHPE");
                }; // end $scope.showDonate

            }

        };
    });
