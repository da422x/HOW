'use strict';

describe('Controller: ExpenseCustomdaterangeCtrl', function () {

  // load the controller's module
  beforeEach(module('ohanaApp'));

  var ExpenseCustomdaterangeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExpenseCustomdaterangeCtrl = $controller('ExpenseCustomdaterangeCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ExpenseCustomdaterangeCtrl.awesomeThings.length).toBe(3);
  });
});
