//loading modules for intellisense using typescript 1 style. it's 
//confusing I know... still trying to figure out how to get 
//import style to work. 
/// <reference path="../../../node_modules/@types/angular/index.d.ts" />
/// <reference path="../../../node_modules/@types/angular-mocks/index.d.ts" />

//for readings about the next import, 
//refer here: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/7793
/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />

//begin test
//suppress the warning about module(not sure how angular-mocks typescript definition missed that one)
declare var module;

//this big random brace is an es6 thing I promise!
//I'm basically doing this so I don't have to rename 
//let api across every test file
{
//initializing a few global variables
let api;
let ezmoneySpy;
describe('Testing the Api service using spies', function(){

  beforeEach(function(){
    module('ohanaApp');

    inject(function($injector){
      api = $injector.get('Api');
      ezmoneySpy =spyOn($injector.get('Api'), 'ezmoney');
    })
  });

  it('should check that ezmoney was invoked', function(){
    api.ezmoney();
    expect(ezmoneySpy).toHaveBeenCalled();
  })
});
}