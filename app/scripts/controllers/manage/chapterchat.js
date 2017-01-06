'use strict';

/**
 * @ngdoc function
 * @name ohanaApp.controller:ManageChapterchatCtrl
 * @description
 * # ManageChapterchatCtrl
 * Controller of the ohanaApp
 */
angular.module('ohanaApp')
    .controller('ManageChapterchatCtrl', function($scope, $rootScope, $q, commonServices) {

        $scope.newMessage = '';

        $scope.chatLog = [];

        $scope.$watch('chatLog', function() {
            $('.panel-body').animate({
                scrollTop: $('.panel-body').get(0).scrollHeight
            });
        }, true);

        $scope.init = function() {
            var usersChapter = $rootScope.userChapter;
            var getLog = commonServices.getData('/chat/chapters/' + usersChapter);

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

        };

        $scope.sendMessage = function() {
            var messageData = {};
            var usersChapter = $rootScope.userChapter;
            messageData.userId = $rootScope.userId;
            messageData.name = $rootScope.userName;
            messageData.time = Date.now();
            messageData.message = $scope.newMessage;
            commonServices.pushData('/chat/chapters/' + usersChapter, messageData);
            $scope.newMessage = '';
        };

    });
