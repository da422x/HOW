'use strict';

/**
 * @ngdoc service
 * @name mainAppApp.pageAuthInterceptor
 * @description
 * # pageAuthInterceptor
 * Factory in the mainAppApp.
 */
angular.module('ohanaApp')
  .factory('pageAuthInterceptor', ['$q', '$rootScope', function ($q, $rootScope) {

    // Performs an action based on the page request.
    var requestInterceptor = {
        request: function(config) {
            switch(config.url) {
              case 'views/sign_in.html':
                console.log('Sign In');
                break;

              case 'views/user_registration.html':
                console.log('Registration');
                break;

              // Cant be accessed without being and admin.
              case 'views/user_permissions.html':
                if ($rootScope.userRole !== 'admin') {
                  window.location.replace('/');
                  console.log('Not Authorized!');
                }else{
                  console.log('User Management');
                }
                break;

              default:
                console.log('Main');
                break;
            }
            return config;//deferred.promise;
        }
    };
    return requestInterceptor;
  }]);
