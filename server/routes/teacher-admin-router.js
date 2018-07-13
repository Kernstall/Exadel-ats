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

module.exports = router;
