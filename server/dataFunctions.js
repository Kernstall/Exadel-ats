const mongoose = require('mongoose');
const Task = require('./models/Task');
const Question = require('./models/Question');
const Group = require('./models/Group');

exports.getStudentTasks = function (taskArrayStud) {
  const arrayTaskIds = [];
  taskArrayStud.forEach((elem) => {
    arrayTaskIds.push(elem.taskId);
  });

  return Task.find()
    .where('_id')
    .in(arrayTaskIds);
};

exports.addTask = function (req) {
  const task = new Task({
    description: req.description,
    name: req.name,
    weight: req.weight,
    topicId: req.topicId,
    language: req.language,
    tags: req.tags,
    tests: req.tests,
    passResult: req.passResult,
  });
  return task.save();
};

exports.addQuestion = function (req) {
  const question = new Question({
    creatorId: req.creatorId,
    topicId: req.topicId,
    tags: req.tags,
    description: req.description,
    correctAnswersIndexes: req.correctAnswersIndexes,
    answersVariants: req.answersVariants,
    kind: req.kind,
    correntAnswersCount: req.correntAnswersCount,
    wrongAnswersCount: req.wrongAnswersCount,
    difficultyRate: req.difficultyRate,
    isTraining: req.isTraining,
    isBlocked: req.isBlocked,
    haveCheckedReport: req.haveCheckedReport,
  });
  return question.save();
};

// На вход первым параметром поступает массив ключей, которые должны быть
// в объекте, вторым же параметром идёт массив объектов, ключи которого надо
// отфильтровать
exports.fieldFilter = function (keysArray, objectsArray) {
  return objectsArray.map(item => keysArray.reduce((obj, key) => {
    obj[key] = item[key];
    return obj;
  }, {}))
};
exports.addStudentsToGroup = function (groupID, studentIDs) {
  return Group.findByIdAndUpdate(groupID,
    { $push: { studentIdList: studentIDs } },
    { safe: true, upsert: true });
};

exports.deleteStudentsToGroup = function (groupID, studentIDs) {
  return Group.findByIdAndUpdate(groupID,
    { $pullAll: { studentIdList: studentIDs } },
    { safe: true, upsert: true });
};
