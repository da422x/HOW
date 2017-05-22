/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:ChangeChapterCtrl
 * @description
 * # ChangeChapterCtrl
 * Controller of the ohanaApp
 */
angular.module('ohanaApp')
    .controller('ChangeChapterCtrl', ['selectedUID', '$scope', '$rootScope', '$q', 'commonServices', 'userService', '$uibModalInstance', 'howLogService',
        function(selectedUID, $scope, $rootScope, $q, commonServices, userService, $uibModalInstance, howLogService) {
            'use strict';
            // $uibModalInstance.dismiss('cancel');
            // $rootScope.siteData.regionsChapters;
            // commonServices.getData('/userData/' + selectedUID);
        }
    ]);
