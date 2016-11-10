'use strict';

describe('Directive: masterFooter', function () {

  // load the directive's module
  beforeEach(module('ohanaApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<master-footer></master-footer>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the footer directive');
  }));
});
