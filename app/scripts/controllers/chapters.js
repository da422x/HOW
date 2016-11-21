/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:ChaptersCtrl
 * @description
 * # ChaptersCtrl
 * Controller of the ohanaApp
 */
angular.module('ohanaApp')
	// .config(function(uiGmapGoogleMapApiProvider) {
	// 	'use strict';
	// 	uiGmapGoogleMapApiProvider.configure({
	// 		key: 'AIzaSyChntY-POe8wZ6pqvz8WXi1pkAyt6B7gtE',
	// 		libraries: ''
	// 	});
	// })
	.controller('ChaptersCtrl', function ($scope, $http, $filter, $location, NgMap) {
		'use strict';
		 NgMap.getMap().then(function(map) {
    console.log(map.getCenter());
    console.log('markers', map.markers);
    console.log('shapes', map.shapes);
  });
		$scope.map = { center: { latitude: 38.294322, longitude: -94.0136068 }, zoom: 4 };

		$scope.onClick = function(marker, eventName, model) {
			model.show = !model.show;
		};

		$http.get('data/chapters.json').then(function(response){
			$scope.inputZip =  $location.search().zipCode;
			$scope.locationFilter = $scope.inputZip.slice(0,1);
			$scope.chapters = [];
			response.data.chapters.forEach(function(chapter){
				$scope.chapters.push({
					id: chapter.id,
					name: chapter.name,
					latitude: chapter.lat,
					longitude: chapter.lng,
					city: chapter.city,
					url: chapter.url,
					state: chapter.state,
					state_full: chapter.state_full,
					zip: chapter.zip,
					icon: '../assets/images/logos/icon-sm.png',
					label: {
						text: chapter.name
					},
					templateUrl: '../parts/infoWindow.html',
					templateParameter: {
						name: chapter.name,
						contactName: chapter.description,
						contactEmail: chapter.email,
						url: chapter.url
					}
				});
			});

			$scope.$watch("keywordFilter", function(keywordFilter){
				$scope.filteredMarkers = $filter("filter")($scope.chapters, keywordFilter);
				if (!$scope.filteredMarkers){
					return;
				}
			});
			
			$scope.$watch("locationFilter", function(locationFilter){
				$scope.filteredMarkers = $filter("filter")($scope.chapters, { zip: locationFilter }, function(actual, expected) {
					var expected_pattern = new RegExp('^'+expected);
					return actual.match(expected_pattern);
				});
				if (!$scope.filteredMarkers){
					return;
				}
			});
		});

		// uiGmapGoogleMapApi.then(function(maps) {

		// });
	});
