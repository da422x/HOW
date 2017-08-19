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

    /************************************************************************************
     *             START - Primary and Scondary Chapter Change calls                    *
     ************************************************************************************/
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

      commonServices.pushData('/logs/nationalLogs/memberTraffic/', logObj);
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

      commonServices.pushData('/logs/nationalLogs/memberTraffic/', logObj);
    };

    this.logNewUserAdded = function(userName, authUserName, chapter) {
      // Add this once Daniel has finished with new chapter selection on user registration. Derek Rusu
    };

    this.logUserAddedToChapter = function(userName, authUserName, newChapter) {
      var ts = Date.now();
      var logObj = {
        type: 'primary',
        status: 'added',
        timeStamp: ts,
        userName: userName,
        changedBy: authUserName,
        newChapters: newChapter
      };

      commonServices.pushData('/logs/chapterLogs/memberTraffic/primaryChapter/' + newChapter, logObj);
    };

    this.logUserAddedToSecondaryChapter = function(userName, authUserName, newChapters) {
      _.each(newChapters, function(newChapter) {
        var ts = Date.now();
        var logObj = {
          type: 'secondary',
          status: 'added',
          timeStamp: ts,
          userName: userName,
          changedBy: authUserName,
          newChapter: newChapter
        };

        commonServices.pushData('/logs/chapterLogs/memberTraffic/secondaryChapter/' + newChapter, logObj);
      });
    };

    this.logUserRemovedFromChapter = function(userName, authUserName, oldChapter) {
      var ts = Date.now();
      var logObj = {
        type: 'primary',
        status: 'removed',
        timeStamp: ts,
        userName: userName,
        changedBy: authUserName,
        oldChapter: oldChapter
      };

      commonServices.pushData('/logs/chapterLogs/memberTraffic/primaryChapter/' + oldChapter, logObj);
    };

    this.logUserRemovedFromSecondaryChapter = function(userName, authUserName, oldChapters) {
      _.each(oldChapters, function(oldChapter) {
        var ts = Date.now();
        var logObj = {
          type: 'secondary',
          status: 'removed',
          timeStamp: ts,
          userName: userName,
          changedBy: authUserName,
          oldChapter: oldChapter
        };

        commonServices.pushData('/logs/chapterLogs/memberTraffic/secondaryChapter/' + oldChapter, logObj);
      });
    };
    /************************************************************************************
     *              END - Primary and Scondary Chapter Change calls                     *
     ************************************************************************************/

  });
