/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:NewuserdirectoryformCtrl
 * @description
 * # NewuserdirectoryformCtrl
 * Controller of the ohanaApp
 */
angular.module('ohanaApp')
	.controller('NewUserDirectoryFormCtrl', function ($q, commonServices, $scope, $uibModalInstance, Api, selectValues) {
		'use strict';

		// calendar options
		$scope.popup = {
			opened: false
		};

		$scope.format = 'MM/dd/yyyy';

		$scope.dateOptions = {
			maxDate: new Date(),
			startingDay: 0,
			showWeeks: false
		};

		$scope.chapters = [];

		$scope.regions = [
			{name: "Midwest Chapters"},
			{name: "Northeast Chapters"},
			{name: "Pacific Chapters"},
			{name: "Rocky Mountain Chapters"},
			{name: "Southeast Chapters"},
			{name: "Southwest Region"}
		];

		$scope.states = [
			{id:"AL", name:"Alabama"}, 
			{id:"AK", name:"Alaska"}, 
			{id:"AZ", name:"Arizona"}, 
			{id:"AR", name:"Arkansas"}, 
			{id:"CA", name:"California"}, 
			{id:"CO", name:"Colorado"}, 
			{id:"CT", name:"Connecticut"}, 
			{id:"DE", name:"Delaware"}, 
			{id:"DC", name:"District Of Columbia"}, 
			{id:"FL", name:"Florida"}, 
			{id:"GA", name:"Georgia"}, 
			{id:"HI", name:"Hawaii"}, 
			{id:"ID", name:"Idaho"}, 
			{id:"IL", name:"Illinois"}, 
			{id:"IN", name:"Indiana"}, 
			{id:"IA", name:"Iowa"}, 
			{id:"KS", name:"Kansas"}, 
			{id:"KY", name:"Kentucky"}, 
			{id:"LA", name:"Louisiana"}, 
			{id:"ME", name:"Maine"}, 
			{id:"MD", name:"Maryland"}, 
			{id:"MA", name:"Massachusetts"}, 
			{id:"MI", name:"Michigan"}, 
			{id:"MN", name:"Minnesota"}, 
			{id:"MS", name:"Mississippi"}, 
			{id:"MO", name:"Missouri"}, 
			{id:"MT", name:"Montana"}, 
			{id:"NE", name:"Nebraska"}, 
			{id:"NV", name:"Nevada"}, 
			{id:"NH", name:"New Hampshire"}, 
			{id:"NJ", name:"New Jersey"}, 
			{id:"NM", name:"New Mexico"}, 
			{id:"NY", name:"New York"}, 
			{id:"NC", name:"North Carolina"}, 
			{id:"ND", name:"North Dakota"}, 
			{id:"OH", name:"Ohio"}, 
			{id:"OK", name:"Oklahoma"}, 
			{id:"OR", name:"Oregon"}, 
			{id:"PA", name:"Pennsylvania"}, 
			{id:"RI", name:"Rhode Island"}, 
			{id:"SC", name:"South Carolina"}, 
			{id:"SD", name:"South Dakota"}, 
			{id:"TN", name:"Tennessee"}, 
			{id:"TX", name:"Texas"}, 
			{id:"UT", name:"Utah"}, 
			{id:"VT", name:"Vermont"}, 
			{id:"VA", name:"Virginia"}, 
			{id:"WA", name:"Washington"}, 
			{id:"WV", name:"West Virginia"}, 
			{id:"WI", name:"Wisconsin"}, 
			{id:"WY", name:"Wyoming"}];

		$scope.open = function () {
			$scope.popup.opened = true;
		};
	
		$scope.regionUpdate = function () {
			var regionName = $scope.newUserDirectory.region.name;
			var path = '/Regions/' + regionName + '/';
			var getChapters = commonServices.getData(path);

			$q.all([getChapters]).then(function(data) {
					var chapterNames = [];
					if (data[0]) {
						console.log(data[0]);
						_.each(data[0], function(state) {
							_.each(state, function(chapters) {
								chapterNames.push(chapters.name);
							});
						});
						$scope.chapters = chapterNames;
					}else{
						console.log('Failed to get Chapters...');
					}
				});
		};

		// empty submit object
		$scope.newUserDirectory = {};

		$scope.postUser = function() {
			var i;
			
			// check required fields if blank
			if ($scope.newUserDirectory.name.first == null ||
				$scope.newUserDirectory.name.last == null ||
				$scope.newUserDirectory.email == null ||
				$scope.newUserDirectory.password == null ||
				$scope.newUserDirectory.phone == null) {
				console.log($scope.newUserDirectory);
				console.log('ERROR');
				swal({
					text: "Form incomplete!",
					type: 'warning',
					timer: 2500
				});
			} else {
				console.log($scope.newUserDirectory);
				console.log('SUCCESS');
				var packet = {
					address: {
						city: $scope.newUserDirectory.address.city,
						line1: $scope.newUserDirectory.address.line1,
						line2: $scope.newUserDirectory.address.line2,
						state: $scope.newUserDirectory.address.state.name,
						zip: $scope.newUserDirectory.address.zip
					},
					name: $scope.newUserDirectory.name,
					branch: $scope.newUserDirectory.branch,
					email: $scope.newUserDirectory.email,
					gender: $scope.newUserDirectory.gender,
					DOB: $scope.newUserDirectory.DOB,
					phone: $scope.newUserDirectory.phone,
					years: $scope.newUserDirectory.years,
					Region: $scope.newUserDirectory.region.name,
					Chapter: $scope.newUserDirectory.chapter,
					password: $scope.newUserDirectory.password
				};

				console.log(packet);

				var results = commonServices.register(packet);

				$q.all([results]).then(function(data) {
					if (data[0]) {
						// If sign in was successful, send user to events page
						// $rootScope.$broadcast('changeSessionState', 'true');				
						// localStorageService.set('sessionState', 'true');					
						// $state.go('dash.upcomingEvents');

					}else{
						// Do something here when sign in unsuccessful....
						console.log('Login failed...');
					}
				});

				// Api.chapterCreateMember.save(packet).$promise.then(
				// 	function (val) {
				// 		swal({
				// 			text: "User added!",
				// 			type: 'success',
				// 			timer: 2500
				// 		});
				// 		$uibModalInstance.close();
				// 	},
				// 	function (error) {
				// 		swal({
				// 			text: "Error submitting data. Please try again",
				// 			type: 'error',
				// 			timer: 2500
				// 		});
				// 	}
				// );

			}

		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

	});
