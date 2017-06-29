var express               = require("express"),
    app                   = express(),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User                  = require("./models/user"),
    request               = require("request");



var authRoutes   = require("./routes/auth"),
    searchRoutes = require("./routes/search");

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

app.use((req, res, next)=>{
  res.locals.user = req.user;
  next();
});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//#########################
//ROUTES
//#########################

app.use(authRoutes);

app.use(searchRoutes);

app.get("/", (req, res)=>{
  res.render("homepage");
});

//USER ROUTES

app.get("/users/:id", (req, res)=>{
  res.render("users/show");
});





app.listen(3000, (req, res)=>{
  console.log("Server is starting");
});