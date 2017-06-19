/// <reference path="../../../node_modules/@types/angular/index.d.ts" />
/// <reference path="../../../node_modules/@types/angular-mocks/index.d.ts" />

//for readings about the next import, 
//refer here: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/7793
/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />


describe('first one', function(){
  beforeEach(function(){
    console.log('hello world');
  });

  it('should just work', function(){
    expect(5).toBe(5);
  })
})

// angular.module("hai", []).controller('hai2', function(){

// })