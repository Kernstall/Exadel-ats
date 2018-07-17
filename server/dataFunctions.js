const mongoose = require('mongoose');
const Task = require('./models/Task');
const Question = require('./models/Question');
const Group = require('./models/Group');
const Student = require('./models/User');

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
  }, {}));
};

exports.getTeachersGroups = function (_teacherID) {
  return Group.aggregate(
    [
      { $match: { teacherId: mongoose.Types.ObjectId(_teacherID) } },
      {
        $project: {
          groupName: 1,
          studentCount: { $size: '$studentIdList' },
        },
      },
    ],
  );
};


exports.addStudentsToGroup = (groupID, studentIDs) => Group.findByIdAndUpdate(groupID,
  { $push: { studentIdList: studentIDs } },
  { safe: true, upsert: true });

exports.deleteStudentsToGroup = (groupID, studentIDs) => Group.findByIdAndUpdate(groupID,
  { $pullAll: { studentIdList: studentIDs } },
  { safe: true, upsert: true });

exports.getTopTenStudents = async () => {
  const result = {};

  result.tasksTop = await Student.find({ status: 'student' }, { firstName: true, lastName: 1, mediumTaskScore: 1 })
    .sort({ mediumTaskScore: -1 }).limit(10);
  const studentTaskFields = ['firstName', 'lastName', 'mediumTaskScore', '_id'];
  result.tasksTop = exports.fieldFilter(studentTaskFields, result.tasksTop);

  result.testsTop = await Student.find({ status: 'student' }, { firstName: 1, lastName: 1, mediumTestScore: 1 })
    .sort({ mediumTestScore: -1 }).limit(10);
  const studentTestFields = ['firstName', 'lastName', 'mediumTestScore', '_id'];
  result.testsTop = exports.fieldFilter(studentTestFields, result.testsTop);

  result.activitiesTop = await Student.aggregate([
    { $match: { status: 'student' } },
    {
      $project: {
        activity: {
          $let: {
            vars: {
              taskActivity: {
                $reduce: {
                  input: '$tasks',
                  initialValue: 0,
                  in: { $add: ['$$value', { $size: '$$this.attempts' }] },
                },
              },
              testActivity: {
                $reduce: {
                  input: '$tests',
                  initialValue: 0,
                  in: {
                    $cond: {
                      if: {
                        $ne: ['$$this.status', 'notSent'],
                      },
                      then: {
                        $add: ['$$value', 1],
                      },
                      else: {
                        $add: ['$$value', 0],
                      },
                    },
                  },
                },
              },
            }, // end of vars
            in: { $add: ['$$taskActivity', '$$testActivity'] },
          },
        }, // end of activity field
        firstName: true,
        lastName: true,
      },
    },
    {
      $sort: { activity: -1 },
    },
    {
      $limit: 10,
    },
  ]).allowDiskUse(true);

  result.marksTop = await Student.aggregate([
    { $match: { status: 'student' } },
    {
      $project: {
        marks: {
          $divide: [
            {
              $add: ['$mediumTaskScore', '$mediumTestScore'],
            },
            2,
          ],
        },
        firstName: true,
        lastName: true,
      },
    },
    {
      $sort: { marks: -1 },
    },
    { $limit: 10 },
  ]);

  return result;
};

exports.getGroupInfo = async (groupID) => {
  const result = {};

  const group = await Group.findById(groupID).populate('studentIdList');
  console.log(group.studentIdList[0].firstName);
};
