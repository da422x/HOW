'use strict';

describe('Controller: SignInCtrl', function () {

  // load the controller's module
  beforeEach(module('mainAppApp'));

  var SignInCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SignInCtrl = $controller('SignInCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SignInCtrl.awesomeThings.length).toBe(3);
  });
});
