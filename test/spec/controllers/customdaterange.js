'use strict';

describe('Controller: CustomdaterangeCtrl', function () {

  // load the controller's module
  beforeEach(module('ohanaApp'));

  var CustomdaterangeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CustomdaterangeCtrl = $controller('CustomdaterangeCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CustomdaterangeCtrl.awesomeThings.length).toBe(3);
  });
});
