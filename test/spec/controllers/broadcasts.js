'use strict';

describe('Controller: BroadcastsCtrl', function () {

  // load the controller's module
  beforeEach(module('ohanaApp'));

  var BroadcastsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BroadcastsCtrl = $controller('BroadcastsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BroadcastsCtrl.awesomeThings.length).toBe(3);
  });
});
