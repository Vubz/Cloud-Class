'use strict';

describe('Controller: Homework3Ctrl', function () {

  // load the controller's module
  beforeEach(module('valeApp'));

  var Homework3Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Homework3Ctrl = $controller('Homework3Ctrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(Homework3Ctrl.awesomeThings.length).toBe(3);
  });
});
