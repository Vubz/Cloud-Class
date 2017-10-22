'use strict';
var async = require("async");
var AWS = require("aws-sdk");
var lambda = new AWS.Lambda({"region":"us-east-1"});
var http = require('https');
var crypto = require('crypto');
require('string_format');

var apiKey_Public='';
var apiKey_Private='';
//var url='https://gateway.marvel.com:443/v1/public/characters?name=Spider-man&apikey=3fd140cb2420a52f345ea73e77f89e24'

var uri = 'https://gateway.marvel.com/v1/public/characters/{0}/comics?format={1}&formatType={2}&noVariants={3}&orderBy={4}&apikey={5}&ts={6}&hash={7}&limit={8}';
//var uri2= 'https://gateway.marvel.com:443/v1/public/characters/{0}/series?limit={1}&offset={2}&apikey={3}';

var format = 'comic';
var formatType = 'comic';
var noVariants = 'True';
var orderBy = 'issueNumber';
var apikey = apiKey_Public;
var TS = new Date().getTime();
var hash = crypto.createHash('md5').update(TS + apiKey_Private + apiKey_Public).digest('hex');
var limit = 100;
var comicCounter=0;
var comicCounter2=0;
var CharOneId="";
var CharTwoId="";

module.exports.get = (event, context, callback) => {
  CharOneId=event.FirstId;
  CharTwoId=event.SecondId;

  var firstCharacterGetComicsUrl= uri.format(event.FirstId,format,formatType,noVariants,orderBy,apikey,TS,hash,limit);
  var secondCharacterGetComicsUrl= uri.format(event.SecondId,format,formatType,noVariants,orderBy,apikey,TS,hash,limit);
  //console.log(firstCharacterGetComicsUrl);

  var params = {
  FunctionName: 'vubz-dev-MarvelCache', /* required */
  Payload: '{"FirstId": "'+event.FirstId+'","SecondId": "'+event.SecondId+'","Type": "comics"}'
  };
  lambda.invoke(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
    } // an error occurred
    else     {
      if (data.statusCode==200){
        ///////////////////////////
        var TS2 = new Date().getTime();
        var totalComics="2";
        var params = {
        FunctionName: 'vubz-dev-AddItemTableDynamoDB', /* required */
        Payload: '{"FirstId": "'+event.FirstId+'","SecondId": "'+event.SecondId+'","StartTime": "'+TS.toString()+'","EndTime": "'+TS2.toString()+'","Id": "'+hash+'","SingleQuantity": "'+totalComics+'"}'
        };

        lambda.invoke(params, function(err, data) {
          if (err) console.log(err, err.stack); // an error occurred
        });
        ///////////////////////////
        callback(null,data);

      }
      else {
        async.parallel([
          function (callback) {
            async.waterfall([
              async.apply(getCharacterComicsSimple,firstCharacterGetComicsUrl),
              async.apply(invokeLamdas,event.FirstId)]
            ,callback)
          },
          function (callback) {
            async.waterfall([
              async.apply(getCharacterComicsSimple,secondCharacterGetComicsUrl),
              async.apply(invokeLamdas,event.SecondId)]
            ,callback)
          }
        ],
        function (err,results) {

          var data=invokeMatch(results);
          var tempdata=data;
          data=prepareSend(data);

          var response = {
          isBase64Encoded: false,
          statusCode: 200,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
          };
          //////////////////////////////
          var params = {
          FunctionName: 'vubz-dev-SaveMarvelCache', /* required */
          Payload: '{"FirstId": "'+event.FirstId+'","SecondId": "'+event.SecondId+'","data": "'+tempdata+'","Type": "comics"}'
          };

          lambda.invoke(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
          });
          /////////////////////////////
          var TS2 = new Date().getTime();
          var totalComics=(comicCounter+comicCounter2+2).toString()
          var params = {
          FunctionName: 'vubz-dev-AddItemTableDynamoDB', /* required */
          Payload: '{"FirstId": "'+event.FirstId+'","SecondId": "'+event.SecondId+'","StartTime": "'+TS.toString()+'","EndTime": "'+TS2.toString()+'","Id": "'+hash+'","SingleQuantity": "'+totalComics+'"}'
          };

          lambda.invoke(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
          });
          /////////////////////////////
          callback(null, response);
        });
      };
    };
    //callback(null,response)           // successful response
  });

};
var getCharacterComicsSimple = function (getUrl,callback) {
  var comicTotal;
  http.get(getUrl,(res) => {
    res.setEncoding('utf8');
    var totalData="";

    res.on('data',(data)=>{
      totalData+=data;
      //console.log(data);
    });
    res.on('end',(data)=>{
      var comics = JSON.parse(totalData);
      if(comics["data"]){
        //console.log(comics);
        comicTotal=comics["data"]["total"];

      }

      //console.log(comicTotal);
      callback(null,comicTotal);

    });
  });
};

var prepareSend=function (data) {
  var list=[];
  list=(data.map(
    function (evt) {
      var temp={};
      temp["comics"]=evt
      return temp
  }));

  return list
}
var invokeMatch= function (CharacterLists) {
  var array1=[];
  //console.log(CharacterLists);
  array1=CharacterLists[0];
  //console.log(array1);
  var array2=CharacterLists[1];

  var sorted_a = array1.concat().sort();
  //console.log(sorted_a);
  var sorted_b = array2.concat().sort();
  var common = [];
  var a_i = 0;
  var b_i = 0;

  while (a_i < sorted_a.length
         && b_i < sorted_b.length)
  {
      if (sorted_a[a_i] === sorted_b[b_i]) {
          common.push(sorted_a[a_i]);
          a_i++;
          b_i++;
      }
      else if(sorted_a[a_i] < sorted_b[b_i]) {
          a_i++;
      }
      else {
          b_i++;
      }
  }
  return common;
};

var invokeLamdas= function (characterid,comicCount,callback) {
  //console.log(comicCount);
  var tasks=[];
  var lamdaCount=Math.ceil(comicCount/100);
  if (characterid==CharOneId) {
    comicCounter=lamdaCount;
  }
  else {
    comicCounter2=lamdaCount;
  }
  //console.log(lamdaCount);
  let offset;
  for (let i=0;i<lamdaCount;i++){
    offset= i*100;
    //console.log(offset);
    //console.log(i);
    tasks.push(function (callback) {
      offset= i*100;
      var lambdaParams ={
        FunctionName: "vubz-dev-singleComic",
        InvocationType : "RequestResponse",
        Payload : '{"characterId": "'+characterid+'","offset": "'+offset+'"}'
      };
      lambda.invoke(lambdaParams, function(error, data){
        if(error){
          console.log("error");
          callback(error);

        }
        else{
          //console.log(data.Payload);
          data=JSON.parse(data.Payload);
          //console.log(data);

          callback(null, data);
        }
      });
    })
  };
  async.parallel(tasks,function (error,data) {
    var comics=[];
    //console.log(data.length);

    for (let i =0;i<data.length;i++){
      //console.log(comics.concat(data[i]));
      comics=comics.concat(data[i]);

    };
    //console.log(comics);

    callback(null,comics)
  });
};
