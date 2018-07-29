const express = require('express');
const multer = require('multer');
const User = require('../models/User');
const dataFunctions = require('../dataFunctions');
const mapping = require('../utils/mapping/map');
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
    res.status(500).send(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const getStudentTask = User.findById(req.user._id);
    const getGroupsTask = Group.find({ studentIdList: req.user._id });
    await Promise.all([getStudentTask, getGroupsTask]);
    const studentModel = await getStudentTask;
    let groups = await getGroupsTask;

    groups = groups.map(item => item = mapping.mapGroupToDto(item));

    const student = mapping.mapStudentToDto(studentModel);
    const result = { student, groups };
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

router.get('/group/history', (res, req) => {
  const studentId = res.query.studentId;
  console.log(studentId);
  const groupId = res.query.groupId;
  console.log(groupId);
  dataFunctions.getStudentHistoryByGroup(studentId, groupId)
    .then((answer) => {
      req.send(JSON.stringify(dataFunctions.deleteOtherGroupInfo(answer, groupId)));
    })
    .catch(err => req.status(500).send(err));
});

router.get('/group/tests', async (req, res) => {
  try {
    const studentId = req.query.studentId;
    const groupId = req.query.groupId;
    const result = await dataFunctions.getGroupStudentTests(studentId, groupId);
    res.status(200).send(JSON.stringify(result));
  } catch (e) {
    res.status(400).send(e.toString());
  }
});

router.post('/task/attempt', async (req, res) => {

});

router.get('/task/attempt', async (req, res) => {
  const userId = req.user.id;
  const taskId = req.query.taskId;
  const attemptNumber = req.query.attemptNumber;
  try {
    const result = await dataFunctions.getAttemptsCodes(userId, taskId, attemptNumber);
    res.status(200).send(JSON.stringify(result));
  } catch (e) {
    res.status(400).send(e.toString());
  }
});

module.exports = router;
