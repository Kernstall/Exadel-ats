const express = require('express');
const Student = require('../models/User');
const dataFunctions = require('../dataFunctions');

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.get('/Tasks', (req, res) => {
  const id = req.query.studentId;
  console.log(id);
  Student.findById(id)
    .then(answer => dataFunctions.getStudentTasks(answer.tasks))
    .then((response) => {
      res.status(200).send(JSON.stringify(response));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});


module.exports = router;
