'use strict'

var CryptoJS = require("crypto-js");
var async = require("async");
var AWS = require("aws-sdk");
var lambda = new AWS.Lambda({"region": "us-east-1"});
var http = require("http");
require("string_format");

var PUBLIC_KEY = "ce5a7162468682fcc8b0cb88d351a8bf";
var PRIV_KEY = "8e0e98d392a4ffa7ffe8e2383d2add69825b9add";
var ts = new Date().getTime();
var HASH = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();

var getUrl = "http://gateway.marvel.com/v1/public/characters/{0}/series?limit=100&ts={1}&apikey={2}&hash={3}&offset={4}"


module.exports.get = (event, context, callback) => {
	console.log(event.offset);
	var url = getUrl.format(event.characterId, ts, PUBLIC_KEY, HASH, event.offset);

	getComics(url, callback);
};

var getComics = function(getUrl, callback){
	console.log(getUrl);
	var comicTotal;

	http.get(getUrl, (res) => {
		res.setEncoding('utf8');
		var totalData = "";

		res.on("data", (data) => {
			totalData += data;
		});

		res.on("end", (data) => {
			var comics = JSON.parse(totalData);
			if (comics["data"]) {
				comicTotal = comics["data"]["results"].map(function(event){
					return event.title;
				});

			};

			callback(null, comicTotal);

		});
	});
};
