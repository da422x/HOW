'use strict';

describe('Service: dataGridUtil', function () {

  // load the service's module
  beforeEach(module('ohanaApp'));

  // instantiate service
  var dataGridUtil;
  beforeEach(inject(function (_dataGridUtil_) {
    dataGridUtil = _dataGridUtil_;
  }));

  it('should do something', function () {
    expect(!!dataGridUtil).toBe(true);
  });

});
