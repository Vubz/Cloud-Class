'use strict';
var AWS = require("aws-sdk");
const DynamoDB= new AWS.DynamoDB();
const CloudWatchLogs= new AWS.CloudWatchLogs();
require('string_format');
var http = require('https');
var crypto = require('crypto');
var async = require("async");

var apiKey_Public='';
var apiKey_Private='';
var uri = 'https://gateway.marvel.com/v1/public/characters/{0}?apikey={1}&ts={2}&hash={3}';
var apikey = apiKey_Public;
var TS = new Date().getTime();
var hash = crypto.createHash('md5').update(TS + apiKey_Private + apiKey_Public).digest('hex');
module.exports.get = (event, context, callback) => {
  var firstCharacterGetComicsUrl= uri.format(event.FirstId,apikey,TS,hash);
  var secondCharacterGetComicsUrl= uri.format(event.SecondId,apikey,TS,hash);

  async.parallel([
    function (callback) {
      async.waterfall([
        async.apply(getCharacterComicsSimple,firstCharacterGetComicsUrl)]
      ,callback)
    },
    function (callback) {
      async.waterfall([
        async.apply(getCharacterComicsSimple,secondCharacterGetComicsUrl)]
      ,callback)
    },
    function (callback) {
      async.waterfall([
        async.apply(getLastLogInfo)]
      ,callback)
    }
  ],
  function (err,results) {
    console.log(results);
    var params = {
      Item: {
       "Id": {
         S: event.Id
        },
       "StartTime": {
         S: event.StartTime
        },
       "EndTime": {
         S: event.EndTime
        },
       "SingleQuantity": {
         S: event.SingleQuantity
        },
       "CharacterOne": {
         S: results[0]
        },
       "CharacterTwo": {
         S: results[1]
        },
       "MemoryReserved": {
         S: results[2][0].toString()+" MB"
        },
       "MemoryUsed": {
          S: results[2][1].toString()+" MB"
         }
      },
      ReturnConsumedCapacity: "TOTAL",
      TableName: "vubz-marvel-table"
     };
     DynamoDB.putItem(params, function(err, data) {
       if (err) console.log(err, err.stack); // an error occurred
       else     console.log(data);           // successful response
     });

  });
};

var getLastLogInfo=function (callback) {
  var params = {
  logGroupName: '/aws/lambda/vubz-dev-manager', /* required */
  descending: true,
  limit: 1,
  orderBy:  'LastEventTime'
  };
  CloudWatchLogs.describeLogStreams(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     {
      //console.log(data);
      console.log(data.logStreams[0].logStreamName);
      var params = {
        logGroupName: '/aws/lambda/vubz-dev-manager', /* required */
        logStreamName: data.logStreams[0].logStreamName, /* required */
        limit: 2,
        startFromHead: false
      };
      CloudWatchLogs.getLogEvents(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     {
          console.log(data);
          var temp = data.events[1].message.split(" ")
          console.log(temp[10],temp[14]);
          var results=[];
          results.push(temp[10]);
          results.push(temp[14]);
          callback(null,results)
        }           // successful response
      });
    }
  });
};
var getCharacterComicsSimple = function (getUrl,callback) {

  var resultsTotal;
  http.get(getUrl,(res) => {
    res.setEncoding('utf8');
    var totalData="";

    res.on('data',(data)=>{

      totalData+=data;
      //console.log(data);
    });
    res.on('end',(data)=>{
      var results = JSON.parse(totalData);
      //console.log(results);
      if(results["data"]){
        //console.log(results);
        resultsTotal=results["data"]["results"][0]["description"];

      }

      //console.log(comicTotal);
      callback(null,resultsTotal);

    });
  });
};
