const express = require('express');
const dataFunctions = require('../dataFunctions');

const router = express.Router();

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

module.exports = router;
