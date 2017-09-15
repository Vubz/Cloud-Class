'use strict';

/**
 * @ngdoc function
 * @name valeApp.controller:PerformancechartCtrl
 * @description
 * # PerformancechartCtrl
 * Controller of the valeApp
 */
angular.module('valeApp')
  .controller('PerformancechartCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
var trace1 = {
  x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  y: [90, 95, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  type: 'scatter'
  };

var data = [trace1];

Plotly.newPlot('myDiv', data);
  });
