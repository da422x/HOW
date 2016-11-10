'use strict';

describe('Controller: DirectoryCtrl', function () {

  // load the controller's module
  beforeEach(module('ohanaApp'));

  var DirectoryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DirectoryCtrl = $controller('DirectoryCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DirectoryCtrl.awesomeThings.length).toBe(3);
  });
});
