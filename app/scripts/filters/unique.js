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
<<<<<<< HEAD
    return function (input) {
      return 'unique filter: ' + input;
=======
    var res = [];
    return function (input, a) {
      if (Object.keys(input).length !== 0) {
        
        Object.keys(input).forEach(function(ele, idx, arr){
          if(res.indexOf(input[ele].Chapter) ==-1){
            res.push(input[ele].Chapter)
          }
        })
        console.log(res);
        return input
      }
      else
        return false;

>>>>>>> 9947ddccd66b04338b4d5a83c6a773c554d479d9
    };
  });
