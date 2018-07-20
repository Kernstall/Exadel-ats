const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const User = require('../models/User');

const router = express.Router();

passport.use(new LocalStrategy((email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Such email does not exist' });
    }
    if (user.passwordHash !== bcrypt.hashSync(password, user.passwordSalt)) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

router.post('/',
  passport.authenticate('local'),
  (req, res) => {
    res.send({ status: req.user.status, email: req.user.email, id: req.user._id });
  });

module.exports = router;
