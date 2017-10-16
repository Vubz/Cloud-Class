'use strict';

/**
 * @ngdoc overview
 * @name valeApp
 * @description
 * # valeApp
 *
 * Main module of the application.
 */
angular
  .module('valeApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    //'ui.bootstrap'
    'ui.select',
    'ngTable'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/homework', {
        templateUrl: 'views/homework.html',
        controller: 'HomeworkCtrl',
        controllerAs: 'homework'
      })
      .when('/performancechart', {
        templateUrl: 'views/performancechart.html',
        controller: 'PerformancechartCtrl',
        controllerAs: 'performancechart'
      })
      .when('/homework3', {
        templateUrl: 'views/homework3.html',
        controller: 'Homework3Ctrl',
        controllerAs: 'homework3'
      })
      .when('/homework4', {
        templateUrl: 'views/homework4.html',
        controller: 'Homework4Ctrl',
        controllerAs: 'homework4'
      })
      .when('/homework5', {
        templateUrl: 'views/homework5.html',
        controller: 'Homework5Ctrl',
        controllerAs: 'homework5'
      })
      .when('/homework6', {
        templateUrl: 'views/homework6.html',
        controller: 'Homework6Ctrl',
        controllerAs: 'homework6'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
