const express = require('express');
const got = require('got');
const fs = require('fs');
const FormData = require('form-data');

const Task = require('../models/Task');
const Topic = require('../models/Topic');
const Question = require('../models/Question');
const mapping = require('../utils/mapping/map');
const User = require('../models/User');
const dataFunctions = require('../dataFunctions');
const uploadFiles = require('../utils/uploadFiles.js');
const fileSystemFunctions = require('../utils/fileSystemFunctions.js');


const router = express.Router();

/*router.use((req, res, next) => {
  if (req.user.status !== 'teacher') {
    return res.status(403).end();
  }
  return next();
});*/

router.get('/tasks', (req, res) => {
  let hashSet = {};
  Task.find().populate('topicId', 'name').exec((err, tasks) => {
    if (err) res.status(500).end();
    tasks.forEach((task) => {
      const newTask = mapping.mapTaskToDto(task);
      if (!hashSet[task.topicId.name]) {
        hashSet[task.topicId.name] = {
          topicName: task.topicId.name,
          tasks: [newTask],
        };
        return;
      }
      hashSet[task.topicId.name].tasks.push(newTask);
    });
    hashSet = Object.keys(hashSet).map(key => hashSet[key]);
    res.send(hashSet);
  });
});

router.get('/task', async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(400).end();
    }
    const taskId = req.query.id;
    const result = await dataFunctions.getTaskInfo(taskId);
    return res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.get('/questions', (req, res) => {
  let hashSet = {};
  Question.find().populate('topicId', 'name').exec((err, questions) => {
    if (err) res.status(500).end();
    questions.forEach((question) => {
      if (!hashSet[question.topicId.name]) {
        hashSet[question.topicId.name] = {
          topicName: question.topicId.name,
          questions: {},
          count: 0,
        };
      }
      if (!hashSet[question.topicId.name].questions[question.kind]) {
        hashSet[question.topicId.name].questions[question.kind] = {
          type: question.kind,
          typeQuestions: [question._id],
          count: 1,
        };
        hashSet[question.topicId.name].count++;
        return;
      }
      hashSet[question.topicId.name].questions[question.kind].typeQuestions.push(question._id);
      hashSet[question.topicId.name].questions[question.kind].count++;
      hashSet[question.topicId.name].count++;
    });
    hashSet = Object.keys(hashSet).map(key => hashSet[key]);
    hashSet.forEach((set) => {
      set.questions = Object.keys(set.questions).map(key => set.questions[key]);
    });
    res.send(hashSet);
  });
});

router.post('/task', (req, res) => {
  dataFunctions.addTask(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.post('/question', (req, res) => {
  dataFunctions.addQuestion(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.post('/group/students', (req, res) => {
  const groupID = req.query.groupID;
  const studentIDs = req.body;
  dataFunctions.addStudentsToGroup(groupID, studentIDs)
    .then(answer => res.send(answer))
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.delete('/group/students', (req, res) => {
  const groupID = req.query.groupID;
  const studentIDs = req.body;
  dataFunctions.deleteStudentsToGroup(groupID, studentIDs)
    .then(answer => res.send(answer))
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Возвращает группы, принадлежащие учителю с количеством людей в них
router.get('/group', (req, res) => {
  dataFunctions.getTeachersGroups(req.user._id)
    .then((answer) => {
      res.send(JSON.stringify(answer));
    })
    .catch(err => res.status(500).send(err));
});

router.get('/group/info', async (req, res) => {
  try {
    const groupID = req.query.groupID;
    const result = await dataFunctions.getGroupInfo(groupID);
    res.send(JSON.stringify(result));
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get('/students', async (req, res) => {
  try {
    const result = await dataFunctions.getStudents();
    res.status(200).send(JSON.stringify(result));
  } catch (err) {
    req.status(400).send(err);
  }
});

router.post('/group', async (req, res) => {
  const groupName = req.query.groupName;
  const teacherId = req.query.teacherId;
  const studentArrayIds = req.body;
  console.log(studentArrayIds);
  try {
    const saveGroup = await dataFunctions.createGroup(groupName, teacherId);
    const updateGroup = await dataFunctions.addStudentsToGroup(saveGroup.id, studentArrayIds);
    res.status(200).json({ id: updateGroup.id });
  } catch (err) {
    if (err.toString() === 'Error: Duplicate key') {
      res.status(409).send(err.toString());
    } else {
      res.status(400).send(err.toString());
    }
  }
});

router.post('/task/tests', uploadFiles.uploadTests.array('tests'), async (req, res) => {
  if (req.files) {
    const count = req.files.length;
    const form = new FormData();

    for (let i = 0; i < count; i++) {
      await fileSystemFunctions.copyFile(`${req.files[i].destination}/${req.files[i].filename}`, `${req.files[i].destination}/${req.files[i].originalname}`);
      form.append('tests', fs.createReadStream(`${req.files[i].destination}/${req.files[i].originalname}`));
    }

    (async () => {
      try {
        const answer = await got.post(`http://localhost:3002/someExample?taskId=${req.query.taskId}`, { body: form });
        for (let i = 0; i < count; i++) {
          await fileSystemFunctions.deleteFile(`${req.files[i].destination}/${req.files[i].originalname}`);
        }
        res.status(200).send(answer.body);
      } catch (error) {
        res.status(400).send(error.toString());
      }
    })();
  }
});

module.exports = router;
