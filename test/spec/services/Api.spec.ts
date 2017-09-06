//initializing a few global variables
let api;
let ezmoneySpy;

describe('Testing the Api service using spies', () => {

  beforeEach(() => {
    angular.mock.module('ohanaApp');

    inject(function($injector){
      api = $injector.get('Api');
      ezmoneySpy =spyOn($injector.get('Api'), 'ezmoney');
    })
  });

  it('should check that ezmoney was invoked', () => {
    api.ezmoney();
    expect(ezmoneySpy).toHaveBeenCalled();
  })
});
