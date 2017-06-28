var express = require("express"),
    router  = express.Router(),
    request = require("request");



router.get("/search", (req, res)=>{
  var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + req.query.location + "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"


  request(url, (error, response, body)=> {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      var weather = data["query"]["results"]["channel"]
      console.log(data["query"]["results"]["channel"]["item"]["condition"]);
      res.render("search", {data: weather, user: req.user})
    } else {
      res.send("doesn't work")
    }
  })
});

module.exports = router;