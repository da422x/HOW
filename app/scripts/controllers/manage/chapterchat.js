'use strict';

/**
 * @ngdoc function
 * @name ohanaApp.controller:ManageChapterchatCtrl
 * @description
 * # ManageChapterchatCtrl
 * Controller of the ohanaApp
 */
angular.module('ohanaApp')
    .controller('ManageChapterchatCtrl', function($scope, $rootScope, $q, commonServices, userService) {

        $scope.$watch('chatLog', function() {
            $('.panel-body').animate({
                scrollTop: $('.panel-body').get(0).scrollHeight
            });
        }, true);

        $scope.init = function() {
            var userData = userService.getUserData();
            $scope.newMessage = '';
            $scope.chatLog = [];
            $scope.chapterOptions = {};
            $scope.AllChapterData = [];
            $scope.chapterOptions[userData.Chapter.key] = userData.Chapter.text;
            $scope.AllChapterData.push(userData.Chapter);
            _.each(userData.Chapters, function(secondary) {
                $scope.chapterOptions[secondary.chapter.key] = secondary.chapter.text;
                $scope.AllChapterData.push(secondary.chapter);
            });
            $scope.loadChapterChat(userData.Chapter.key);
        };

        $scope.loadChapterChat = function(usersChapter) {
            var getLog = commonServices.getData('/chat/chapters/' + usersChapter);
            $scope.currentChapter = _.find($scope.AllChapterData, function(c) {
                return c.key === usersChapter;
            });

            $q.all([getLog]).then(function(data) {
                $scope.chatLog = _.sortBy(data[0], ['time']);
                firebase.database().ref('/chat/chapters/' + usersChapter)
                    .on('value', function(snapshot) {
                        $scope.chatLog = _.sortBy(snapshot.val(), ['time']);
                        var kyz = Object.keys(snapshot.val());
                        var lastObj = snapshot.val()[kyz[kyz.length - 1]];
                        if (lastObj.userId !== $rootScope.userId) {
                            $scope.$apply();
                        }
                    });
            });
        }

        $scope.changeChapter = function() {
            swal({
                title: 'Switch Chapter',
                input: 'select',
                inputOptions: $scope.chapterOptions
            }).then(function(option) {
                $scope.loadChapterChat(option);
                swal({
                    type: 'success',
                    title: 'Switched chapters!'
                });
            });;
        };

        $scope.sendMessage = function() {
            var messageData = {};
            messageData.userId = userService.getId();
            messageData.name = userService.getUserName();
            messageData.time = Date.now();
            messageData.message = $scope.newMessage;
            commonServices.pushData('/chat/chapters/' + $scope.currentChapter.key, messageData);
            $scope.newMessage = '';
        };

    });
