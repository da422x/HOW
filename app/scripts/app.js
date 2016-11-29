/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc overview
 * @name ohanaApp
 * @description
 * # ohanaApp
 *
 * Main module of the application.
 */
angular.module('ohanaApp', [
		'ngAnimate',
		'ui.bootstrap',
		'ui.router',
		'ui.select',
		'ngCookies',
		'ngMessages',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'summernote',
		'ui.timepicker',
		'LocalStorageModule',
		'ngMap',
		// 'uiGmapgoogle-maps',
		'firebase'
	])
	.config(function ($stateProvider, $urlRouterProvider) {
		'use strict';
		$urlRouterProvider.otherwise('/');
		$stateProvider
			.state('home', {
				url: "/",
				templateUrl: 'views/home.html',
				controller: 'HomeCtrl as home'
			})
			.state('whoweare', {
				url: '/whoweare',
				templateUrl: 'views/whoweare.html',
//				controller: 'WhoweareCtrl as whoweare'
			})
			.state('getinvolved', {
				url: '/getinvolved',
				templateUrl: 'views/getinvolved.html',
				controller: 'GetinvolvedCtrl as getinvolved'
			})
			.state('chapters', {
				url: '/chapters',
				templateUrl: 'views/chapters.html',
				controller: 'ChaptersCtrl as chapters'
			})
			.state('login', {
				url: "/login",
				templateUrl: 'views/login.html',
				controller: 'LoginCtrl as login'
			})
			.state('dash', {
				url: "/manage/dash",
				templateUrl: 'views/manage/dash.html',
				controller: 'DashCtrl as dash'
			})
			.state('dash.upcomingEvents', {
				url: "/dash/upcoming-events",
				templateUrl: 'views/manage/dash.upcomingEvents.html',
				controller: 'DashUpcomingEventsCtrl as dashUpcomingEvents'
			})
			.state('dash.broadcasts', {
				url: "/dash/broadcasts",
				templateUrl: 'views/manage/dash.broadcasts.html',
				controller: 'DashBroadcastCtrl as dashBroadcasts'
			})
			.state('events', {
				url: "/manage/events",
				templateUrl: 'views/manage/events.html',
				controller: 'EventsCtrl as events'
			})
			.state('publicevents', {
				url: "/events",
				templateUrl: 'views/publicevents.html',
				controller: 'PubliceventsCtrl as publicEvents'
			})
			.state('events.eventDetail', {
				url: "/details",
				templateUrl: 'views/manage/event.details.html',
				controller: 'DetailsCtrl as eventDetail'
			})
			.state('events.eventDetail.description', {
				url: "/description",
				templateUrl: 'views/manage/event.details.description.html',
				controller: 'EventdetaildescriptionCtrl as eventDescription',
//				params: {
//					event_id: id
//				},
			})
			.state('events.eventDetail.volunteers', {
				url: "/volunteers",
				templateUrl: 'views/manage/event.details.volunteers.html',
				controller: 'EventdetailvolunteersCtrl as eventVolunteers'
			})
			.state('events.eventDetail.participants', {
				url: "/participants",
				templateUrl: 'views/manage/event.details.participants.html',
				controller: 'EventdetailparticipantsCtrl as eventParticipants'
			})
			.state('events.eventDetail.equipment', {
				url: "/inventory",
				templateUrl: 'views/manage/event.details.equipment.html',
				controller: 'EventdetailequipmentCtrl as eventEquipment'
			})
			.state('events.eventDetail.notifications', {
				url: "/notifications",
				templateUrl: 'views/manage/event.details.notifications.html',
				controller: 'EventdetailnotificationCtrl as eventNotifications'
			})
			.state('broadcasts', {
				url: "/manage/broadcasts",
				templateUrl: 'views/manage/broadcasts.html',
				controller: 'BroadcastsCtrl as broadcasts'
			})
			.state('inventory', {
				url: '/manage/inventory',
				templateUrl: 'views/manage/inventory.html',
				controller: 'InventoryCtrl as inventory'
			})
			.state('training', {
				url: '/manage/training',
				templateUrl: 'views/manage/training.html',
//				controller: 'TrainingCtrl as training'
			})
			.state('hours', {
				url: '/manage/hours',
				templateUrl: 'views/manage/hours.html',
//				controller: 'HoursCtrl as hours'
			})
			.state('directory', {
				url: '/manage/directory',
				templateUrl: 'views/manage/directory.html',
				controller: 'DirectoryCtrl as directory'
			})
			.state('profile', {
				url: '/manage/profile',
				templateUrl: 'views/manage/profile.html',
				controller: 'ProfileCtrl as profile'
			})
			.state('chAdmin', {
				url: '/manage/chAdmin',
				templateUrl: 'views/manage/chadmin.html',
//				controller: 'ChadminCtrl as chadmin'
			})
			.state('regAdmin', {
				url: '/manage/regAdmin',
				templateUrl: 'views/manage/regadmin.html',
//				controller: 'RegadminCtrl as regadmin'
			})
			.state('superAdmin', {
				url: 'superAdmin',
				templateUrl: 'views/manage/superadmin.html',
//				controller: 'SuperadminCtrl as superadmin'
			})
			.state('publicEvents', {
				url: '/publicEvents',
				templateUrl: 'views/public.events.html',
  				controller: 'PublicEventsCtrl',
  				controllerAs: 'public.events'
			})

		;
	}).run(function($q, commonServices, localStorageService, $rootScope, $firebaseAuth){
     var config = {
      apiKey: "AIzaSyB0ush9ktHEJPW1C6TBmc44ANBcusetpEg",
      authDomain: "herosonthewater-55a79.firebaseapp.com",
      databaseURL: "https://herosonthewater-55a79.firebaseio.com",
      storageBucket: "herosonthewater-55a79.appspot.com",
      messagingSenderId: "183234806884"
    };
    
    if (firebase.apps.length === 0) {
      firebase.initializeApp(config);
    }
      
    $rootScope.authObj = $firebaseAuth();

    $rootScope.authObj.$onAuthStateChanged(function(user) {
        if (user) {
	      	var currentUserId = firebase.auth().currentUser.uid;
	      	var currentUserData = commonServices.getData('/userData/' + currentUserId);
	      	var currentUserRole = commonServices.getData('/userRoles/' + currentUserId + '/role/');
	      	$q.all([currentUserData, currentUserRole])
	      		.then(function(data) {
					var userData = data[0];
					var userRole = data[1];
					console.log('Logged in!');
					console.log('UID: ' + currentUserId);
					console.log('Name: ' + userData.name.first);
					console.log('Role: ' + userRole);
					localStorageService.set('sessionUserRole', userRole);
					localStorageService.set('sessionUserData', userData);
					localStorageService.set('sessionState', true);
					$rootScope.$broadcast('changeSessionUserRole', userRole);
					$rootScope.$broadcast('changeSessionState', true);
				});
    	}else{
	        console.log('Logged Out...');
	        localStorageService.set('sessionUserRole', false);
			localStorageService.set('sessionUserData', false);
			localStorageService.set('sessionState', false);
        }
    });
  });



