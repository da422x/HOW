'use strict';

/**
 * @ngdoc service
 * @name mainAppApp.pageAuthInterceptor
 * @description
 * # pageAuthInterceptor
 * Factory in the mainAppApp.
 */
angular.module('ohanaApp').factory('pageAuthInterceptor', [
  '$q',
  '$rootScope',
  function($q, $rootScope) {
    // Performs an action based on the page request.
    var requestInterceptor = {
      request: function(config) {
        if (!$rootScope.sessionState &&
          config.url.indexOf('views/manage') !== -1
        ) {
          // console.log($rootScope, config);
          // for(var section in $rootScope){
          //   if($rootScope.hasOwnProperty(section)){
          //     console.log(section, $rootScope[section]);
          //   }
          // }
          // for(var section2 in config){
          //   if(config.hasOwnProperty(section2)){
          //     console.log(section2, config[section2]);
          //   }
          // }
          location.replace('/');
          config.url = 'views/home.html';
        }

        return config;
      },
    };
    return requestInterceptor;
  },
]);
