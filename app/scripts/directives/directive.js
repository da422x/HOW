'use strict';

/**
 * @ngdoc directive
 * @name ohanaApp.directive:directive
 * @description
 * # directive
 */
angular.module('ohanaApp')
  .directive('connectToQuickbooks', function($window) {
    return {
      restrict: 'E',
      template: "<ipp:connectToIntuit></ipp:connectToIntuit>",
      link: function(scope) {
        var script = $window.document.createElement("script");
        script.type = "text/javascript";
        script.src = "//js.appcenter.intuit.com/Content/IA/intuit.ipp.anywhere.js";
        script.onload = function() {
          scope.$emit('intuitjs:loaded');
        };
        $window.document.body.appendChild(script);
        scope.$on('intuitjs:loaded', function(evt) {
          $window.intuit.ipp.anywhere.setup({
            grantUrl: '/'
          });
          scope.connected = true;
          scope.$apply();
        });
      }
    }
  });
