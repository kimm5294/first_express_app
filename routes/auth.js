var express  = require("express"),
    router   = express.Router(),
    User     = require("../models/user"),
    passport = require("passport"),
    flash    = require("connect-flash");


//REGISTER ROUTES
router.get("/register", (req, res)=>{
  res.render("register", {message: req.flash("register_error")});
});

router.post("/register", (req, res)=>{
  User.register(new User({username: req.body.username}), req.body.password, (err, user)=>{
    if (err) {
      console.log(err);
      req.flash("register_error", err.message)
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req,res, ()=>{
        res.redirect("/");
      })
    }
  })
});

//LOGIN ROUTES
router.get("/login", (req, res)=>{
  res.render("login", {message: req.flash("error")});
})

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login"
}), (req, res)=>{
});

router.get("/logout", (req, res)=>{
  req.logout();
  res.redirect("/");
});

router.get("/users/:id", isUser, (req, res)=>{
  console.log(req.params.id)
  User.findById(req.params.id, (err, userShow)=>{
    if (err) {
      console.log("error")
    } else {
      res.render("users/show");
    }
  })
});

function isUser(req, res, next){
  if (req.user && req.user.id == req.params.id) {
    next();
  } else {
    req.flash("error", "Must be logged in with proper account to access this page.")
    res.redirect("/login");
  }
};

module.exports = router;