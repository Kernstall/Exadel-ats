const mongoose = require('mongoose');
const express = require('express');
const Student = require('../models/User');
const dataFunctions = require('../dataFunctions');

const router = express.Router();

router.get('/tops', async (req, res) => {
  const result = await dataFunctions.getTopTenStudents();

  res.send(JSON.stringify(result));
});

module.exports = router;
