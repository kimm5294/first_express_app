var express  = require("express"),
    router   = express.Router(),
    User     = require("../models/user"),
    passport = require("passport");


//REGISTER ROUTES
router.get("/register", (req, res)=>{
  res.render("register");
});

router.post("/register", (req, res)=>{
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

//LOGIN ROUTES
router.get("/login", (req, res)=>{
  res.render("login");
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
    res.redirect("/login");
  }
};

module.exports = router;