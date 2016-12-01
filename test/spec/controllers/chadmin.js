'use strict';

describe('Controller: ChadminCtrl', function () {

  // load the controller's module
  beforeEach(module('ohanaApp'));

  var ChadminCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChadminCtrl = $controller('ChadminCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ChadminCtrl.awesomeThings.length).toBe(3);
  });
});
