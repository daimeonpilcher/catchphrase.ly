var express = require("express");
var path = require("path");
var bodyParser = require("body-parser")
var db = require("./models")

var app = express();
app.use(bodyParser.urlencoded({extended: true}))

var viewsDir = path.join(process.cwd(), "views");

app.use(express.static('public'));

// set root route
app.get("/", function (req, res) {
	var homePath = path.join(viewsDir, "index.html");
	res.sendFile(homePath);
});

// send data to catchprase URL in browser
app.get("/catchphrase", function (req, res){
	db.CatchPhrase.find({},
		function (err, catchphrase) {
			console.log(200, catchphrase)
      res.send(catchphrase)
		})
});

// add new catchphrases to MongoDB
app.post("/catchphrase", function (req, res) {
  db.CatchPhrase.create(req.body.catchphrase, 
    function (err, catchphrase) {
      console.log(201, catchphrase);
      res.send(201, catchphrase);
    });
});

// delete items from the DB
app.delete("/catchphrase/:id", function (req, res) {
  db.CatchPhrase.findOneAndRemove({
    _id: req.params.id
  }, function (err, catchphrase) {
    console.log(204, catchphrase);
    res.send(204) // success No Content
  });
});


app.listen(3000, function (req, res) {
    console.log("working!!")
});