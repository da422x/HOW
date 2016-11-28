/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:DirectoryCtrl
 * @description
 * # DirectoryCtrl
 * Controller of management console - directory
 */
angular.module('ohanaApp')
	.controller('DirectoryCtrl', function ($q, commonServices, $scope, $uibModal, Api, dataGridUtil, selectValues) {
		'use strict';

		$scope.buildTable = function (results) {
			var i;
			var packet;
			var dataSet = dataGridUtil.buildMembersTableData(results);
			$scope.currId = ""; // holds value of the current row's member Id for CRUD ops
			$scope.checkedBoxes = [];

			angular.element(document).ready(function () {
				//toggle `popup` / `inline` mode
				$.fn.editable.defaults.mode = 'popup';
				$.fn.editable.defaults.ajaxOptions = {
					type: 'PUT'
				};

				//if exists, destroy instance of table
				if ($.fn.DataTable.isDataTable($('#membersTable'))) {
					$scope.membersTable.destroy();
				}

				$scope.membersTable = $('#membersTable').DataTable({
					// ajax: 'testData/members.json',
					data: dataSet,
					columns: [
						{},
						{
							title: "KEY",
							data: "key"
						},
						{
							title: "First Name",
							data: "first"
						},
						{
							title: "Last Name",
							data: "last"
						},
						{
							title: "DOB",
							data: "dob"
						},
						{
							title: "Email",
							data: "email",
							orderable: false
						},
						{
							title: "Mobile #",
							data: "phone",
							orderable: false
						},
						{
							title: "Role",
							data: "role"
						},
						{
							title: "Region",
							data: "region"
						},
						{
							title: "Chapter",
							data: "chapter"
						},
						{
							title: "Mil. Affil.",
							data: "branch",
							orderable: false
						},
						{
							title: "Notes",
							data: "notes",
							orderable: false
						}
					],
					'columnDefs': [
						{
							targets: 1,
							visible: false
						}, {
							targets: 0,
							searchable: false,
							orderable: false,
							className: 'dt-body-center',
							render: function () {
								return '<input type="checkbox" id="membersTable-select">';
							}
						}, {
							targets: 3,
							width: '50px'
						}, {
							targets: 5,
							width: '90px'
						}
					],
					'order': [[3, 'asc']],
					headerCallback: function (thead) {
						$(thead).find('th').eq(0).html('<input type="checkbox" id="membersTable-select-all">');
					},
					rowCallback: function (row, data, index) {
						$(row).find('input[type="checkbox"]').eq(0).attr('value', data.key)
						$(row).children().eq(1).addClass('tdFname');
						$(row).children().eq(2).addClass('tdLname');
						$(row).children().eq(3).addClass('tdDob');
						$(row).children().eq(4).addClass('tdEmail'); // email checking disabled
						$(row).children().eq(5).addClass('tdTelly'); // phone # checking disabled
						$(row).children().eq(6).addClass('tdSelectRole');
						$(row).children().eq(7).addClass('tdSelectRegion');
						$(row).children().eq(8).addClass('tdSelectChapter');
						$(row).children().eq(9).addClass('tdMil');
						$(row).children().eq(10).addClass('tdNotes');
						for (i = 1; i < 10; i++) {
							$(row).children().eq(i).wrapInner('<a class="editable editable-click" style="border: none;"></a>');
						}
						return row;
					},
					drawCallback: function (settings) {
						// set currentId to user being edited
						$('#membersTable').off('click', 'tr');
						$('#membersTable').on('click', 'tr', function () {
							$scope.currId = $(this).find('input[type="checkbox"]').val();

							if ($(this).find('input[type="checkbox"]').is(':checked')) {
								$scope.checkedBoxes.push($scope.currId);
							}else{
								for (var i = 0; i < $scope.checkedBoxes.length; i++) {
									if ($scope.checkedBoxes[i] === $scope.currId) {
										$scope.checkedBoxes.splice(i, 1);
									}
								}
							}
						});
						// editable field definitions and CRUD ops
						$('#membersTable .tdFname a').editable({
							type: "text",
							name: "first",
							placement: "bottom",
							emptytext: "null",
							url: function (params) {
								var packet = params.value;
								var path = '/userData/' +  $scope.currId + '/name/first/';
								commonServices.updateData(path, packet);
							}
						});
						$('#membersTable .tdLname a').editable({
							type: "text",
							name: "last",
							placement: "bottom",
							emptytext: "null",
							url: function (params) {
								var packet = params.value
								var path = '/userData/' +  $scope.currId + '/name/last/';
								commonServices.updateData(path, packet);
							}
						});
						$('#membersTable .tdDob a').editable({
							type: "combodate",
							name: "DOB",
							placement: "bottom",
							emptytext: "null",
							format: 'YYYY-MM-DD',
							viewformat: 'MM/DD/YYYY',
							template: 'MMM / DD / YYYY',
							combodate: {
								template: 'MMM / DD / YYYY',
								minYear: 1900,
								maxYear: 2020
							},
							url: function (params) {
								var packet = params.value;
								var path = '/userData/' +  $scope.currId + '/DOB/';
								commonServices.updateData(path, packet);
							}
						});
						$('#membersTable .tdEmail a').editable({
							type: "email",
							name: "email",
							placement: "bottom",
							emptytext: "null",
							url: function (params) {
								var packet = params.value
								var path = '/userData/' +  $scope.currId + '/email/';
								commonServices.updateData(path, packet);
							}
							// TODO email throws error Uncaught InvalidStateError: Failed to
							//execute 'setSelectionRange' on 'HTMLInputElement': The input
							// element's type ('email') does not support selection.
							// ONLY IN CHROME. BUG FIX https://bugs.chromium.org/p/chromium/issues/detail?id=346270
						});
						$('#membersTable .tdTelly a').editable({
							type: "text",
							name: "phone",
							placement: "bottom",
							emptytext: "null",
							url: function (params) {
								var packet = params.value
								var path = '/userData/' +  $scope.currId + '/phone/';
								commonServices.updateData(path, packet);
							}
							// TODO fix pattern masking for phone #s
							// pattern: "\d{3}\-\d{3}\-\d{4}"
						});
						$('#membersTable .tdSelectRole a').editable({
							type: "select",
							name: "role",
							placement: "bottom",
							emptytext: "null",
							showbuttons: false,
							url: function (params) {
								var packet = {
									role: params.value
								}
								var path = '/userRoles/' + $scope.currId;
								commonServices.updateData(path, packet);
							},
							source: [
								{
									value: 'Participant',
									text: 'Participant'
								},
								{
									value: 'Volunteer',
									text: 'Volunteer'
								},
								{
									value: 'Leadership Team Member',
									text: 'Leadership Team Member'
								},
								{
									value: 'HOW National Team/Staff',
									text: 'HOW National Team/Staff'
								},
								{
									value: 'admin',
									text: 'admin'
								}
							]
						});
						$('#membersTable .tdSelectRegion a').editable({
							type: "select",
							name: "region",
							placement: "bottom",
							emptytext: "null",
							showbuttons: false,
							url: function (params) {
								var packet = params.value;
								var path = '/userData/' + $scope.currId + '/Region/';
								commonServices.updateData(path, packet);
							},
							source: [
								{
									value: 'Midwest Chapters',
									text: 'Midwest Chapters'
								},
								{
									value: 'Northeast Chapters',
									text: 'Northeast Chapters'
								},
								{
									value: 'Pacific Chapters',
									text: 'Pacific Chapters'
								},
								{
									value: 'Rocky Mountain Chapters',
									text: 'Rocky Mountain Chapters'
								},
								{
									value: 'Southeast Chapters',
									text: 'Southeast Chapters'
								},
								{
									value: 'Southwest Region',
									text: 'Southwest Region'
								}
							]
						});
						$('#membersTable .tdSelectChapter a').editable({
							type: "select",
							name: "chapter",
							placement: "bottom",
							emptytext: "null",
							showbuttons: false,
							url: function (params) {
								var packet = params.value;
								var path = '/userData/' + $scope.currId + '/Chapter/';
								commonServices.updateData(path, packet);
							},
							source: function () {
								var regionText = $(this).parent().parent().find('.tdSelectRegion').text();
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
						$('#membersTable .tdMil a').editable({
							type: "text",
							name: "branch",
							placement: "bottom",
							emptytext: "null",
							url: function (params) {
								var packet = params.value
								var path = '/userData/' +  $scope.currId + '/branch/';
								commonServices.updateData(path, packet);
							}
						});
						$('#membersTable .tdNotes a').editable({
							type: "textarea",
							name: "notes",
							placement: "bottom",
							emptytext: "null",
							url: function (params) {
								// TO-DO: Set up notes functionality
							}
						});
					}
				});

				// Handle click on "Select all" control
				$('#membersTable-select-all').on('click', function () {
					// Get all rows with search applied
					var rows = $scope.membersTable.rows({
						'search': 'applied'
					}).nodes();
					// Check/uncheck checkboxes for all rows in the table
					$('input[type="checkbox"]', rows).prop('checked', this.checked);
				});

				// Handle click on checkbox to set state of "Select all" control
				$('#membersTable tbody').on('change', 'input[type="checkbox"]', function () {
					// If checkbox is not checked
					if (!this.checked) {
						var el = $('#membersTable-select-all').get(0);
						// If "Select all" control is checked and has 'indeterminate' property
						if (el && el.checked && ('indeterminate' in el)) {
							// Set visual state of "Select all" control
							// as 'indeterminate'
							el.indeterminate = true;
						}
					}
				});
			}); // end document ready
		}; // end $scope.buildTable

		$scope.update = function () {
			var newDataSet = commonServices.getData('/userData/');
			var newRoleData = commonServices.getData('/userRoles/');
			$q.all([newDataSet, newRoleData]).then(function(userData) {
				var users = [];
				var roles = [];
				var i = 0;

				_.each(userData[1], function(value) {
					roles.push(value.role);
				});

				_.each(userData[0], function(value, key) {
					value.key = key;
					value.role = roles[i];
					users.push(value);
					i++;
				});
				$scope.buildTable(users);
			});
		}; // end $scope.update

		$scope.add = function () {
			var modalInstance = $uibModal.open({
				templateUrl: '/parts/newUserDirectoryForm.html',
				controller: 'NewUserDirectoryFormCtrl'
			});		
		}; // end $scope.add

		$scope.remove = function () {
			if ($scope.checkedBoxes.length === 0) {
				swal('', 'No records selected!', 'warning');
			} else {
				swal({
					title: 'Are you sure?',
					text: "Get ready to kiss it goodbye!",
					type: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, delete it!'
				}).then(function () {
					_.each($scope.checkedBoxes, function(userKey) {
						commonServices.removeData('/userData/' + userKey);
						commonServices.removeData('/userRoles/' + userKey);
					});
					swal('Deleted!', 'Your file has been deleted.', 'success');
					$scope.update();
				});
			} // end else

		}; // end $scope.remove

	});
