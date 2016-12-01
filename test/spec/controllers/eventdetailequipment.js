'use strict';

describe('Controller: EventdetailequipmentCtrl', function () {

  // load the controller's module
  beforeEach(module('ohanaApp'));

  var EventdetailequipmentCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EventdetailequipmentCtrl = $controller('EventdetailequipmentCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EventdetailequipmentCtrl.awesomeThings.length).toBe(3);
  });
});
