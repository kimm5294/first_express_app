var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  locations: [{type: Schema.Types.ObjectId, ref: "Location"}]
});

module.exports = mongoose.model("User", userSchema);