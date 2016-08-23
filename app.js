var bodyParser = require("body-parser");
var express = require("express");
var GoogleSpreadsheet = require("google-spreadsheet");

var app = express();
app.use(express.static("static"));
app.use(bodyParser());

var sheet = new GoogleSpreadsheet(process.env.SHEET_ID);

sheet.useServiceAccountAuth({
	client_email: process.env.CLIENT_EMAIL,
	private_key: eval(process.env.PRIVATE_KEY)
}, function(err) {
	if (err) { console.log("Unsuccessful auth to Google.", err); process.exit(1); }
	app.post("/subscribe", function(req, res, next) {
	    if (!(req.body && "email" in req.body)) return res.send({ success: 0, message: "Please provide an email." });
		var data = {
			"First Name": "",
			"Last Name": "",
			"Email Address": req.body.email
		};
		sheet.addRow(1, data, function (err2) {
			if (err2) {
				console.dir(err2);
				return res.send({ success: 0, message: "Error adding row." });
			}
			res.send({ success: 1, message: "Subscribed!" });
		});
	});
});

var host = process.env.HOST || "0.0.0.0";
var port = process.env.PORT || 8000;
app.listen(port, host, function(addr) {
	console.log("Listening on " + host + ":" + port + "...");
});