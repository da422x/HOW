'use strict';

describe('Controller: ChaptersCtrl', function () {

  // load the controller's module
  beforeEach(module('ohanaApp'));

  var ChaptersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChaptersCtrl = $controller('ChaptersCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ChaptersCtrl.awesomeThings.length).toBe(3);
  });
});
