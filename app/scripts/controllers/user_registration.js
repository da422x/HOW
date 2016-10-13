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
    	sex: '',
    	dob: '',
    	branch: '',
    	years: '',
    	emergency: {
    		name: '',
    		phone: ''
    	},
    	newpassword: '',
    	repeatpassword: '',
    	role: 'Participant'
    }

    user.statList = [

    ];

    user.registerUser = function(data) {
    	if (data.newpassword === data.repeatpassword) {
    		commonServices.register(data);
    		user.newUser = {role: 'Participant'};
    	} else {
    		console.log('Passwords do not match...');
    	}
    };

  }]);
