'use strict';

/**
 * @ngdoc function
 * @name valeApp.controller:Homework4Ctrl
 * @description
 * # Homework4Ctrl
 * Controller of the valeApp
 */
angular.module('valeApp')
  .controller('Homework4Ctrl', function ($scope,$filter, $http, NgTableParams) {

  $scope.Characters=[{name:"Spider-man",id:"1010143"},{name:"Iron-man",id:"1009368"}];
  $scope.CharOneId={};
  $scope.CharTwoId={};

  $scope.ComicMatches=[{name:"Spider-man",id:"1010143"},{name:"Iron-man",id:"1009368"}/*,*/];

  $scope.SearchChar=function(){
    console.log('Hello World');
    $http({
      method: 'GET',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      /*Authorizer: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5VRTVNVE0wUlVNeVJUSTFRalZFTkRneU5UbERPRUUyTmpjeFJqVkJRVVJGUlRZMU9UZEZRdyJ9.eyJpc3MiOiJodHRwczovL3Z1YnouYXV0aDAuY29tLyIsInN1YiI6ImRISWF5c3lLVm9VcnFpeVlSQzlORE9zczhGT2ttUE9YQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3I4Nmk2MnRmd2UuZXhlY3V0ZS1hcGkudXMtZWFzdC0xLmFtYXpvbmF3cy5jb20vIiwiaWF0IjoxNTA3Njk3MjU2LCJleHAiOjE1MDc3ODM2NTYsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.eD8ho2QrtJwxYhKGRCUvrdISRdnoFaDYXMUFgqHE5pRVPyd_BjlGiPyrAdQ3fSqKJvcB6B6mvY5skYIGjUl9pxl-WJvqW1IU9n11TGB7V-CPN2Zqu7GhRI2lsGfCjmI2lZ0LtEU-tiVg4qABq3OsFXZBKm5dcWl9QIW_4vwzLLZJZuLhHuikdzXPdpJZPI5FIPkrNPIX2FzEnupLfQOYxS-azBg27z5mG2WOLMv7KSs5eFCXd83NoblP3tUqZH-8T6HpFQMH6sTH4IrmOmxmsst76ZahwYsvom3Vo8Hb5U3A-0-pcZ9UP98maZuDhkP6SHE1eM5BERaHrk1fNIMZ4A',
      */
      url: 'https://9rtc1faqh2.execute-api.us-east-1.amazonaws.com/Testing/getnames'
    }).then(function successCallback(response) {
      console.log("Done");
      //console.log(response);
      var temp=JSON.parse(response.data.body);
      $scope.Characters=temp;


    }, function errorCallback(response) {
      console.log('failure to retrieve Characters');
    });
  };
  $scope.SearchComics=function(){
    if ($scope.CharOneId > $scope.CharTwoId){
      var temp=$scope.CharTwoId;
      $scope.CharTwoId=$scope.CharOneId;
      $scope.CharOneId=temp;
    };
    //console.log($scope.CharTwoId);
    //console.log($scope.CharOneId);
    console.log('Hello World');
    $http({
      method: 'POST',
      url: 'https://9rtc1faqh2.execute-api.us-east-1.amazonaws.com/Testing/comics',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data:{'FirstId':$scope.CharOneId,'SecondId':$scope.CharTwoId}//,
      /*headers:{
        Authorizer : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5VRTVNVE0wUlVNeVJUSTFRalZFTkRneU5UbERPRUUyTmpjeFJqVkJRVVJGUlRZMU9UZEZRdyJ9.eyJpc3MiOiJodHRwczovL3Z1YnouYXV0aDAuY29tLyIsInN1YiI6ImRISWF5c3lLVm9VcnFpeVlSQzlORE9zczhGT2ttUE9YQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3I4Nmk2MnRmd2UuZXhlY3V0ZS1hcGkudXMtZWFzdC0xLmFtYXpvbmF3cy5jb20vIiwiaWF0IjoxNTA3Njk3MjU2LCJleHAiOjE1MDc3ODM2NTYsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.eD8ho2QrtJwxYhKGRCUvrdISRdnoFaDYXMUFgqHE5pRVPyd_BjlGiPyrAdQ3fSqKJvcB6B6mvY5skYIGjUl9pxl-WJvqW1IU9n11TGB7V-CPN2Zqu7GhRI2lsGfCjmI2lZ0LtEU-tiVg4qABq3OsFXZBKm5dcWl9QIW_4vwzLLZJZuLhHuikdzXPdpJZPI5FIPkrNPIX2FzEnupLfQOYxS-azBg27z5mG2WOLMv7KSs5eFCXd83NoblP3tUqZH-8T6HpFQMH6sTH4IrmOmxmsst76ZahwYsvom3Vo8Hb5U3A-0-pcZ9UP98maZuDhkP6SHE1eM5BERaHrk1fNIMZ4A'

        }
      */
    }).then(function successCallback(response) {
      console.log("Done");
      $scope.ComicMatches=JSON.parse(response.data.body);
      $http({
        method: 'POST',
        url: 'https://9rtc1faqh2.execute-api.us-east-1.amazonaws.com/Testing/series',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data:{'FirstId':$scope.CharOneId,'SecondId':$scope.CharTwoId}//,
        /*headers:{
          Authorizer : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5VRTVNVE0wUlVNeVJUSTFRalZFTkRneU5UbERPRUUyTmpjeFJqVkJRVVJGUlRZMU9UZEZRdyJ9.eyJpc3MiOiJodHRwczovL3Z1YnouYXV0aDAuY29tLyIsInN1YiI6ImRISWF5c3lLVm9VcnFpeVlSQzlORE9zczhGT2ttUE9YQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3I4Nmk2MnRmd2UuZXhlY3V0ZS1hcGkudXMtZWFzdC0xLmFtYXpvbmF3cy5jb20vIiwiaWF0IjoxNTA3Njk3MjU2LCJleHAiOjE1MDc3ODM2NTYsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.eD8ho2QrtJwxYhKGRCUvrdISRdnoFaDYXMUFgqHE5pRVPyd_BjlGiPyrAdQ3fSqKJvcB6B6mvY5skYIGjUl9pxl-WJvqW1IU9n11TGB7V-CPN2Zqu7GhRI2lsGfCjmI2lZ0LtEU-tiVg4qABq3OsFXZBKm5dcWl9QIW_4vwzLLZJZuLhHuikdzXPdpJZPI5FIPkrNPIX2FzEnupLfQOYxS-azBg27z5mG2WOLMv7KSs5eFCXd83NoblP3tUqZH-8T6HpFQMH6sTH4IrmOmxmsst76ZahwYsvom3Vo8Hb5U3A-0-pcZ9UP98maZuDhkP6SHE1eM5BERaHrk1fNIMZ4A'

          }
        */
      }).then(function successCallback(response) {
        console.log("Series");
        var temp=JSON.parse(response.data.body);
        for (var i = 0; i < temp.length; i++) {
          $scope.ComicMatches.push(response[i]);
        };

      }, function errorCallback(response) {
        console.log('failure to retrieve Series');
      });

    }, function errorCallback(response) {
      console.log('failure to retrieve Comics');
    });

  };
  $scope.SearchSeries=function () {
    if ($scope.CharOneId > $scope.CharTwoId){
      var temp=$scope.CharTwoId;
      $scope.CharTwoId=$scope.CharOneId;
      $scope.CharOneId=temp;
    };
    console.log("Hello");
    $http({
      method: 'POST',
      url: 'https://9rtc1faqh2.execute-api.us-east-1.amazonaws.com/Testing/series',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data:{'FirstId':$scope.CharOneId,'SecondId':$scope.CharTwoId}//,
      /*headers:{
        Authorizer : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5VRTVNVE0wUlVNeVJUSTFRalZFTkRneU5UbERPRUUyTmpjeFJqVkJRVVJGUlRZMU9UZEZRdyJ9.eyJpc3MiOiJodHRwczovL3Z1YnouYXV0aDAuY29tLyIsInN1YiI6ImRISWF5c3lLVm9VcnFpeVlSQzlORE9zczhGT2ttUE9YQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3I4Nmk2MnRmd2UuZXhlY3V0ZS1hcGkudXMtZWFzdC0xLmFtYXpvbmF3cy5jb20vIiwiaWF0IjoxNTA3Njk3MjU2LCJleHAiOjE1MDc3ODM2NTYsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.eD8ho2QrtJwxYhKGRCUvrdISRdnoFaDYXMUFgqHE5pRVPyd_BjlGiPyrAdQ3fSqKJvcB6B6mvY5skYIGjUl9pxl-WJvqW1IU9n11TGB7V-CPN2Zqu7GhRI2lsGfCjmI2lZ0LtEU-tiVg4qABq3OsFXZBKm5dcWl9QIW_4vwzLLZJZuLhHuikdzXPdpJZPI5FIPkrNPIX2FzEnupLfQOYxS-azBg27z5mG2WOLMv7KSs5eFCXd83NoblP3tUqZH-8T6HpFQMH6sTH4IrmOmxmsst76ZahwYsvom3Vo8Hb5U3A-0-pcZ9UP98maZuDhkP6SHE1eM5BERaHrk1fNIMZ4A'

        }
      */
    }).then(function successCallback(response) {
      console.log("Done");
      $scope.ComicMatches=JSON.parse(response.data.body)

    }, function errorCallback(response) {
      console.log('failure to retrieve Series');
    });

  };
  $scope.selectionChanged = function(idx) {
    $scope.CharOneId=idx;
    console.log(idx);
  };
  $scope.selectionChanged2 = function(idx) {
    $scope.CharTwoId=idx;
    console.log(idx);
  };

  $scope.tableParams = new NgTableParams({
      page: 1,
      count: 10
    }, {
      total: $scope.ComicMatches.length,
      getData: function (params) {
        $scope.data = params.sorting() ? $filter('orderBy')($scope.ComicMatches, params.orderBy()) : $scope.ComicMatches;
        $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
        $scope.data=$scope.ComicMatches.slice((params.page()-1) * params.count(),params.page() * params.count());
        return $scope.data
      }
      //dataset: $scope.ComicMatches
    });


});
