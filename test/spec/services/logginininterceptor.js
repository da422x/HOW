'use strict';

describe('Service: logginInInterceptor', function () {

  // load the service's module
  beforeEach(module('mainAppApp'));

  // instantiate service
  var logginInInterceptor;
  beforeEach(inject(function (_logginInInterceptor_) {
    logginInInterceptor = _logginInInterceptor_;
  }));

  it('should do something', function () {
    expect(!!logginInInterceptor).toBe(true);
  });

});
