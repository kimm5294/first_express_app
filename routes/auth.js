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
  res.render("login",
    {
      message: req.flash("restricted"),
      err: req.flash("error")
    }
  );
})

router.post("/login", passport.authenticate("local", {
  successRedirect: "/users/profile",
  failureRedirect: "/login",
  failureFlash: true
}), (req, res)=>{
});

router.get("/logout", (req, res)=>{
  req.logout();
  res.redirect("/");
});

router.get("/users/profile", (req, res)=>{
  User.findById(req.user.id, (err, userShow)=>{
    if (err) {
      console.log("error")
    } else {
      res.render("users/show");
    }
  })
});

module.exports = router;