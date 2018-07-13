const express = require('express');
const Student = require('../models/User');
const Group = require('../models/Group');
// const Employee = require('../models/Employee');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.query.id) {
    Promise.all([
      Student.findById({ _id: req.query.id }),
      Group.find({ studentIdList: req.query.id }),
    ])
      .then((result) => {
        if (!result[0] || !result[1]) {
          return Promise.reject();
        }
        const studentInfo = [{
          firstName: result[0].firstName,
          lastName: result[0].lastName,
          university: result[0].university,
          faculty: result[0].faculty,
          course: result[0].faculty,
          groupNumber: result[0].groupNumber,
          graduateYear: result[0].graduateYear,
        }, result[1]];
        res.send(studentInfo);
      })
      .catch(err => res.status(500).send(err));
  } else res.status(400).end();
});
router.get('/tasks', (req, res) => {
  if (req.query.id) {
    Student.findById(req.query.id, (err, student) => {
      if (!student) res.status(500).send(err);
      const result = student.tasks;
      res.send(result);
    });
  } else res.status(400).end();
});

module.exports = router;
