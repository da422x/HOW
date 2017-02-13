/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:ChapterStatusCtrl
 * @description
 * # ChapterStatusCtrl
 * Controller of the ohanaApp
 */
angular.module('ohanaApp')
    .controller('ChapterStatusCtrl', function($q, commonServices, userService, $scope, $rootScope, $uibModalInstance) {
        'use strict';

        $scope.update = function() {
            // TODO
        }

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
            $rootScope.$broadcast('modalClosing');
        };

    });
