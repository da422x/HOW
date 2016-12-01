'use strict';

describe('Controller: HoursCtrl', function () {

  // load the controller's module
  beforeEach(module('ohanaApp'));

  var HoursCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HoursCtrl = $controller('HoursCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HoursCtrl.awesomeThings.length).toBe(3);
  });
});
