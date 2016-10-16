'use strict';

describe('Controller: UserRegistrationCtrl', function () {

  // load the controller's module
  beforeEach(module('mainAppApp'));

  var UserRegistrationCtrl,
    foo,
    scope;

  beforeEach(function(){
    foo = {
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
    	newpassword: '',
    	repeatpassword: ''
    }
  })

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserRegistrationCtrl = $controller('UserRegistrationCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UserRegistrationCtrl.newUser).toEqual(foo);
  });
});
