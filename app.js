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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());       // Method from "passport-local-mongoose"
passport.deserializeUser(user.deserializeUser());   // Method from "passport-local-mongoose"

app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/authentication_demo_app", { useNewUrlParser: true, useUnifiedTopology: true });

app.get("/", function (req, res)
{
    res.render("home");
});

app.get("/secret", function (req, res)
{
    res.render("secret");
});

app.get("/register", function (req, res)
{
    res.render("register");
});

app.post("/register", function (req, res)
{
    user.register(new user({ username: req.body.username }), req.body.password, function (err, user)
    {
        if (err)
        {
            console.log(err);
            return res.render("register");
        }
        // Logging the user in and keeping track of the session
        passport.authenticate("local")(req, res, function ()
        {
            res.redirect("/secret");
        });
    });
});

app.get("/login", function (req, res)
{
    res.render("login");
});

// Middleware
// Takes username and password from request body and validates with data in database
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function (req, res)
{

});

app.listen(3000, function ()
{
    console.log("server started");
});