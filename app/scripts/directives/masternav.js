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

			controller: function ($state, $rootScope, commonServices, $scope, $uibModal, localStorageService) {
				$scope.sessionState = localStorageService.get('sessionState');
				$scope.sessionUserRole = localStorageService.get('sessionUserRole');
				console.log($scope.sessionUserRole);
				$scope.$on('changeSessionState', function (event, arg) {
					$scope.sessionState = arg;
				});
				$scope.$on('changeSessionUserRole', function (event, arg) {
					$scope.sessionUserRole = arg;
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
					localStorageService.set('sessionState', false);
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

				$scope.rightnav = [
					{ state: "login", text: "LOGIN" },
				];

				$scope.rightnavloggedin = [
					{ state: "dash", text: "MANAGE" },
					{}
				];

				$scope.participantNav = [
					{ state: "events", text: "Events" },
					{ state: "profile", text: "My Profile"}
				];

				$scope.volunteerNav = [
					{ state: "events", text: "Events" }, 
					{ state: "training", text: "My Training" },
					{ state: "profile", text: "My Profile"}
				];

				$scope.ltmNav = [
					{ state: "events", text: "Events" }, 
					{ state: "broadcasts", text: "Broadcasts" }, 
					{ state: "inventory", text: "Inventory" }, 
					{ state: "training", text: "My Training" },
					{ state: "profile", text: "My Profile"}
				];

				$scope.nationalNav = [
					{ state: "events", text: "Events" }, 
					{ state: "broadcasts", text: "Broadcasts" }, 
					{ state: "inventory", text: "Inventory" }, 
					{ state: "training", text: "My Training" },
					{ state: "directory", text: "Member Directory" },
					{ state: "donors", text: "Donor Management" }, 
					{ state: "superAdmin", text: "Administration" },
					{ state: "profile", text: "My Profile"}
				];

				$scope.adminNav = [
					{ state: "events", text: "Events" }, 
					{ state: "broadcasts", text: "Broadcasts" }, 
					{ state: "inventory", text: "Inventory" }, 
					{ state: "training", text: "My Training" },
					{ state: "directory", text: "Member Directory" },
					{ state: "donors", text: "Donor Management" }, 
					{ state: "superAdmin", text: "Administration" },
					{ state: "profile", text: "My Profile"}
				];

				$scope.showDonate = function () {
					$uibModal.open({
						templateUrl: '/parts/donors.html',
						controller: 'DonorsCtrl'
					});

				}; // end $scope.showDonate

			}

		};
	});
