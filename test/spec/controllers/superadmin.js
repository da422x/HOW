'use strict';

describe('Controller: SuperadminCtrl', function () {

  // load the controller's module
  beforeEach(module('ohanaApp'));

  var SuperadminCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SuperadminCtrl = $controller('SuperadminCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SuperadminCtrl.awesomeThings.length).toBe(3);
  });
});
