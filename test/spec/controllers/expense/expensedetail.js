'use strict';

describe('Controller: ExpensedetailCtrl', function () {

  // load the controller's module
  beforeEach(module('ohanaApp'));

  var ExpensedetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExpensedetailCtrl = $controller('ExpensedetailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ExpensedetailCtrl.awesomeThings.length).toBe(3);
  });
});
