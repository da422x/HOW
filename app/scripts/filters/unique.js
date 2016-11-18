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

    };
  });
