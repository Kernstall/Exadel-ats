const express = require('express');

const router = express.Router();

const info = [
  {
    TopBy: 'Top by Mark',
    Students: ['Bill Murray #1', 'Alex Dovgal #1', 'Alex Dovgal #1', 'Alex Dovgal #1', 'Alex Dovgal #1', 'Alex Dovgal #1', 'Alex Dovgal #1', 'Alex Dovgal #1', 'Alex Dovgal #1', 'Alex Dovgal #1'],
  },
  {
    TopBy: 'Top by Tasks',
    Students: ['Bill Murray #2', 'Alex Dovgal #2', 'Alex Dovgal #2', 'Alex Dovgal #2', 'Alex Dovgal #2', 'Alex Dovgal #2', 'Alex Dovgal #2', 'Alex Dovgal #2', 'Alex Dovgal #2', 'Alex Dovgal #2'],
  },
  {
    TopBy: 'Top by Tests',
    Students: ['Bill Murray #3', 'Alex Dovgal #3', 'Alex Dovgal #3', 'Alex Dovgal #3', 'Alex Dovgal #3', 'Alex Dovgal #3', 'Alex Dovgal #3', 'Alex Dovgal #3', 'Alex Dovgal #3', 'Alex Dovgal #3'],
  },
  {
    TopBy: 'Top by Activity',
    Students: ['Bill Murray #4', 'Alex Dovgal #4', 'Alex Dovgal #4', 'Alex Dovgal #4', 'Alex Dovgal #4', 'Alex Dovgal #4', 'Alex Dovgal #4', 'Alex Dovgal #4', 'Alex Dovgal #4', 'Alex Dovgal #4'],
  },
];

router.get('/top', (req, res) => {
  // TODO: get data from mongo db
  res.status(200).json(info).end();
});

router.post('/', (req, res) => {
  // find by id
  res.send(info);
});

module.exports = router;
