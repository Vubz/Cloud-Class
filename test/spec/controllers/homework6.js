'use strict';

describe('Controller: Homework6Ctrl', function () {

  // load the controller's module
  beforeEach(module('valeApp'));

  var Homework6Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Homework6Ctrl = $controller('Homework6Ctrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(Homework6Ctrl.awesomeThings.length).toBe(3);
  });
});
