var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

// Adds extra methods to the schema
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);