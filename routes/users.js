var express = require("express");
const bodyParser = require("body-parser");
var User = require("../models/user");
var passport = require("passport");

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.send("respond with a resource");
});

router.post("/signup", (req, res, next) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
      } else {
        passport.authenticate("local")(req, res, () => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({
            success: true,
            status: "Registered Successfully!",
            user: user,
          });
        });
      }
    }
  );
  // .catch((err) => next(err));
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({
    success: true,
    status: "You're successfully logged in!",
  });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie("session-id");
    res.redirect("/");
  } else {
    var err = new Error("You're not logged in!");
    err.status = 403;
    next(err);
  }
});

module.exports = router;
