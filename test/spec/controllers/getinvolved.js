'use strict';

describe('Controller: GetinvolvedCtrl', function () {

  // load the controller's module
  beforeEach(module('ohanaApp'));

  var GetinvolvedCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GetinvolvedCtrl = $controller('GetinvolvedCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(GetinvolvedCtrl.awesomeThings.length).toBe(3);
  });
});
