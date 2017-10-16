'use strict';
var AWS = require("aws-sdk");
const s3= new AWS.S3();
require('string_format');


module.exports.get = (event, context, callback) => {
  var params = {
   Bucket: "vubz-marvel-cache",
   Key: "{0}-{1}.txt".format(event.FirstId,event.SecondId)
  };
  s3.getObject(params,function (err,data) {
    if (err){
      var response = {
      isBase64Encoded: false,
      statusCode: 404,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(text)
      };
      callback(null,response)
    }
    else {
      var text=data.Body.toString().split('\n')
      data=prepareSend(text)
      var response = {
      isBase64Encoded: false,
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
      };
      callback(null,response);
    }
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
