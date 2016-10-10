'use strict';

/**
 * @ngdoc function
 * @name mainAppApp.controller:ManageusersCtrl
 * @description
 * # ManageusersCtrl
 * Controller of the mainAppApp
 */
angular.module('mainAppApp')
  .controller('ManageusersCtrl', ['commonServices', function (commonServices) {
    var mu = this;

	mu.newUser = {
		email: '',
		password: ''
	};

	mu.existUser = {
		email: '',
		password: ''
	};

	mu.sendUser = {
		email: ''
	}

	mu.verifyUser = {
		email: ''
	}

	mu.confUser = {
		code: '',
		newpassword: ''
	}

	mu.testuser = {
		name: 'test',
		email: 'test',
		birthdate: 'test'
	}

	mu.userNumber = '';

	mu.uid = '';

	mu.testNewUser = {
		name: '',
		email: '',
		birthdate: ''
	};

	mu.cu = 'test';

	mu.register = function(user) {
		commonServices.register(user);		
	};

	mu.signin = function(user) {
		commonServices.signin(user);
	};

	mu.signout = function() {
		commonServices.signout();
	};

	mu.passwordReset = function(user) {
		commonServices.sendPasswordReset(user);
	};

	mu.showUser = function(number) {
		var path = '/userData/' + number;
		var $promise = commonServices.getData(path);
		$promise.then(function(data){
			console.log(data);
			mu.testuser.name = data.name;
			mu.testuser.email = data.email;
			mu.testuser.birthdate = data.birthdate;
		});
	}

	mu.addUser = function(uid, user) {
		var path = '/userData/' + uid;
		commonServices.setData(path, user);
	}

	mu.currentUserEmail = function() {
		var cu = commonServices.getCurrentUserEmail();
		if (cu === '') {
			mu.cu = 'empty'
		}else{
			mu.cu = cu;
			console.log(cu);
		}
	}

  }]);
