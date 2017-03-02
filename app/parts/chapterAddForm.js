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

        //Form data
        $scope.regions = $rootScope.siteData.regions;
        $scope.states = $rootScope.siteData.states;

        // empty submit object
        $scope.newChapter = {};

        $scope.postChapter = function() {
            // submit form
            var result = commonServices.pushData('/Regions/' + newChapter.region + '/' + newChapter.state + '/' + $scope.editValue[1].name, $scope.newChapter);

            $q.all([result]).then(function(data) {
                if (data[0]) {
                    console.log(data[0]);
                    $uibModalInstance.close();
                    swal({
                        text: "Adding Chapter",
                        type: 'success',
                        timer: 2500
                    });
                } else {
                    swal({
                        text: "Something happened....",
                        type: 'error',
                        timer: 2500
                    });
                }
            });
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    });
