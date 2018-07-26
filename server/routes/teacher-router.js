const express = require('express');
const Task = require('../models/Task');
const Topic = require('../models/Topic');
const Question = require('../models/Question');
const mapping = require('../utils/mapping/student');
const User = require('../models/User');
const dataFunctions = require('../dataFunctions');

const router = express.Router();

/*
router.use((req, res, next) => {
  if (req.user.status !== 'teacher') {
    return res.status(403).end();
  }
  return next();
});
*/

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
  const teacherID = req.query.teacherID;
  dataFunctions.getTeachersGroups(teacherID)
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
  const teacherId = req.user.teacherId;
  const studentArrayIds = req.body;
  try {
    const saveGroup = await dataFunctions.createGroup(groupName, teacherId);
    const updateGroup = await dataFunctions.addStudentsToGroup(saveGroup.id, studentArrayIds);
    res.status(200).send(JSON.stringify(updateGroup.id));
  } catch (err) {
    if (err.toString() === 'Error: Duplicate key') {
      res.status(409).send(err.toString());
    } else {
      res.status(400).send(err.toString());
    }
  }
});

module.exports = router;
