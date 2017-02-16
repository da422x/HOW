'use strict';

/**
 * @ngdoc service
 * @name ohanaApp.howLogService
 * @description
 * # howLogService
 * Service in the ohanaApp.
 */
angular.module('ohanaApp')
    .service('howLogService', function($rootScope, commonServices) {
        // AngularJS will instantiate a singleton by calling "new" on this function

        this.logPrimaryChapterChange = function(userName, authUserName, oldChapter, newChapter) {
            var ts = Date.now();
            var logObj = {
                type: 'primary',
                timeStamp: ts,
                userName: userName,
                changedBy: authUserName,
                oldChapter: oldChapter,
                newChapter: newChapter
            };

            commonServices.pushData('/logs/chapterChanges/', logObj);
        };

        this.logSecondaryChapterChange = function(userName, authUserName, oldChapters, newChapters) {
            var ts = Date.now();
            var logObj = {
                type: 'secondary',
                timeStamp: ts,
                userName: userName,
                changedBy: authUserName,
                oldChapters: oldChapters,
                newChapters: newChapters
            };

            commonServices.pushData('/logs/chapterChanges/', logObj);
        };

    });
