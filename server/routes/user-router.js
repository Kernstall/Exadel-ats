const mongoose = require('mongoose');
const express = require('express');
const Student = require('../models/User');

const router = express.Router();

router.get('/Tops', async (req, res) => {
  const result = {};
  result.tasksTop = await Student.find({}).limit(10);
});
