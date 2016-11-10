'use strict';

describe('Controller: NewuserdirectoryformCtrl', function () {

  // load the controller's module
  beforeEach(module('ohanaApp'));

  var NewuserdirectoryformCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewuserdirectoryformCtrl = $controller('NewuserdirectoryformCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NewuserdirectoryformCtrl.awesomeThings.length).toBe(3);
  });
});
