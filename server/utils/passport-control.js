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

router.post('/', (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({ message: 'not all fields' });
  }
  passport.authenticate('local', (err, user) => {
    if (user) {
      return req.login(user, (err) => {
        if (err) {
          return res.status(401).end();
        }
        return res.send({
          status: user.status,
          firstName: user.firstName,
          lastName: user.lastName,
          id: user._id,
        });
      });
    }
    return res.status(401).send({ err: 'not right fiels' });
  })(req, res, next);
});

module.exports = router;
