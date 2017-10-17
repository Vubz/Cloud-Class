'use strict';
var AWS = require("aws-sdk");
const s3= new AWS.S3();
require('string_format');


module.exports.get = (event, context, callback) => {
  if (event.type="comics"){
    var params = {
     Bucket: "vubz-marvel-cache",
     Key: "comics/{0}-{1}.txt".format(event.FirstId,event.SecondId),
     Body: event.data
    };
    s3.putObject(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });
  }
  else if (event.type="series") {
    var params = {
     Bucket: "vubz-marvel-cache",
     Key: "series/{0}-{1}.txt".format(event.FirstId,event.SecondId),
     Body: event.data
    };
    s3.putObject(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });
  }
  else {

  }

};
