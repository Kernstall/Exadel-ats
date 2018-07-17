const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');
const dataFunctions = require('../dataFunctions');
const TeacherRequest = require('../models/TeacherRequest');

const router = express.Router();

router.get('/tops', async (req, res) => {
  try {
    const result = await dataFunctions.getTopTenStudents();

    res.send(JSON.stringify(result));
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/',
  failureFlash: true,
  successRedirect: '/student??',
}), (req, res) => {
  console.log(req.user);
  res.cookie('session_id', req.sessionID).end();
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
    || !req.body.lastName || !req.body.university || !req.body.faculty || !req.body.graduateYear) {
    return res.status(400).send({ err: 'not all fields are filled' });
  }
  if (req.body.status === 'student') {
    if (!req.body.course || !req.body.groupNumber) {
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
      return err ? next(err) : req.logIn(newStudent, (err2) => {
        return err2 ? next(err2) : console.log('logged');// res.redirect('/student??');
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
      faculty: req.body.faculty,
      graduateYear: req.body.graduateYear,
      status: 'student',
    });
    newTeacher.save((err, student) => {
      if (err) return next(err);
      const newRequest = new TeacherRequest({
        studentId: student._id,
        date: new Date(),
      });
      return TeacherRequest.collection.insertOne(newRequest, (error) => {
        if (error) {
          return res.status(500).end();
        }
        return req.logIn(newTeacher, (err2) => {
          return err2 ? next(err2) : console.log('logged');// res.redirect('/student??');
        });
      });
    });
  }
  return res.status(400).end();
});

module.exports = router;
