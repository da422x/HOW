'use strict';

describe('Service: commonservices', function () {

  // load the service's module
  beforeEach(module('ohanaApp'));

  // instantiate service
  var commonservices;
  beforeEach(inject(function (_commonservices_) {
    commonservices = _commonservices_;
  }));

  it('should do something', function () {
    expect(!!commonservices).toBe(true);
  });

});
