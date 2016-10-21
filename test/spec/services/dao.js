'use strict';

describe('Service: DAO', function () {

  // load the service's module
  beforeEach(module('mainAppApp'));

  // instantiate service
  var DAO;
  beforeEach(inject(function (_DAO_) {
    DAO = _DAO_;
  }));

  it('should do something', function () {
    expect(!!DAO).toBe(true);
  });

});
