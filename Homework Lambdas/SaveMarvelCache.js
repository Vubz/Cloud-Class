'use strict';
var AWS = require("aws-sdk");
const s3= new AWS.S3();
require('string_format');


module.exports.get = (event, context, callback) => {
  var params = {
   Bucket: "vubz-marvel-cache",
   Key: "{0}-{1}.txt".format(event.FirstId,event.SecondId),
   Body: event.data
  };
  s3.putObject(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
};
