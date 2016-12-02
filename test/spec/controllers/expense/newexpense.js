'use strict';

describe('Controller: NewexpenseCtrl', function () {

  // load the controller's module
  beforeEach(module('ohanaApp'));

  var NewexpenseCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewexpenseCtrl = $controller('NewexpenseCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NewexpenseCtrl.awesomeThings.length).toBe(3);
  });
});
