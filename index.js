var express = require("express");
var path = require("path");
var bodyParser = require("body-parser")

var app = express();
app.use(bodyParser.urlencoded({extended: true}))

var viewsDir = path.join(process.cwd(), "views");

app.use(express.static('public'));
var catchPhrases = [{id: 0, phrase: "Alan Turing", definition: "Formalized the concept of the algorithm."},
					{id: 1, phrase: "Shell", definition: "Referst to a program that allows the user to interact with the cmputer through some kind of interface.  This can be a command line interface or a graphical user interface.  Allows access to the Operating System (OS Layer)"},
					{id: 2, phrase: "Ternary Operator", definition: "Conditional operator. the Only JS Operator that si frquently used as a shortcut for the if statement.  Condition ? expr1: expr2" },
					{id: 3, phrase: "GitHub", definiton: "Web based Git repo hosting service"},
					{id: 4, phrase: "Tim Burners Lee", definition: "Creator of the World Wide Web; founder of the W3C 'World Wide Web Consortium.'"}]

app.get("/", function (req, res) {
	var homePath = path.join(viewsDir, "index.html");
	res.sendFile(homePath);
});

app.get("/catchphrase", function (req, res){
	var catchphrase=catchPhrases.join(", ");
	res.send(catchphrase);
});

app.post("/catchphrase", function (req, res) {
    console.log(req.body.catchPhrases);
    var catchphrase = req.body.catchPhrases;
    catchPhrases.push(catchPhrases.phrase);
    res.redirect("/catchphrase")
});

app.listen(3000, function (req, res) {
    console.log("working!!")
});