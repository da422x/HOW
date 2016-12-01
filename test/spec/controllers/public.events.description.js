'use strict';

describe('Controller: PublicEventsDescriptionCtrl', function () {

  // load the controller's module
  beforeEach(module('ohanaApp'));

  var PublicEventsDescriptionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PublicEventsDescriptionCtrl = $controller('PublicEventsDescriptionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PublicEventsDescriptionCtrl.awesomeThings.length).toBe(3);
  });
});
