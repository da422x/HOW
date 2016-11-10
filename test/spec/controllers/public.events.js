'use strict';

describe('Controller: PublicEventsCtrl', function () {

  // load the controller's module
  beforeEach(module('ohanaApp'));

  var PublicEventsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PublicEventsCtrl = $controller('PublicEventsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PublicEventsCtrl.awesomeThings.length).toBe(3);
  });
});
