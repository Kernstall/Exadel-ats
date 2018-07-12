const express = require('express');
const Student = require('../models/User');
const dataFunctions = require('../dataFunctions');

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.get('/getStudentTasks/:studentId', (req, res) => {
  const id = req.params['studentId'];
  Student.findById({ _id: id })
    .then(answer => dataFunctions.getStudentTasks(answer.tasks))
    .then((response) => {
      res.status(200).send(JSON.stringify(response));
    })
    .catch((err) => { res.status(500).send(err); });
});

router.post('/addTask', (req, res) => {
  dataFunctions.addTask(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => { res.status(500).send(err); });
});

router.post('/addQuestion', (req, res) => {
  dataFunctions.addQuestion(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => { res.status(500).send(err); });
});


module.exports = router;
