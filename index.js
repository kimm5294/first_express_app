var express               = require("express"),
    app                   = express(),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User                  = require("./models/user"),
    Location              = require("./models/location"),
    request               = require("request");

mongoose.connect("mongodb://localhost/weather");

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(require("express-session")({
  secret: "This is my first express app",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//#########################
//ROUTES
//#########################
app.get("/", (req, res)=>{
  res.render("homepage");
});

app.get("/register", (req, res)=>{
  res.render("register");
});

app.post("/register", (req, res)=>{
  User.register(new User({username: req.body.username}), req.body.password, (err, user)=>{
    if (err) {
      console.log(err);
      res.render("register");
    } else {
      passport.authenticate("local")(req,res, ()=>{
        res.redirect("/");
      })
    }
  })
});

app.get("/search", (req, res)=>{
  var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + req.query.location + "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"


  request(url, (error, response, body)=> {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      var weather = data["query"]["results"]["channel"]
      console.log(data["query"]["results"]["channel"]["item"]["condition"]);
      res.render("search", {data: weather})
    } else {
      res.send("doesn't work")
    }
  })

});

app.listen(3000, (req, res)=>{
  console.log("Server is starting");
});