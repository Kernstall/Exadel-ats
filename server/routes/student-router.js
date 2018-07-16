const express = require('express');
const User = require('../models/User');
const dataFunctions = require('../dataFunctions');
const mapping = require('../utils/mapping/student');
const Group = require('../models/Group');

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.get('/tasks', (req, res) => {
  const id = req.query.studentId;
  User.findById(id)
    .then(answer => dataFunctions.getStudentTasks(answer.tasks))
    .then((response) => {
      res.status(200).send(JSON.stringify(response));
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get('/', async (req, res) => {
  if (!req.query.id) {
    res.status(400).end();
    return;
  }

  try {
    const getStudentTask = User.findById({ _id: req.query.id });
    const getGroupsTask = Group.find({ studentIdList: req.query.id });
    await Promise.all([getStudentTask, getGroupsTask]);
    const studentModel = await getStudentTask;
    const groups = await getGroupsTask;

    const student = mapping.mapStudentToDto(studentModel);
    const result = { student, groups };
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
