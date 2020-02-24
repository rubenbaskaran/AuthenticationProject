var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var user = require("./models/user");

var app = express();
app.use(require("express-session")({
    secret: "This secret message will be used to encode and decode the sessions",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.set("view engine", "ejs");
passport.serializeUser(user.serializeUser());       // Method from "passport-local-mongoose"
passport.deserializeUser(user.deserializeUser());   // Method from "passport-local-mongoose"
mongoose.connect("mongodb://localhost/authentication_demo_app", { useNewUrlParser: true, useUnifiedTopology: true });

app.get("/", function (req, res)
{
    res.render("home");
});

app.get("/secret", function (req, res)
{
    res.render("secret");
});

app.listen(3000, function ()
{
    console.log("server started");
});