var express = require("express");

var app = express();
app.use(express.static("static"));

var host = process.env.HOST || "0.0.0.0";
var port = process.env.PORT || 8000;
app.listen(port, host, function(addr) {
	console.log("Listening on " + host + ":" + port + "...");
});