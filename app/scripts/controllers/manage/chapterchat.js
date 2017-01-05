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
        	 $('.panel-body').animate({scrollTop: $('.panel-body').get(0).scrollHeight});
        });

        $scope.init = function() {
            var usersChapter = $rootScope.userChapter;
            var getLog = firebase.database().ref('/chat/chapters/' + usersChapter)
	            .on('value', function(snapshot) {
	                $scope.chatLog = _.sortBy(snapshot.val(), ['time']);
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
