'use strict';

describe('Controller: ExpenseExpenseconfigCtrl', function () {

  // load the controller's module
  beforeEach(module('ohanaApp'));

  var ExpenseExpenseconfigCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExpenseExpenseconfigCtrl = $controller('ExpenseExpenseconfigCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ExpenseExpenseconfigCtrl.awesomeThings.length).toBe(3);
  });
});
