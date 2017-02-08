'use strict';

describe('Controller: ExpenseOverviewCtrl', function () {

  // load the controller's module
  beforeEach(module('ohanaApp'));

  var ExpenseOverviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExpenseOverviewCtrl = $controller('ExpenseOverviewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ExpenseOverviewCtrl.awesomeThings.length).toBe(3);
  });
});
