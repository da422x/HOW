'use strict';

/**
 * @ngdoc filter
 * @name mainAppApp.filter:unique
 * @function
 * @description
 * # unique
 * Filter in the mainAppApp.
 */
angular.module('mainAppApp')
  .filter('unique', function () {
    return function (input) {
      return 'unique filter: ' + input;
    };
  });
