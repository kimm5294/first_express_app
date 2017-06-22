var mongoose = require("mongoose");

var locationSchema = new mongoose.Schema({
  name: String,
  api_id: String
})

module.exports = mongoose.model("Location", locationSchema);
