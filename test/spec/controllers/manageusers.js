'use strict';

describe('Controller: ManageusersCtrl', function () {
  MockFirebase.override();

  // load the controller's module
  beforeEach(module('mainAppApp'));

  var ManageusersCtrl,
    firebaseRef,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $firebaseObject) {
    scope = $rootScope.$new();
    ManageusersCtrl = $controller('ManageusersCtrl', {
      $scope: scope,
      $firebaseObject: $firebaseObject
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    var keys = Object.keys(ManageusersCtrl.newUser)
    expect(keys.length).toBe(2);
  });
});
