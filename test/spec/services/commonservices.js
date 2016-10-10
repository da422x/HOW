'use strict';

describe('Service: commonServices', function () {

  // load the service's module
  beforeEach(module('mainAppApp'));

  // instantiate service
  var commonServices;
  beforeEach(inject(function (_commonServices_) {
    commonServices = _commonServices_;
  }));

  it('should do something', function () {
    expect(!!commonServices).toBe(true);
  });

});
