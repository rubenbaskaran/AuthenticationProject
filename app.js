var express = require("express");
var mongoose = require("mongoose");

var app = express();
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/authentication_demo_app");

app.get("/", function (req, res)
{
    res.render("home");
});

app.get("/secret", function(req, res){
    res.render("secret");
});

app.listen(3000, function(){
    console.log("server started");
});