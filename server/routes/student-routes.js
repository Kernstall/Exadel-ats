const express = require('express');

const router = express.Router();

const info = ['Bill Murray', 'Alex Dovgal'];


router.get('/top', (req, res) => {
  // TODO: get data from mongo db
  res.status(200).json(info).end();
});

router.post('/', (req, res) => {
  // find by id
  res.send(info);
});

module.exports = router;
