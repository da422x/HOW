/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:ManageVolunteersCtrl
 * @description
 * # ManageVolunteersCtrl
 * Controller of the ohanaApp
 */
angular.module('ohanaApp')
  .controller('ManageVolunteersCtrl', function(event, $rootScope, $q, commonServices, $scope, $uibModalInstance) {
    'use strict';
    $scope.rows_selected = [];
    $scope.event = event;
    $scope.email;

    $scope.addVolunteer = function(email, key) {
      email = email.trim();
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
                        //check if the prospective volunteer is already signed up as a participant
                        commonServices.getUserByEmailAtPath(email, '/events/' + key + '/participants')
                          .then(function(part) {
                            if (part) {
                              //if they are a participant then remove them from the participant table
                              var entity_key = Object.keys(part)[0];
                              commonServices.removeData('/events/' + key + '/participants/' + entity_key);
                            }
                            commonServices.pushData('/events/' + key + '/volunteers', data[temp_key]);
                            $scope.reloadData();
                          });
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
            $scope.reloadData();
          }

        }, function(err) {
          swal(
            'Oops...',
            "Unknown Error",
            'error'
          );
          $scope.reloadData();
        });


    }
    $scope.reloadData = function() {
      commonServices.getData('/events/' + $scope.event.key + '/volunteers')
        .then(function(data) {
          $scope.event.volunteers = data;
          $scope.buildTable();
        });
    }
    $scope.deleteVolunteers = function() {
      $scope.rows_selected.forEach(function(val, idx) {
        commonServices.removeData('/events/' + $scope.event.key + '/volunteers/' + val);

      })
      $scope.reloadData(

      );
    }

    $scope.buildTable = function() {
      var i;
      var packet;
      var dataSet = [];
      var tmp = ($scope.event.volunteers) ? Object.keys($scope.event.volunteers).forEach(function(val, idx) {
        $scope.event.volunteers[val]["key"] = val;
        dataSet.push($scope.event.volunteers[val]);
      }) : [];
      //dataGridUtil.buildMembersTableData(results);
      $scope.currId = ""; // holds value of the current row's member Id for CRUD ops
      $scope.checkedBoxes = [];

      angular.element(document).ready(function() {
        //toggle `popup` / `inline` mode
        $.fn.editable.defaults.mode = 'popup';
        $.fn.editable.defaults.ajaxOptions = {
          type: 'PUT'
        };

        //if exists, destroy instance of table
        if ($.fn.DataTable.isDataTable($('#volunteersTable'))) {
          $scope.volunteersTable.destroy();
          console.log('inside the destroy');
        }
        $scope.volunteersTable = $('#volunteersTable').DataTable({
          // ajax: 'testData/members.json',
          data: dataSet,
          // scrollX: true,
          columns: [{
              title: "KEY",
              data: "key"
            }, {
              title: "Email",
              data: "email",
              orderable: false
            }, {
              title: "First Name",
              data: "name.first"
            },
            // {
            //     title: "Middle Name",
            //     data: "middle"
            // }, 
            {
              title: "Last Name",
              data: "name.last"
            }, {
              title: "Mobile #",
              data: "phone",
              orderable: false
            }
          ],
          'columnDefs': [{
            targets: 0,
            searchable: false,
            orderable: false,
            className: 'dt-body-center',
            render: function() {
              return '<input type="checkbox" class="volunteersTable-select">';
            }
          }],
          'order': [
            [1, 'desc']
          ],
          headerCallback: function(thead) {},
          'rowCallback': function(row, data, dataIndex) {
            // Get row ID
            var rowId = data[0];

            // If row ID is in the list of selected row IDs
            if ($.inArray(rowId, $scope.rows_selected) !== -1) {
              $(row).find('input[type="checkbox"]').prop('checked', true);
              $(row).addClass('selected');
            }
          },
          drawCallback: function(settings) {
            // Handle click on checkbox
            $('.volunteersTable-select').on('click', function(e) {
              var $row = $(this).closest('tr');

              // Get row data
              var data = $scope.volunteersTable.row($row).data();

              // Get row ID
              var rowId = data["key"];

              // Determine whether row ID is in the list of selected row IDs 
              var index = $.inArray(rowId, $scope.rows_selected);

              // If checkbox is checked and row ID is not in list of selected row IDs
              if (this.checked && index === -1) {
                $scope.rows_selected.push(rowId);

                // Otherwise, if checkbox is not checked and row ID is in list of selected row IDs
              } else if (!this.checked && index !== -1) {
                $scope.rows_selected.splice(index, 1);
              }

              if (this.checked) {
                $row.addClass('selected');
              } else {
                $row.removeClass('selected');
              }
              $scope.$apply();
              // Update state of "Select all" control
              // updateDataTableSelectAllCtrl(table);

              // Prevent click event from propagating to parent
              e.stopPropagation();
            });

          }
        });

        console.log($scope.volunteersTable);
      })
    }

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };

  });
