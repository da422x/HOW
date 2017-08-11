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
//ready some global variables that we will initialize later
let controller;
let $scope; 
let $rootScope;
let api;
let spyOnApiService;

describe('Testing the public events controller directlys', function(){
  beforeEach(function(){
    module('ohanaApp');

    //prepare the necessary injections
    inject(function($controller, $injector){
      $rootScope = $injector.get('$rootScope');
      api = $injector.get('Api');
      spyOnApiService = spyOn($injector.get('Api') , 'ezmoney');
      $scope = $rootScope.$new();
      controller = $injector.get('$controller')('PublicEventsCtrl', {$scope: $scope})
    });
  });

  beforeEach(function(){
    console.log('hello world');
  });

  it('should check that the sample method returns a hardcoded 5', function(){
    console.log('hai there');
    expect($scope.testingTester()).toEqual(5);
  });


})

  describe('Spoofing the api service to test $scope calls against injected services', function(){
    beforeEach(function(){
      module('ohanaApp');

      inject(function($injector){
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        
        controller = $injector.get('$controller')('PublicEventsCtrl', {
          $scope: $scope,
          Api: {
            getme: function(){
              return 12;
            }
          }
        });
        
      });
    });

      it('should spoof the api service for a simple equality test', function(){
        expect($scope.testingTester2()).toEqual(12);
      });
  });

}