'use strict';

describe('Controller: DonorsCtrl', function () {

  // load the controller's module
  beforeEach(module('ohanaApp'));

  var DonorsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DonorsCtrl = $controller('DonorsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DonorsCtrl.awesomeThings.length).toBe(3);
  });
});
