'use strict';

describe('Service: pageauthinterceptor', function () {

  // load the service's module
  beforeEach(module('ohanaApp'));

  // instantiate service
  var pageauthinterceptor;
  beforeEach(inject(function (_pageauthinterceptor_) {
    pageauthinterceptor = _pageauthinterceptor_;
  }));

  it('should do something', function () {
    expect(!!pageauthinterceptor).toBe(true);
  });

});
