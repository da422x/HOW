'use strict';

describe('Controller: DashManageCtrl', function () {

  // load the controller's module
  beforeEach(module('ohanaApp'));

  var DashManageCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DashManageCtrl = $controller('DashManageCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DashManageCtrl.awesomeThings.length).toBe(3);
  });
});
