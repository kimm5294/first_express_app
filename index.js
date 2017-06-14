var express = require("express");
var app = express();

app.get("/", (req, res)=>{
  res.send("Works");
});

app.listen(3000, (req, res)=>{
  console.log("Server is starting");
});