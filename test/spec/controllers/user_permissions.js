'use strict';

describe('Controller: UserPermissionsCtrl', function () {

  // load the controller's module
  beforeEach(module('mainAppApp'));

  var UserPermissionsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserPermissionsCtrl = $controller('UserPermissionsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UserPermissionsCtrl.awesomeThings.length).toBe(3);
  });
});
