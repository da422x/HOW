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
    	gender: '',
    	dob: '',
    	branch: '',
    	years: '',
    	emergency: {
    		name: '',
    		phone: ''
    	},
    	password: '',
    	repeatpassword: ''
    }

    user.statList = [

    ];

    user.registerUser = function(data) {
    	if (data.password === data.repeatpassword) {
    		commonServices.register(data);
    		user.newUser = {role: 'Participant'};
    	} else {
    		console.log('Passwords do not match...');
    	}
    };

  }]);
