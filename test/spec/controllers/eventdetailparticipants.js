'use strict';

describe('Controller: EventdetailparticipantsCtrl', function () {

  // load the controller's module
  beforeEach(module('ohanaApp'));

  var EventdetailparticipantsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EventdetailparticipantsCtrl = $controller('EventdetailparticipantsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EventdetailparticipantsCtrl.awesomeThings.length).toBe(3);
  });
});
