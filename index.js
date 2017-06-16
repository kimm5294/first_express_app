var express = require("express");
var app = express();

var request = require("request");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res)=>{
  res.render("homepage");
});

app.get("/search", (req, res)=>{
  var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + req.query.location + "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"

  console.log(req.query.location)

  request(url, (error, response, body)=> {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      var weather = data["query"]["results"]["channel"]
      console.log(data["query"]["results"]);
      res.render("search", {data: weather})
    } else {
      res.send("doesn't work")
    }
  })

});

app.listen(3000, (req, res)=>{
  console.log("Server is starting");
});