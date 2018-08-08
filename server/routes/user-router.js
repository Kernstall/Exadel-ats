const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const mapping = require('../utils/mapping/map');
const User = require('../models/User');
const passportControl = require('../utils/passport-control');
const dataFunctions = require('../utils/dataFunctions');
const TeacherRequest = require('../models/TeacherRequest');
const University = require('../models/University');

const router = express.Router();

router.get('/session/status', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).end();
  }
  const result = await User.findById(req.user.id)
    .select({
      id: 1,
      status: 1,
    });
  res.status(200).json(result);
});

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
    let result = await University.find();
    result = result.map(el => mapping.mapUniversityToDto(el));
    result = result.map((item) => {
      item.faculties = item.faculties.map(el => mapping.mapFacultyToDto(el));
      return item;
    });
    return res.send(result);
  } catch (err) {
    return res.status(500).end();
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.send({ status: 'ok' });
});

router.post('/signup', (req, res, next) => {
  if (!req.body || !req.body.status || !req.body.email || !req.body.password || !req.body.firstName
    || !req.body.lastName || !req.body.university) {
    return res.status(400).send({ err: 'not all fields are filled' });
  }
  if (req.body.status !== 'teacher' && req.body.status !== 'student') {
    return res.status(400).send({ err: 'not right status' });
  }
  return User.find({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(500).end();
    }
    if (user.length > 0) {
      return res.status(409).send({ err: 'this email already in use' });
    }
    if (req.body.status === 'student') {
      if (!req.body.course || !req.body.groupNumber
        || !req.body.faculty || !req.body.graduateYear) {
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
    return res.status(500).end();
  });
});

module.exports = router;
