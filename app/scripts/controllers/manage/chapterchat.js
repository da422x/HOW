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
            $scope.update();
        });

        $scope.update = function() {
            var usersChapter = $rootScope.userChapter;
            var getLog = commonServices.getData('/chat/chapters/' + usersChapter);

            $q.all([getLog]).then(function(data) {
                console.log(data[0]);
                $scope.chatLog = _.sortBy(data[0], ['time']);
                console.log($scope.chatLog);
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
        };

    });
