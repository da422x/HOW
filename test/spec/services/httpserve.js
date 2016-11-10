'use strict';

describe('Service: httpserve', function () {

  // load the service's module
  beforeEach(module('demoappApp'));

  // instantiate service
  var httpserve;
  beforeEach(inject(function (_httpserve_) {
    httpserve = _httpserve_;
  }));

  it('should do something', function () {
    expect(!!httpserve).toBe(true);
  });

});
