/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc directive
 * @name ohanaApp.directive:masternavigation
 * @description
 * # masternavigation
 */
angular.module('ohanaApp')
	.directive('masterNavigation', function () {
		'use strict';
		return {
			templateUrl: 'views/masternav.html',
			restrict: 'E',

			controller: function (commonServices, $scope, $uibModal, localStorageService) {
				$scope.sessionState = localStorageService.get('sessionState');
				$scope.$on('changeSessionState', function (event, arg) {
					$scope.sessionState = arg;
				});


				// toggle mobile menu
				$scope.menuActive = false;
				$scope.toggleMenu = function () {
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
				$scope.dismissMenu = function () {
					$scope.menuActive = false;
					$('.hamburger--slider').removeClass('is-active');
					$('.mobilenavtoggle button').css('position', 'absolute');
					$('.mobilenavtoggle button').css('margin-right', '0px');
					$scope.menuActive = false;
				};
				
				// logout function
				$scope.logout = function () {
					$scope.sessionState = false;
//					$rootScope.$broadcast('changeSessionState', 'false');
					// localStorageService.set('sessionState', false);
					commonServices.signout();
				};
				
				// all nav setups
				$scope.leftnav = [{
					state: "whoweare",
					text: "WHO WE ARE"
				}, {
					state: "getinvolved",
					text: "GET INVOLVED"
				}, {
					state: "publicEvents",
					text: "EVENTS"
				}];

				$scope.rightnav = [{
					state: "login",
					text: "LOGIN"
				}];

				$scope.rightnavloggedin = [{
					state: "dash",
					text: "MANAGE"
				}, {
				}];

				$scope.volunteerNavs = [{
					state: "events",
					text: "My Opportunities"
				}, {
					state: "hours",
					text: "My Hours"
				}, {
					state: "training",
					text: "My Training"
				}];

				$scope.eventMngrNavs = [{
					state: "events",
					text: "Events"
				}, {
					state: "broadcasts",
					text: "Broadcasts"
				}, {
					state: "inventory",
					text: "Inventory"
				}, {
					state: "training",
					text: "My Training"
				}];

				$scope.chapterMngrNavs = [{
					state: "dash.upcomingEvents",
					text: "Dashboard"
				},
				{
					state: "events",
					text: "Events"
				}, {
					state: "broadcasts",
					text: "Broadcasts"
				}, {
					state: "inventory",
					text: "Inventory"
				}, {
					state: "training",
					text: "My Training"
				}, {
					state: "directory",
					text: "Member Directory"
				}, {
					state: "chAdmin",
					text: "Chapter Administration"
				}];

				$scope.regionMngrNavs = [{
					state: "events",
					text: "Events"
				}, {
					state: "broadcasts",
					text: "Broadcasts"
				}, {
					state: "inventory",
					text: "Inventory"
				}, {
					state: "training",
					text: "My Training"
				}, {
					state: "directory",
					text: "Member Directory"
				}, {
					state: "regAdmin",
					text: "Region Administration"
				}];

				$scope.adminNavs = [{

					state: "events",
					text: "Events"
				}, {
					state: "broadcasts",
					text: "Broadcasts"
				}, {
					state: "inventory",
					text: "Inventory"
				}, {
					state: "training",
					text: "My Training"
				}, {
					state: "directory",
					text: "Member Directory"
				}, {
					state: "donors",
					text: "Donor Management"
				}, {
					state: "superAdmin",
					text: "Administration"
				}];

				$scope.showDonate = function () {
					$uibModal.open({
						templateUrl: '/parts/donors.html',
						controller: 'DonorsCtrl'
					});

				}; // end $scope.showDonate

			}

		};
	});
