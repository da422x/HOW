'use strict';

/**
 * @ngdoc function
 * @name mainAppApp.controller:UserRegistrationCtrl
 * @description
 * # UserRegistrationCtrl
 * Controller of the mainAppApp
 */
angular.module('mainAppApp')
  .controller('UserRegistrationCtrl',['commonServices', function (commonServices) {
    var user = this;

    user.newUser = {
    	uid: '123',
    	name: {
    		first: '',
    		last: ''
    	},
    	address : {
    		line1: '',
    		line2: '',
    		city: '',
    		state: '',
    		zip: ''
    	},
    	phone: '',
    	email: '',
    	sex: '',
    	dob: '',
    	branch: '',
    	years: '',
    	emergency: {
    		name: '',
    		phone: ''
    	},
    	newpassword: '',
    	repeatpassword: ''
    }

    user.registerUser = function(data) {
    	if (data.newpassword === data.repeatpassword) {
    		var p1 = {};
    		commonServices.register(data);
    		user.newUser = {};
    	} else {
    		console.log('Passwords do not match...');
    	}
    };

  }]);
