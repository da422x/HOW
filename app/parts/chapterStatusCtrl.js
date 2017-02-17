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

        $scope.initialize = function() {
            var currentLogData = commonServices.getData('logs/chapterChanges');
            $q.all([currentLogData]).then(function(data) {
                $scope.currentLog = $scope.formatLogs(data[0]);
            });

        }

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
            $rootScope.$broadcast('modalClosing');
        };

        $scope.formatLogs = function(data) {
            var newLog = [];
            var msg, packet;
            _.each(data, function(n) {
                packet = {
                    msg: '',
                    ts: n.timeStamp
                }
                if (n.type === 'primary') {
                    packet.msg += n.userName + ' ';
                    if (n.changedBy) {
                        packet.msg += 'Primary Chapter was switched by ' + n.changedBy + ' from ';
                    } else {
                        packet.msg += 'switched Primary Chapter from ';
                    }
                    packet.msg += n.oldChapter + ' to ' + n.newChapter;
                } else if (n.type === 'secondary') {
                    packet.msg += n.userName + ' ';
                    if (n.changedBy) {
                        packet.msg += 'Secondary Chapter(s) was modified by ' + n.changedBy + ': ';
                    } else {
                        packet.msg += 'Secondary Chapter(s) was modified : ';
                    }

                    if (n.oldChapters) {
                        packet.msg += 'Removed: ';
                        _.each(n.oldChapters, function(c) {
                            packet.msg += c + ', ';
                        });
                    }

                    if (n.newChapters) {
                        packet.msg += 'Added: ';
                        _.each(n.newChapters, function(c) {
                            packet.msg += c + ', ';
                        });
                    }
                } else {
                    console.log('Invalid Type.....');
                }

                newLog.push(packet);

            });
            return newLog.reverse();
        }
    });
