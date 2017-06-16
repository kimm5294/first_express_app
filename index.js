var express = require("express");
var app = express();

var weather = require('yql');

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res)=>{
  res.render("homepage");
});

app.get("/search", (req, res)=>{
  res.render("")
});

app.listen(3000, (req, res)=>{
  console.log("Server is starting");
});