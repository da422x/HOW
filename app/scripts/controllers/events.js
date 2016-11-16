'use strict';

/**
 * @ngdoc function
 * @name mainAppApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of the mainAppApp
 */
angular.module('mainAppApp')
.controller('EventsCtrl', function ($scope, $rootScope, commonServices) {
		'use strict';



        var e = commonServices.getPublicEvents()
        	.then(function(data){
        		$scope.eventList = data;
        		console.log(data);
        	});
		// $scope.isDetailView = false;
		// $scope.howEvent = {
		// 	currentEvent: null
		// };

		// $scope.$on('$locationChangeStart', function (event, next, current) {
		// 	if ($location.path() === '/manage/events') {
		// 		$scope.isDetailView = false;
		// 	}
		// });

		// $scope.update = function () {
		// 	Api.events.query().$promise.then(
		// 		function (response) {
		// 			$scope.eventList = response;
		// 			$scope.manageEvent = function (index) {
		// 				$scope.isDetailView = !$scope.isDetailView;
		// 				$scope.howEvent.currentEvent = $scope.eventList[index];
		// 				$location.path('/manage/events/details/description');
		// 			};
		// 		},
		// 		function (response) {}
		// 	);
		// };

		// // $scope.add = function () {
		// 	var modalInstance = $uibModal.open({
		// 		templateUrl: '/parts/newEventDirectoryForm.html',
		// 		controller: 'NewEventDirectoryFormCtrl'
		// 	});
		// 	if (!modalInstance) {
		// 		$scope.update();
		// 	}
		// };
	});