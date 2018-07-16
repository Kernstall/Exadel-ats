const express = require('express');
const dataFunctions = require('../dataFunctions');

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.post('/Task', (req, res) => {
  dataFunctions.addTask(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => { res.status(500).send(err); });
});

router.post('/Question', (req, res) => {
  dataFunctions.addQuestion(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => { res.status(500).send(err); });
});

router.post('/studentsToGroup', (req, res) => {
  const groupID = req.query.groupID;
  const studentIDs = req.body;
  dataFunctions.addStudentsToGroup(groupID, studentIDs)
    .then(answer => res.send(answer))
    .catch((err) => { res.status(500).send(err); });
});

router.delete('/studentsFromGroup', (req, res) => {
  const groupID = req.query.groupID;
  const studentIDs = req.body;
  dataFunctions.deleteStudentsToGroup(groupID, studentIDs)
    .then(answer => res.send(answer))
    .catch((err) => { res.status(500).send(err); });
});

router.get('/teacherGroup', (req, res) => {
  const teacherID = req.query.teacherID;
  dataFunctions.getTeachersGroups(teacherID)
    .then((answer) => {
      res.send(JSON.stringify(answer));
    })
    .catch(err => res.status(500).send(err));
});

router.get('/groupInfo', (req, res, next) => {
  const groupID = req.query.groupID;

  dataFunctions.getGroupInfo(groupID);
});

module.exports = router;
