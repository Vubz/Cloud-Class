'use strict';

describe('Controller: Homework4Ctrl', function () {

  // load the controller's module
  beforeEach(module('valeApp'));

  var Homework4Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Homework4Ctrl = $controller('Homework4Ctrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(Homework4Ctrl.awesomeThings.length).toBe(3);
  });
});
