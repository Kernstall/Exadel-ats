const mongoose = require('mongoose');
const express = require('express');
const Student = require('../models/User');
const dataFunctions = require('../dataFunctions');

const router = express.Router();

router.get('/tops', async (req, res) => {
  try {
    const result = await dataFunctions.getTopTenStudents();

    res.send(JSON.stringify(result));
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/studentGroups', async (req, res) => {
  try {
    const result = { // TODO_BACKEND: dataFunctions.getStudentGroups()
      studentGroups: [
        {
          groupName: '12FAMCS',
          completedTasks: '476767',
          allTasks: '6',
          completedTests: '10',
          allTests: '20',
        },
        {
          groupName: '13FAMCS',
          completedTasks: '5',
          allTasks: '7',
          completedTests: '9',
          allTests: '2131231',
        },
        {
          groupName: '13FAMCS',
          completedTasks: '5',
          allTasks: '7',
          completedTests: '9',
          allTests: '2131231',
        },
      ],
    };
    res.send(JSON.stringify(result));
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
