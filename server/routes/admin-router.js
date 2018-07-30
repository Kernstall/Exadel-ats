const express = require('express');
const Excel = require('exceljs');
const path = require('path');
const dataFunctions = require('../dataFunctions');
const User = require('../models/User');
const Group = require('../models/Group');
const Task = require('../models/Task');
const Question = require('../models/Question');
const mapping = require('../utils/mapping/map');
const dataFunctions = require('../utils/dataFunctions');

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

router.get('/groups', async (req, res) => {
  if (!req.query.skip) {
    return res.status(400).end();
  }
  try {
    const skip = parseInt(req.query.skip, 10);
    let result = await Group.find().limit(15).skip(skip);
    result = result.map(element => element = mapping.mapGroupsToDto(element));
    return res.send(result);
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
});

router.get('/tasks', async (req, res) => {
  if (!req.query.skip) {
    return res.status(400).end();
  }
  try {
    const skip = parseInt(req.query.skip, 10);
    let result = await Task.find().limit(15).skip(skip);
    result = result.map(element => element = mapping.mapTasksToDto(element));
    return res.send(result);
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
});

router.get('/questions', async (req, res) => {
  if (!req.query.skip) {
    return res.status(400).end();
  }
  try {
    const skip = parseInt(req.query.skip, 10);
    let result = await Question.find().limit(15).skip(skip);
    result = result.map(element => element = mapping.mapQuestionsToDto(element));
    return res.send(result);
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
});

router.get('/statistics', async (req, res) => {
  try {
    let result = await User.find({ status: 'teacher' });
    result = result.map(element => element = mapping.mapTeachersToDto(element));

    const options = {
      filename: 'server/routes/teacher-workbook.xlsx',
      useStyles: true,
      useSharedStrings: true,
    };
    const workbook = new Excel.stream.xlsx.WorkbookWriter(options);
    const worksheet = workbook.addWorksheet('Учителя');
    worksheet.columns = [
      { header: 'ФИО', key: 'name', width: 40 },
      { header: 'Почта', key: 'email', width: 30 },
      { header: 'Университет', key: 'university', width: 15 },
      { header: 'Количество ожидающих тестов', key: 'numberTestsToCheck', width: 30 },
    ];
    result.forEach((elem) => {
      worksheet.addRow({
        name: elem.name,
        email: elem.email,
        university: elem.university,
        numberTestsToCheck: elem.numberTestsToCheck,
      });
    });
    await worksheet.commit();
    return workbook.commit().then(async () => {
      const fileName = 'teacher-workbook.xlsx';
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
      res.sendFile(path.join(__dirname, '../routes', fileName));
    });
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
});

module.exports = router;
