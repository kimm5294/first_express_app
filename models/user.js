var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  locations: [{type: mongoose.Schema.Types.ObjectId, ref: "Location"}]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);