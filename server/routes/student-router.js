const express = require('express');
const multer = require('multer');
const FormData = require('form-data');
const mongoose = require('mongoose');
const fs = require('fs');
const got = require('got');

const User = require('../models/User');
const dataFunctions = require('../utils/dataFunctions');
const mapping = require('../utils/mapping/map');
const Group = require('../models/Group');
const uploadFiles = require('../utils/uploadFiles.js');
const fileSystemFunctions = require('../utils/fileSystemFunctions.js');

const router = express.Router();

router.use((req, res, next) => {
  if (req.user.status !== 'student') {
    return res.status(403).end();
  }
  return next();
});

router.get('/group/tasks', async (req, res) => {
  try {
    const result = await dataFunctions.getStudentTasksByGroup(req.user.id, req.query.groupId);
    res.send(JSON.stringify(result));
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const getStudentTask = User.findById(req.user._id);
    const getGroupsTask = Group.find({ studentIdList: req.user._id });
    await Promise.all([getStudentTask, getGroupsTask]);
    const studentModel = await getStudentTask;
    let groups = await getGroupsTask;

    groups = groups.map(item => item = mapping.mapGroupToDto(item));

    const student = mapping.mapStudentToDto(studentModel);
    const result = { student, groups };
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

router.get('/group/history', (res, req) => {
  const studentId = res.user.id;
  const groupId = res.query.groupId;
  dataFunctions.getStudentHistoryByGroup(studentId, groupId)
    .then((answer) => {
      req.send(JSON.stringify(dataFunctions.deleteOtherGroupInfo(answer, groupId)));
    })
    .catch(err => req.status(400).send(err));
});

router.get('/group/tests', async (req, res) => {
  try {
    const studentId = req.user.id;
    const groupId = req.query.groupId;
    const result = await dataFunctions.getGroupStudentTests(studentId, groupId);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).send(e.toString());
  }
});

router.post('/task/attempt', async (req, res) => {

});

router.get('/task/attempt', async (req, res) => {
  const userId = req.user.id;
  const taskId = req.query.taskId;
  const attemptNumber = req.query.attemptNumber;
  try {
    const result = await dataFunctions.getAttemptsCodes(userId, taskId, attemptNumber);
    res.status(200).send(JSON.stringify(result));
  } catch (e) {
    res.status(400).send(e.toString());
  }
});

router.post('/src/files', async (req, res, next) => {
  try {
    await User.find({ _id: req.user._id, tasks: { $elemMatch: { taskId: mongoose.Types.ObjectId(req.query.taskId) } } });
    next();
  } catch (error) {
    res.status(400).send('Invalid task id');
  }
});

router.post('/src/files', uploadFiles.uploadSrcCode.array('src'), async (req, res) => {
  try {
    if (req.files) {
      const fileNamesArray = [];
      const mainFile = req.query.mainFile;
      const userId = req.user.id;
      const taskId = req.query.taskId;
      const attemptNumber = await dataFunctions.getUsersTasksAttemptNumber(userId, taskId);
      req.files.forEach((elem) => {
        fileNamesArray.push(elem.originalname);
      });

      const form = new FormData();

      for (let i = 0; i < req.files.length; i++) {
        form.append('src', fs.createReadStream(`${req.files[i].destination}/${req.files[i].originalname}`));
      }

      const taskTests = await dataFunctions.getTaskTests(taskId);

      const studentTaskInfo = await dataFunctions.getstudentTaskInfo(userId, taskId);

      const bestResult = studentTaskInfo[0].taskArray[0].bestResult;

      for (let i = 0; i < taskTests.tests.length; i++) {
        await fileSystemFunctions.copyFile(`${dataFunctions.commonTaskPath}/${taskId}/${String(taskTests.tests[i]._id)}/output.txt`,
          `${dataFunctions.commonTaskPath}/${taskId}/${String(taskTests.tests[i]._id)}/${String(taskTests.tests[i]._id)}output.txt`);
        await fileSystemFunctions.copyFile(`${dataFunctions.commonTaskPath}/${taskId}/${String(taskTests.tests[i]._id)}/input.txt`,
          `${dataFunctions.commonTaskPath}/${taskId}/${String(taskTests.tests[i]._id)}/${String(taskTests.tests[i]._id)}input.txt`);
        form.append('tests', fs.createReadStream(`${dataFunctions.commonTaskPath}/${taskId}/${String(taskTests.tests[i]._id)}/${String(taskTests.tests[i]._id)}output.txt`));
        form.append('tests', fs.createReadStream(`${dataFunctions.commonTaskPath}/${taskId}/${String(taskTests.tests[i]._id)}/${String(taskTests.tests[i]._id)}input.txt`));
      }

      (async () => {
        try {
          const answer = await got.post(`http://localhost:3002/server/running/srcfiles?taskId=${taskId}&&lang=${taskTests.language}&&mainFileName=${mainFile}`, { body: form });
          for (let i = 0; i < taskTests.tests.length; i++) {
            await fileSystemFunctions.deleteFile(`${dataFunctions.commonTaskPath}/${taskId}/${String(taskTests.tests[i]._id)}/${String(taskTests.tests[i]._id)}output.txt`);
            await fileSystemFunctions.deleteFile(`${dataFunctions.commonTaskPath}/${taskId}/${String(taskTests.tests[i]._id)}/${String(taskTests.tests[i]._id)}input.txt`);
          }
          const result = await dataFunctions.saveAttemptInfo(userId, taskId,
            attemptNumber, mainFile, req.files, JSON.parse(answer.body), bestResult, taskTests.weight, taskTests.passResult);
          res.status(200).json({
            result: result.result,
            isPassed: result.isPassed,
            tests: result.tests,
          });
        } catch (error) {
          res.status(400).send(error.toString());
        }
      })();
    } else {
      res.status(200).json('');
    }
  } catch (e) {
    res.status(400).send(e.toString());
  }
});
router.get('/test/questions', async (req, res) => {
  try {
    const topicId = req.query.topicId;
    const answer = await dataFunctions.getTestQuestions(topicId);
    console.log(answer);
    res.status(200).json(answer);
  } catch (e) {
    console.log(e.toString());
    res.status(400).send(e.toString());
  }
});

router.post('/test/questions/answers', async (req, res) => {
  try {
    const studentId = req.user.id;
    const questionsAnswers = req.body;
    await dataFunctions.checkQuestions(questionsAnswers);
  } catch (e) {
    res.status(400).send(e.toString());
  }
});

router.get('/examination/test', async (req, res) => {
  try {
    const testId = req.query.testId;
    const studentId = req.user.id;
    const result = await dataFunctions.getExamTest(studentId, testId);
    console.log(result);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).send(e.toString());
  }
});

router.post('/test/checking', async (req, res) => {
  try {
    const testId = req.query.testId;
    const groupId = req.query.groupId;
    const topicId = req.query.topicId;
    const studentId = req.user.id;
    const answers = req.body;
    if (testId !== 'undefined') {
      await dataFunctions.saveExamTest(studentId, answers, testId);
      res.status(200).json();
    } else if (topicId) {
      await dataFunctions.saveTrainigTest(studentId, answers, groupId, topicId);
      res.status(200).json();
    }
  } catch (e) {
    res.status(400).json(e.message);
  }
});

module.exports = router;
