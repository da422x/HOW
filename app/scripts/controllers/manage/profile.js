/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * 
 */
angular.module('ohanaApp')
	.controller('ProfileCtrl', function ($scope, $rootScope, $q, commonServices, localStorageService, $uibModal) {
		'use strict';
		
		$scope.update = function () {
			var userUID = localStorageService.get('sessionUserUID');
			var userData = commonServices.getData('/userData/' + userUID);
			var userRole = localStorageService.get('sessionUserRole');
			var userRquests = commonServices.getData('/roleChangeRequests/');

			$q.all([userData, userRquests]).then(function(data) {
				$scope.profileData = data[0];
				$scope.profileData.role = userRole;
				$scope.userUID = userUID;
				$scope.requests = [];
				_.each(data[1], function(value, key) {
					if (value.uid === $scope.userUID) {
						value.key = key;
						$scope.requests.push(value);
					}
				});
				console.log($scope.requests);
			});

		};

		$scope.$on('modalClosing', function() {
			$scope.update();
		});

		$scope.roleChangeRequest = function () {
			var modalInstance = $uibModal.open({
				templateUrl: '/parts/rolerequestchangeform.html',
				controller: 'RoleRequestChangeFormCtrl as rrcf',
				resolve: {
					userInfo: function() {
						return {
							uid: $scope.userUID,
							data: $scope.profileData
						}
					}
				}
			});
			if (!modalInstance) {
				$scope.update();
			}
		};

		$scope.deleteRequest = function (key) {
			console.log(key);
			swal({
			  title: 'Are you sure?',
			  text: "You won't be able to revert this!",
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Yes, delete it!'
			}).then(function () {
			  swal(
			    'Deleted!',
			    'Your file has been deleted.',
			    'success'
			  ).then(function() {
			  	commonServices.removeData('/roleChangeRequests/' + key);
			  	$scope.update();
			  });
			});
		};

		$('#user_dob').editable({
			type: 'combodate',
			name: 'DOB',
			placement: 'bottom',
			emptytext: 'null',
			format: 'YYYY-MM-DD',
			viewformat: 'MM/DD/YYYY',
			template: 'MMM / DD / YYYY',
			combodate: {
				template: 'MMM / DD / YYYY',
				minYear: 1900,
				axYear: 2020
			},
			url: function (params) {
				var packet = params.value;
				var path = '/userData/' +  $scope.userUID + '/DOB/';
				commonServices.updateData(path, packet);
			}
		});

		$('#user_gender').editable({
			type: 'select',
			name: 'gender',
			placement: 'bottom',
			emptytext: 'null',
			showbuttons: false,
			url: function (params) {
				var packet = params.value;
				var path = '/userData/' +  $scope.userUID + '/gender/';
				commonServices.updateData(path, packet);
			},
			source: [
				{ value: 'M', text: 'M' },
				{ value: 'F', text: 'F' },
				{ value: 'N/A', text: 'N/A' }
			]
		});

		$('#user_phone').editable({
			type: 'number',
			name: 'phone',
			placement: 'bottom',
			emptytext: 'null',
			min: '1000000000',
			max: '9999999999',
			showbuttons: true,
			url: function (params) {
				var packet = params.value;
				var path = '/userData/' +  $scope.userUID + '/phone/';
				commonServices.updateData(path, packet);
			}
		});

		$('#user_region').editable({
			type: 'select',
			name: 'region',
			placement: 'bottom',
			emptytext: 'null',
			showbuttons: false,
			url: function (params) {
				var packet = params.value;
				var path = '/userData/' + $scope.userUID + '/Region/';
				commonServices.updateData(path, packet);
			},
			source: [
				{ value: 'Midwest Chapters', text: 'Midwest Chapters' },
				{ value: 'Northeast Chapters', text: 'Northeast Chapters' },
				{ value: 'Pacific Chapters', text: 'Pacific Chapters' },
				{ value: 'Rocky Mountain Chapters', text: 'Rocky Mountain Chapters' },
				{ value: 'Southeast Chapters', text: 'Southeast Chapters' },
				{ value: 'Southwest Region', text: 'Southwest Region' }
			]
		});

		$('#user_chapter').editable({
			type: 'select',
			name: 'chapter',
			placement: 'bottom',
			emptytext: 'null',
			showbuttons: false,
			url: function (params) {
				var packet = params.value;
				var path = '/userData/' + $scope.userUID + '/Chapter/';
				commonServices.updateData(path, packet);
			},
			source: function () {
				var regionText = $(this).parent().parent().find('#user_region').text();
				switch (regionText) {
					case 'Midwest Chapters': 
						return [
							{ value: 'CENTRAL IOWA CHAPTER', text: 'CENTRAL IOWA CHAPTER' },
							{ value: 'CHICAGOLAND ILLINOIS CHAPTER', text: 'CHICAGOLAND ILLINOIS CHAPTER' },
							{ value: 'INDIANA CHAPTER', text: 'INDIANA CHAPTER' },
							{ value: 'KANSAS CHAPTER', text: 'KANSAS CHAPTER' },
							{ value: 'SOUTHEAST MICHIGAN CHAPTER', text: 'SOUTHEAST MICHIGAN CHAPTER' },
							{ value: 'TWIN CITIES MINNESOTA CHAPTER', text: 'TWIN CITIES MINNESOTA CHAPTER' },
							{ value: 'SOUTHWEST MISSOURI CHAPTER', text: 'SOUTHWEST MISSOURI CHAPTER' },
							{ value: 'EASTERN NEBRASKA CHAPTER', text: 'EASTERN NEBRASKA CHAPTER' },
							{ value: 'HEARTLAND CHAPTER', text: 'HEARTLAND CHAPTER' },
							{ value: 'SOUTH CENTRAL WISCONSIN CHAPTER', text: 'SOUTH CENTRAL WISCONSIN CHAPTER' },
							{ value: 'SOUTHEASTERN WISCONSIN', text: 'SOUTHEASTERN WISCONSIN' }
						];
						break;
					case 'Northeast Chapters':
						return [
							{ value: 'BOSTON MASSACHUSETTS CHAPTER', text: 'BOSTON MASSACHUSETTS CHAPTER' },
							{ value: 'MARYLAND CHAPTER', text: 'MARYLAND CHAPTER' },
							{ value: 'SOUTHERN MAINE CHAPTER', text: 'SOUTHERN MAINE CHAPTER' },
							{ value: 'NEW JERSEY CHAPTER', text: 'NEW JERSEY CHAPTER' },
							{ value: 'NYC-LONG ISLAND CHAPTER', text: 'NYC-LONG ISLAND CHAPTER' },
							{ value: 'CENTRAL PENNSYLVANIA CHAPTER', text: 'CENTRAL PENNSYLVANIA CHAPTER' },
							{ value: 'WESTERN PENNSYLVANIA CHAPTER', text: 'WESTERN PENNSYLVANIA CHAPTER' }
						];
						break;
					case 'Pacific Chapters':
						return [
							{ value: 'CENTRAL CALIFORNIA CHAPTER', text: 'CENTRAL CALIFORNIA CHAPTER' },
							{ value: 'NORCAL CHAPTER', text: 'NORCAL CHAPTER' },
							{ value: 'SHASTA CALIFORNIA CHAPTER', text: 'SHASTA CALIFORNIA CHAPTER' },
							{ value: 'SOCAL CHAPTER', text: 'SOCAL CHAPTER' },
							{ value: 'MAUI HAWAII CHAPTER', text: 'MAUI HAWAII CHAPTER' },
							{ value: 'PORTLAND CHAPTER', text: 'PORTLAND CHAPTER' },
							{ value: 'NORTHWEST CHAPTER', text: 'NORTHWEST CHAPTER' }
						];
						break;
					case 'Rocky Mountain Chapters': 
						return [
							{ value: 'GREAT BASIN NEVADA CHAPTER', text: 'GREAT BASIN NEVADA CHAPTER' },
							{ value: 'NORTHERN UTAH', text: 'NORTHERN UTAH' }
						];
						break;
					case 'Southeast Chapters': break;
						return [
							{ value: 'SOUTH ALABAMA CHAPTER', text: 'SOUTH ALABAMA CHAPTER' },
							{ value: 'NORTHWEST ARKANSAS CHAPTER', text: 'NORTHWEST ARKANSAS CHAPTER' },
							{ value: 'RIVER VALLEY ARKANSAS CHAPTER', text: 'RIVER VALLEY ARKANSAS CHAPTER' },
							{ value: 'CENTRAL FLORIDA CHAPTER', text: 'CENTRAL FLORIDA CHAPTER' },
							{ value: 'EMERALD COAST CHAPTER', text: 'EMERALD COAST CHAPTER' },
							{ value: 'KEY WEST FLORIDA CHAPTER', text: 'KEY WEST FLORIDA CHAPTER' },
							{ value: 'NORTHEAST FLORIDA CHAPTER', text: 'NORTHEAST FLORIDA CHAPTER' },
							{ value: 'PANAMA CITY FLORIDA', text: 'PANAMA CITY FLORIDA' },
							{ value: 'SARASOTA-BRADENTON CHAPTER', text: 'SARASOTA-BRADENTON CHAPTER' },
							{ value: 'SOUTH FLORIDA CHAPTER', text: 'SOUTH FLORIDA CHAPTER' },
							{ value: 'SOUTHWEST FLORIDA CHAPTER', text: 'SOUTHWEST FLORIDA CHAPTER' },
							{ value: 'SPACE COAST CHAPTER', text: 'SPACE COAST CHAPTER' },
							{ value: 'SPACE COAST CHAPTER', text: 'SPACE COAST CHAPTER' },
							{ value: 'TREASURE COAST CHAPTER', text: 'TREASURE COAST CHAPTER' },
							{ value: 'COASTAL GEORGIA', text: 'COASTAL GEORGIA' },
							{ value: 'LOUISIANA CHAPTER', text: 'LOUISIANA CHAPTER' },
							{ value: 'SOUTHWEST LOUISIANA CHAPTER', text: 'SOUTHWEST LOUISIANA CHAPTER' },
							{ value: 'COMBINED FORCES CHAPTER', text: 'COMBINED FORCES CHAPTER' },
							{ value: 'FOOTHILLS NORTH CAROLINA', text: 'FOOTHILLS NORTH CAROLINA' },
							{ value: 'LOWCOUNTRY SOUTH CAROLINA CHAPTER', text: 'LOWCOUNTRY SOUTH CAROLINA CHAPTER' },
							{ value: 'MUSIC CITY TENNESSEE CHAPTER', text: 'MUSIC CITY TENNESSEE CHAPTER' },
							{ value: 'GEORGE WASHINGTON CHAPTER', text: 'GEORGE WASHINGTON CHAPTER' },
							{ value: 'TIDEWATER CHAPTER', text: 'TIDEWATER CHAPTER' }
						];
					case 'Southwest Region': 
						return [
							{ value: 'ARIZONA CHAPTER', text: 'ARIZONA CHAPTER' },
							{ value: 'NE OKLAHOMA CHAPTER', text: 'NE OKLAHOMA CHAPTER' },
							{ value: 'AUSTIN TEXAS CHAPTER', text: 'AUSTIN TEXAS CHAPTER' },
							{ value: 'BAMC CHAPTER', text: 'BAMC CHAPTER' },
							{ value: 'COASTAL BEND CHAPTER', text: 'COASTAL BEND CHAPTER' },
							{ value: 'DFW CHAPTER', text: 'DFW CHAPTER' },
							{ value: 'EAST TEXAS CHAPTER', text: 'EAST TEXAS CHAPTER' },
							{ value: 'FT HOOD TEXAS', text: 'FT HOOD TEXAS' },
							{ value: 'RIO GRANDE VALLEY CHAPTER', text: 'RIO GRANDE VALLEY CHAPTER' },
							{ value: 'SAN ANTONIO CHAPTER', text: 'SAN ANTONIO CHAPTER' },
							{ value: 'SOUTHEAST TEXAS CHAPTER', text: 'SOUTHEAST TEXAS CHAPTER' }
						];
						break;
					default: return [
							{ value: '', text: '' }
						];
				}
			}
		});

	});