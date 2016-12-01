'use strict';

describe('Controller: EventdetailvolunteersCtrl', function () {

  // load the controller's module
  beforeEach(module('ohanaApp'));

  var EventdetailvolunteersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EventdetailvolunteersCtrl = $controller('EventdetailvolunteersCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EventdetailvolunteersCtrl.awesomeThings.length).toBe(3);
  });
});
