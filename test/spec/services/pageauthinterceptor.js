'use strict';

describe('Service: pageAuthInterceptor', function () {

  // load the service's module
  beforeEach(module('mainAppApp'));

  // instantiate service
  var pageAuthInterceptor;
  beforeEach(inject(function (_pageAuthInterceptor_) {
    pageAuthInterceptor = _pageAuthInterceptor_;
  }));

  it('should do something', function () {
    expect(!!pageAuthInterceptor).toBe(true);
  });

});
