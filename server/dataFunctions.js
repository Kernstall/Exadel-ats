const mongoose = require('mongoose');
const Task = require('./models/Task');
const Question = require('./models/Question');
const Group = require('./models/Group');
const User = require('./models/User');
const Topic = require('./models/Topic');

exports.getStudentTasks = function (taskArrayStud) {
  const arrayTaskIds = [];
  taskArrayStud.forEach((elem) => {
    arrayTaskIds.push(elem.taskId);
  });

  return Task.find()
    .where('_id')
    .in(arrayTaskIds);
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
      {$match: {teacherId: mongoose.Types.ObjectId(_teacherID)}},
      {
        $project: {
          groupName: 1,
          studentCount: {$size: '$studentIdList'},
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

  result.tasksTop = await User.find({status: 'student'}, {firstName: true, lastName: 1, mediumTaskScore: 1})
    .sort({mediumTaskScore: -1}).limit(10);
  const studentTaskFields = ['firstName', 'lastName', 'mediumTaskScore', '_id'];
  result.tasksTop = exports.fieldFilter(studentTaskFields, result.tasksTop);

  result.testsTop = await User.find({status: 'student'}, {firstName: 1, lastName: 1, mediumTestScore: 1})
    .sort({mediumTestScore: -1}).limit(10);
  const studentTestFields = ['firstName', 'lastName', 'mediumTestScore', '_id'];
  result.testsTop = exports.fieldFilter(studentTestFields, result.testsTop);

  result.activitiesTop = await User.aggregate([
    {$match: {status: 'student'}},
    {
      $project: {
        activity: {
          $let: {
            vars: {
              taskActivity: {
                $reduce: {
                  input: '$tasks',
                  initialValue: 0,
                  in: {$add: ['$$value', {$size: '$$this.attempts'}]},
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
            in: {$add: ['$$taskActivity', '$$testActivity']},
          },
        }, // end of activity field
        firstName: true,
        lastName: true,
      },
    },
    {
      $sort: {activity: -1},
    },
    {
      $limit: 10,
    },
  ]).allowDiskUse(true);

  result.marksTop = await User.aggregate([
    {$match: {status: 'student'}},
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
      $sort: {marks: -1},
    },
    {$limit: 10},
  ]);

  return result;
};

exports.getGroupInfo = async (groupID) => {
  const result = {};

  const group = await Group.findById(groupID).populate('studentIdList');
  console.log(group.studentIdList[0].firstName);
};

exports.getStudentHistoryByGroup = function (studentID, groupID) {
  const taskResult = User.findById(studentID)
    .populate('tasks.taskId', {'_id': 0, 'name': 1})
    .where({'tasks.groupId': {$eq: groupID}})
    .select({
      '_id': 0,
      'tasks.groupId': 1,
      'tasks.taskId.name': 1,
      'tasks.attempts': 1,
    });

  const testResult = User.findById(studentID)
    .populate('tests.topicsIds', {'_id': 0, 'name': 1})
    .select({
      '_id': 0,
      'tests.groupId': 1,
      'tests.topicsIds': 1,
      'tests.date': 1,
      'tests.result': 1,
      'tests.status': 1,
    })
    .where({'tests.groupId': {$eq: groupID}});
  return Promise.all([taskResult, testResult]);
};

exports.deleteOtherGroupInfo = function (array, groupId) {
  const taskArray = [];
  const testArray = [];
  if (array[0] != null) {
    array[0].tasks.forEach((elem) => {
      if (String(elem.groupId) === String(groupId)) {
        taskArray.push(elem);
      }
    });
  }
  if (array[1] != null) {
    array[1].tests.forEach((elem) => {
      if (String(elem.groupId) === String(groupId)) {
        testArray.push(elem);
      }
    });
  }
  return { taskArray, testArray };
};
