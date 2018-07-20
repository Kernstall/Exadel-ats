const express = require('express');
const User = require('../models/User');
const dataFunctions = require('../dataFunctions');
const mapping = require('../utils/mapping/student');
const Group = require('../models/Group');

const router = express.Router();


router.use((req, res, next) => {
  if (req.user.status !== 'student') {
    return res.status(403).end();
  }
  return next();
});


router.get('/group/tasks', async (req, res) => {
  try {
    const result = await dataFunctions.getStudentTasksByGroup(req.query.studentId, req.query.groupId);
    res.send(JSON.stringify(result));
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get('/', async (req, res) => {
  if (!req.query.id) {
    res.status(400).end();
    return;
  }

  try {
    const getStudentTask = User.findById(req.query.id);
    const getGroupsTask = Group.find({ studentIdList: req.query.id });
    await Promise.all([getStudentTask, getGroupsTask]);
    const studentModel = await getStudentTask;
    let groups = await getGroupsTask;

    // console.log(groups);
    groups = groups.map(item => item = mapping.mapGroupToDto(item));
    // console.log(groups);

    const student = mapping.mapStudentToDto(studentModel);
    const result = { student, groups };
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

router.get('/group/student/history', (res, req) => {
  const studentId = res.query.studentID;
  console.log(studentId);
  const groupId = res.query.groupID;
  console.log(groupId);
  dataFunctions.getStudentHistoryByGroup(studentId, groupId)
    .then((answer) => {
      req.send(JSON.stringify(dataFunctions.deleteOtherGroupInfo(answer, groupId)));
    })
    .catch(err => req.status(500).send(err));
});

router.get('/group/student/tests', async (req, res) => {
  try {
    const studentId = req.query.studentID;
    const groupId = req.query.groupID;
    const result = await dataFunctions.getGroupStudentTests(studentId, groupId);
    res.status(200).send(JSON.stringify(result));
  } catch (e) {
    res.status(400).send(e.toString());
  }

});

module.exports = router;
