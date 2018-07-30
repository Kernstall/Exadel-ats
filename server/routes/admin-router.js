const express = require('express');
const dataFunctions = require('../dataFunctions');
const User = require('../models/User');
const mapping = require('../utils/mapping/map');

const router = express.Router();

router.use((req, res, next) => {
  if (req.user.status !== 'admin') {
    return res.status(403).end();
  }
  return next();
});

router.get('/activities', async (req, res) => {
  const name = req.query.name;
  const role = req.query.role;
  const activityType = req.query.activityType;

  try {
    const result = await dataFunctions.getUsersActivities(name, role, activityType);
    res.status(200).send(JSON.stringify(result));
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.get('/teachers', async (req, res) => {
  if (!req.query.skip) {
    return res.status(400).end();
  }
  try {
    const skip = parseInt(req.query.skip, 10);
    let result = await User.find({ status: 'teacher' }).limit(15).skip(skip);
    result = result.map(element => element = mapping.mapTeachersToDto(element));
    return res.send(result);
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
});

router.get('/students', async (req, res) => {
  if (!req.query.skip) {
    return res.status(400).end();
  }
  try {
    const skip = parseInt(req.query.skip, 10);
    let result = await User.find({ status: 'student' }).limit(15).skip(skip);
    result = result.map(element => element = mapping.mapStudentsToDto(element));
    return res.send(result);
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
});

module.exports = router;
