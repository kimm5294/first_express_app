var express = require("express"),
    router  = express.Router(),
    request = require("request");



router.get("/search", (req, res)=>{
  var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + req.query.location + "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"


  request(url, (error, response, body)=> {
    if (!error && response.statusCode == 200 && JSON.parse(body)["query"]["count"]!=0) {
      var data = JSON.parse(body);
      var weather = data["query"]["results"]["channel"]
      var name = weather["location"]["city"] + ", " + weather["location"]["region"] + ", " + weather["location"]["country"]
      res.render("search", {data: weather, name: name})
    } else {
      res.send("doesn't work")
    }
  })
});

router.post("/save", (req, res)=>{
  req.user.locations.push(req.body.location);
  console.log(req.user);
  console.log(req.body);
});

module.exports = router;