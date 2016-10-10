'use strict';

describe('Controller: ManageusersCtrl', function () {

  // load the controller's module
  beforeEach(module('mainAppApp'));

  var ManageusersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManageusersCtrl = $controller('ManageusersCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ManageusersCtrl.awesomeThings.length).toBe(3);
  });
});
