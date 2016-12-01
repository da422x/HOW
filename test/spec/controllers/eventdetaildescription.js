'use strict';

describe('Controller: EventdetaildescriptionCtrl', function () {

  // load the controller's module
  beforeEach(module('ohanaApp'));

  var EventdetaildescriptionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EventdetaildescriptionCtrl = $controller('EventdetaildescriptionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EventdetaildescriptionCtrl.awesomeThings.length).toBe(3);
  });
});
