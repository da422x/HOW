'use strict';

describe('Service: expenseservice', function () {

  // load the service's module
  beforeEach(module('ohanaApp'));

  // instantiate service
  var expenseservice;
  beforeEach(inject(function (_expenseservice_) {
    expenseservice = _expenseservice_;
  }));

  it('should do something', function () {
    expect(!!expenseservice).toBe(true);
  });

});
