'use strict';

describe('Service: howLogService', function () {

  // load the service's module
  beforeEach(module('ohanaApp'));

  // instantiate service
  var howLogService;
  beforeEach(inject(function (_howLogService_) {
    howLogService = _howLogService_;
  }));

  it('should do something', function () {
    expect(!!howLogService).toBe(true);
  });

});
