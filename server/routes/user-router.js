const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');
const dataFunctions = require('../dataFunctions');
const TeacherRequest = require('../models/TeacherRequest');
const University = require('../models/University');

const router = express.Router();

router.get('/tops', async (req, res) => {
  try {
    const result = await dataFunctions.getTopTenStudents();

    res.send(JSON.stringify(result));
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get('/universities', async (req, res) => {
  try {
    const result = await University.find();
    res.send(result);
  } catch (err) {
    res.status(500).end();
  }
});

router.post('/login', (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ message: 'not all fields' });
  }
  passport.authenticate('local', (err, user) => {
    if (user) {
      return req.login(user, (err) => {
        if (err) {
          return res.status(401).end();
        }
        return res.send({ status: user.status, email: user.email, id: user._id });
      });
    }
    return res.status(401).send({ message: err });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.send({ status: 'ok' });
});

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

router.post('/signup', (req, res, next) => {
  if (!req.body || !req.body.status || !req.body.email || !req.body.password || !req.body.firstName
    || !req.body.lastName || !req.body.university) {
    return res.status(400).send({ err: 'not all fields are filled' });
  }
  if (req.body.status === 'student') {
    if (!req.body.course || !req.body.groupNumber || !req.body.faculty || !req.body.graduateYear) {
      return res.status(400).send({ err: 'not all fields are filled' });
    }
    const salt = bcrypt.genSaltSync(10);
    const newStudent = new User({
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, salt),
      passwordSalt: salt,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      university: req.body.university,
      faculty: req.body.faculty,
      graduateYear: req.body.graduateYear,
      course: req.body.course,
      groupNumber: req.body.groupNumber,
      status: req.body.status,
    });
    return newStudent.save((err) => {
      if (err) {
        return next(err);
      }
      return req.logIn(newStudent, (err2) => {
        if (err2) {
          return next(err2);
        }
        return res.send({ status: req.user.status, email: req.user.email, id: req.user._id });
      });
    });
  }
  if (req.body.status === 'teacher') {
    if (!req.body.fathersName) {
      return res.status(400).send({ err: 'not all fields are filled' });
    }
    const salt = bcrypt.genSaltSync(10);
    const newTeacher = new User({
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, salt),
      passwordSalt: salt,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      fathersName: req.body.fathersName,
      university: req.body.university,
      status: 'student',
    });
    return newTeacher.save((err, student) => {
      if (err) return res.status(500).send(err);
      const newRequest = new TeacherRequest({
        studentId: student._id,
        date: new Date(),
      });
      return TeacherRequest.collection.insertOne(newRequest, (error) => {
        if (error) {
          return res.status(500).end();
        }
        return req.logIn(newTeacher, (err2) => {
          if (err2) {
            next(err2);
          }
          return res.send({ status: req.user.status, email: req.user.email, id: req.user._id });
        });
      });
    });
  }
  return res.status(400).end();
});

module.exports = router;
