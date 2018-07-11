const express = require('express');
const Student = require('../models/Student');
const Group = require('../models/Group');

const router = express.Router();

router.post('/', (req, res) => {
  // find by id
  Promise.all([
    Student.findById({ _id: '5b45b16d75224332745f758e' }),
    Group.find({ studentIdList: '5b45b16d75224332745f758e' }),
  ])
    .then((result) => {
      if (!result[0] || !result[1]) {
        return Promise.reject();
      }
      const studentInfo = [{
        firstName: result[0].firstName,
        lastName: result[0].lastName,
        faculty: result[0].faculty,
        course: result[0].faculty,
        groupNumber: result[0].groupNumber,
        graduateYear: result[0].graduateYear,
      }, result[1]];
      res.send(studentInfo);
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;
