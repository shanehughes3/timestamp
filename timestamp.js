var express = require("express"),
    app = express();

app.set("views", __dirname);
app.set("view engine", "jade");

app.get("/", function(req, res) {
    res.render("./index.jade");
});

app.get("/favicon.ico", function(req, res) {
    res.sendStatus(404);
});

app.get("/*", function(req, res) {
    var reqDate = null;
    if (Number(req.path.slice(1))) {
	var input = Number(req.path.slice(1));
	reqDate = new Date(Number(req.path.slice(1)));
    } else {
	reqDate = new Date(decodeURI(req.path).slice(1));
    }
    var outObj = {
	unix: reqDate.getTime(),
	natural: printDate(reqDate)
    };
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(outObj));
});

app.listen(80);

function printDate(reqDate) {
    if (reqDate.getTime()) {
	var month = getMonthStr(reqDate.getMonth());
	var day = reqDate.getDate();
	var year = reqDate.getFullYear();

	return month + " " + day + ", " + year;
    } else {
	return null
    }	
}

function getMonthStr(month) {
    var monthsArr = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
    ];
    return monthsArr[month];
}
