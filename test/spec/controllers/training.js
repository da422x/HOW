'use strict';

describe('Controller: TrainingCtrl', function () {

  // load the controller's module
  beforeEach(module('ohanaApp'));

  var TrainingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TrainingCtrl = $controller('TrainingCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TrainingCtrl.awesomeThings.length).toBe(3);
  });
});
