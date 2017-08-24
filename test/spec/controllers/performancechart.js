'use strict';

describe('Controller: PerformancechartCtrl', function () {

  // load the controller's module
  beforeEach(module('valeApp'));

  var PerformancechartCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PerformancechartCtrl = $controller('PerformancechartCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PerformancechartCtrl.awesomeThings.length).toBe(3);
  });
});
