'use strict';

describe('Controller: Homework5Ctrl', function () {

  // load the controller's module
  beforeEach(module('valeApp'));

  var Homework5Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Homework5Ctrl = $controller('Homework5Ctrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(Homework5Ctrl.awesomeThings.length).toBe(3);
  });
});
