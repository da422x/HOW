/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc directive
 * @name ohanaApp.directive:masternavigation
 * @description
 * # masternavigation
 */
angular.module('ohanaApp').directive('masterNavigation', function() {
  'use strict';
  return {
    templateUrl: 'views/masternav.html',
    restrict: 'E',

    controller: function($rootScope, commonServices, $scope, $uibModal) {
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
        $scope.sessionUserRole = false;
        commonServices.signout();
        $scope.toggleMenu();
      };

      // all nav setups
      $scope.leftnav = [
        {
          state: '#/whoweare',
          text: 'WHO WE ARE',
        },
        {
          state: '#/getinvolved',
          text: 'GET INVOLVED',
        },
        {
          state: '#/publicEvents',
          text: 'EVENTS',
        },
      ];

      $scope.rightnav = [
        {
          state: '#/login',
          text: 'LOGIN',
        },
      ];

      $scope.rightnavloggedin = [
        {
          state: '#/manage/dash',
          text: 'MANAGE',
        },
        {},
      ];

      $scope.participantNav = [
        {
          state: '#/manage/chapterchat',
          text: 'Chapter Chat',
        },
        // {
        //     state: "#/manage/events",
        //     text: "Events"
        // },
        {
          state: '#/expense/viewexpense',
          text: 'Expense',
        },
        {
          state: '#/manage/profile',
          text: 'My Profile',
        },
      ];

      $scope.volunteerNav = [
        {
          state: '#/manage/chapterchat',
          text: 'Chapter Chat',
        },
        // {
        //     state: "#/manage/events",
        //     text: "Events"
        // },
        {
          state: '#/expense/viewexpense',
          text: 'Expense',
        },
        {
          state: '#/manage/profile',
          text: 'My Profile',
        },
        // ,{
        //     state: "#/manage/training",
        //     text: "My Training"
        // }
      ];

      $scope.ltmNav = [
        // {
        //     state: "#/dash/broadcasts",
        //     text: "Broadcasts"
        // },
        // {
        //   state: '#/manage/chadmin',
        //   text: 'Chapter Administration',
        // },
        {
          state: '#/manage/chapterchat',
          text: 'Chapter Chat',
        },
        {
          state: '#/manage/events',
          text: 'Events',
        },
        {
          state: '#/expense/viewexpense',
          text: 'Expense',
        },
        // {
        //     state: "#/inventory",
        //     text: "Inventory"
        // },
        {
          state: '#/manage/directory',
          text: 'Member Directory',
        },
        {
          state: '#/manage/profile',
          text: 'My Profile',
        },
        // ,{
        //     state: "#/manage/training",
        //     text: "My Training"
        // }
      ];

      $scope.nationalNav = [
        // {
        //     state: "#/superAdmin",
        //     text: "Administration"
        // },
        // {
        //     state: "#/dash/broadcasts",
        //     text: "Broadcasts"
        // },
        {
          state: '#/manage/chadmin',
          text: 'Chapter Administration',
        },
        {
          state: '#/manage/chapterchat',
          text: 'Chapter Chat',
        },
        // {
        //     state: "donors",
        //     text: "Donor Management"
        // },
        {
          state: '#/manage/events',
          text: 'Events',
        },
        {
          state: '#/expense/viewexpense',
          text: 'Expense',
        },
        // {
        //     state: "#/inventory",
        //     text: "Inventory"
        // },
        {
          state: '#/manage/directory',
          text: 'Member Directory',
        },
        {
          state: '#/manage/profile',
          text: 'My Profile',
        },
        // ,
        // {
        //     state: "#/manage/training",
        //     text: "My Training"
        // }
      ];

      $scope.showDonate = function() {
        window.open(
          'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=5WAD6PF3BUHPE'
        );
      }; // end $scope.showDonate
    },
  };
});
