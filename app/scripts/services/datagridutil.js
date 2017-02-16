/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc service
 * @name ohanaApp.dataGridUtil
 * @description
 * # dataGridUtil
 * Service in the ohanaApp.
 */
angular.module('ohanaApp')
    .service('dataGridUtil', function() {
        'use strict';
        var dataGridUtil = this;

        dataGridUtil.buildMembersTableData = function(results) {
            // console.log(results);
            var resultsLen = results.length;
            var gridData = [];

            // build members data table from http response
            for (var i = 0; i < resultsLen; i++) {
                var arr = {};
                arr.key = results[i].key;
                arr.first = results[i].name.first;
                arr.last = results[i].name.last;
                var dobparse = new Date(results[i].DOB);
                var endob = dobparse.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                });
                arr.dob = endob;
                arr.email = results[i].email;
                arr.phone = results[i].phone;
                arr.role = results[i].role;
                arr.primaryChapter = results[i].Chapter;
                arr.chapters = [];
                _.each(results[i].Chapters, function(c) {
                    arr.chapters.push(c.chapter);
                });
                if (results[i].branch) {
                    arr.branch = results[i].branch;
                } else {
                    arr.branch = "";
                }
                if (results[i].notes) {
                    arr.notes = results[i].notes;
                } else {
                    arr.notes = "";
                }

                // NOTE FOR IF THE DATA IS STORED IN ARRAYS NOT OBJECTS LIKE ABOVE
                // var arr = [];
                // arr.push("");
                // arr.push(results[i].id);
                // arr.push(results[i].first_name);
                // arr.push(results[i].last_name);
                // var dob = new Date(results[i].DOB);
                // var endob = dob.toLocaleDateString('en-US', {year:'numeric', month:'2-digit', day:'2-digit'});
                // arr.push(endob);
                // arr.push(results[i].email);
                // arr.push(results[i].mobile_number);
                // arr.push(results[i].role);
                // arr.push(results[i].region);
                // arr.push(results[i].chapter);
                // if (results[i].military_affiliation) {
                //   arr.push(results[i].military_affiliation);
                // } else {
                //   arr.push("");
                // }
                // if (results[i].notes) {
                //   arr.push(results[i].notes);
                // } else {
                //   arr.push("");
                // }

                gridData.push(arr);
            }
            // console.log(gridData);
            return gridData;
        };

        dataGridUtil.buildInventoryTableData = function(results) {
            var resultsLen = results.length;
            var gridData = [];

            // build inventory data table from http response
            for (var i = 0; i < resultsLen; i++) {
                var arr = {};
                arr.DT_RowId = results[i].item_id;
                arr.name_of_item = results[i].name_of_item;
                arr.category = results[i].category;
                arr.condition = results[i].condition;
                if (results[i].purchase_date) {
                    var pdateparse = new Date(results[i].purchase_date);
                    var enpdate = pdateparse.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    });
                    arr.purchase_date = enpdate;
                } else {
                    arr.purchase_date = "";
                }
                if (results[i].reservations.length != 0) {
                    arr.reservedFlag = false;
                } else {
                    arr.reservedFlag = true;
                }
                if (results[i].chapter) {
                    arr.chapter = results[i].chapter.name;
                } else {
                    arr.chapter = "";
                }
                if (results[i].notes) {
                    arr.notes = results[i].notes;
                } else {
                    arr.notes = "";
                }

                gridData.push(arr);
            }
            //			console.log("griddata", gridData);
            return gridData;
        };

        dataGridUtil.buildEventPeopleTableData = function(results) {
            var resultsLen = results.length;
            var gridData = [];

            // build event people data table from http response
            for (var i = 0; i < resultsLen; i++) {
                var arr = {};
                arr.DT_RowId = results[i].id;
                arr.first_name = results[i].first_name;
                arr.last_name = results[i].last_name;
                arr.email = results[i].email;

                gridData.push(arr);
            }
            return gridData;
        };

        dataGridUtil.buildChaptersTableData = function(results) {
            var resultsLen = results.length;
            var gridData = [];
            console.log(results);
            // build chapters data table from http response
            for (var i = 0; i < resultsLen; i++) {
                var arr = {};
                arr.region = results[i].key;
                arr.first = results[i].name.first;
                arr.last = results[i].name.last;
                var dobparse = new Date(results[i].DOB);
                var endob = dobparse.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                });
                arr.dob = endob;
                arr.email = results[i].email;
                arr.phone = results[i].phone;
                arr.role = results[i].role;
                arr.region = results[i].Region;
                arr.chapter = results[i].Chapter;
                if (results[i].branch) {
                    arr.branch = results[i].branch;
                } else {
                    arr.branch = "";
                }
                if (results[i].notes) {
                    arr.notes = results[i].notes;
                } else {
                    arr.notes = "";
                }
                gridData.push(arr);
            }
            console.log(gridData);
            return gridData;
        };

    });
