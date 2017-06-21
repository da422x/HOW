//loading modules for intellisense using typescript 1 style. it's 
//confusing I know... still trying to figure out how to get 
//import style to work. 
/// <reference path="../../../node_modules/@types/angular/index.d.ts" />
/// <reference path="../../../node_modules/@types/angular-mocks/index.d.ts" />
/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />
//this big random brace is an es6 thing I promise!
//I'm basically doing this so I don't have to rename 
//let api across every test file
{
    //ready some global variables that we will initialize later
    var controller_1;
    var $scope_1;
    var $rootScope_1;
    var api_1;
    var spyOnApiService_1;
    describe('Testing the public events controller directlys', function () {
        beforeEach(function () {
            module('ohanaApp');
            //prepare the necessary injections
            inject(function ($controller, $injector) {
                $rootScope_1 = $injector.get('$rootScope');
                api_1 = $injector.get('Api');
                spyOnApiService_1 = spyOn($injector.get('Api'), 'ezmoney');
                $scope_1 = $rootScope_1.$new();
                controller_1 = $injector.get('$controller')('PublicEventsCtrl', { $scope: $scope_1 });
            });
        });
        beforeEach(function () {
            console.log('hello world');
        });
        it('should check that the sample method returns a hardcoded 5', function () {
            console.log('hai there');
            expect($scope_1.testingTester()).toEqual(5);
        });
    });
    describe('Spoofing the api service to test $scope calls against injected services', function () {
        beforeEach(function () {
            module('ohanaApp');
            inject(function ($injector) {
                $rootScope_1 = $injector.get('$rootScope');
                $scope_1 = $rootScope_1.$new();
                controller_1 = $injector.get('$controller')('PublicEventsCtrl', {
                    $scope: $scope_1,
                    Api: {
                        getme: function () {
                            return 12;
                        }
                    }
                });
            });
        });
        it('should spoof the api service for a simple equality test', function () {
            expect($scope_1.testingTester2()).toEqual(12);
        });
    });
}
