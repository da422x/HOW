/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:ChapterAddCtrl
 * @description
 * # ChapterAddCtrl
 * Controller of the ohanaApp
 */
angular.module('ohanaApp')
    .controller('ChapterAddCtrl', function($q, $scope, $uibModalInstance, commonServices, $rootScope) {
        'use strict';
        var submitChapter = {};
        //Form data
        $scope.regions = $rootScope.siteData.regions;
        $scope.states = $rootScope.siteData.states;

        // empty submit object
        $scope.newChapter = {};

        //Submit Form
        $scope.postChapter = function(newChapter) {
            //KNOWN DATA MANIPULATION
            submitChapter = angular.copy(newChapter);
            submitChapter.region = submitChapter.region.value;
            submitChapter.state = submitChapter.state.id;
            submitChapter.url = submitChapter.facebook;
            delete submitChapter.facebook;
            submitChapter.email_link = "<a href=\"" + submitChapter.email + "\" target=\"_blank\" id=\"slp_marker_email\" class=\"storelocatorlink\"><nobr>Email</nobr></a>";
            submitChapter.web_link = "<a href='" + submitChapter.url + "' target='_blank' class='storelocatorlink'>" + submitChapter.url + "</a><br/>";
            submitChapter.url_link = "<a href='" + submitChapter.url + "' target='_blank' class='storelocatorlink'>" + submitChapter.url + "</a><br/>";

            //TODO: UNKNOWN DATA
            submitChapter.lat = 0;
            submitChapter.lng = 0;
            submitChapter.address = "";
            submitChapter.address2 = "";
            submitChapter.attributes = "";
            submitChapter.city = "";
            submitChapter.country = "";
            submitChapter.distance = "";
            submitChapter.fax = "";
            submitChapter.featured = "";
            submitChapter.hours = "";
            submitChapter.icon = "";
            submitChapter.id = "";
            submitChapter.image = "";
            submitChapter.linked_postid = "0";
            submitChapter.neat_title = "";
            submitChapter.option_value = "";
            submitChapter.phone = "";
            submitChapter.rank = "";
            submitChapter.sl_pages_url = "";
            submitChapter.tags = "";
            //Post Chapter Data
            var newChapterKey = commonServices.getNewKey('/Regions/' + submitChapter.region + '/' + submitChapter.state + '/');

            // Get Key for new chapter.
            $q.all([newChapterKey]).then(function(data) {

                // Post new chapter with key, update map table.
                var result = commonServices.setData('/Regions/' + submitChapter.region + '/' + submitChapter.state + '/' + data[0], submitChapter);
                $q.all([result]).then(function(status) {

                    var updateMapTable = commonServices.setData('/siteData/chapters/' + data[0], {
                        region: submitChapter.region,
                        text: submitChapter.name,
                        value: submitChapter.name
                    });

                    $uibModalInstance.close(submitChapter);
                    swal({
                        text: "Adding Chapter",
                        type: 'success',
                        timer: 2500
                    });
                })

            });
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    });
