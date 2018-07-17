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

module.exports = router;
