const mongoose = require('mongoose');
const Task = require('./models/Task');
const Question = require('./models/Question');
const Group = require('./models/Group');
const User = require('./models/User');
const Topic = require('./models/Topic');
const Activities = require('./models/Activity');
const fs = require('fs');

function compareByDate(a, b) {
  return new Date(b.date) - new Date(a.date);
}

exports.getStudentTasksByGroup = async (studentId, groupId) => {
  const tasks = await User.aggregate([
    { $match: { '_id': mongoose.Types.ObjectId(studentId) } },
    {
      $project: {
        _id: 0,
        taskArray: {
          $filter: {
            input: '$tasks',
            as: 'task',
            cond: { $eq: ['$$task.groupId', mongoose.Types.ObjectId(groupId)] },
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        'taskArray.taskId': 1,
        'taskArray.isPassed': 1,
        'taskArray.bestResult': 1,
        'taskArray.attempts': 1,
      },
    },
  ]);

  function getInfoByTaskID(taskId) {
    return Task.findById(taskId)
      .populate('topicId', { '_id': 0, 'name': 1 })
      .select({
        '_id': 0,
        'topicId': 1,
        'name': 1,
        'description': 1,
        'weight': 1,
      });
  }

  const result = tasks[0].taskArray;
  let promissArray = []
  if (tasks.length !== 0) {
    for (let i = 0; i < result.length; i++) {
      promissArray.push(getInfoByTaskID(result[i].taskId));
    }
    promissArray = await Promise.all(promissArray);
    for (let i = 0; i < result.length; i++) {
      console.log(promissArray[i]);
      result[i].name = promissArray[i].name;
      result[i].description = promissArray[i].description;
      result[i].theme = promissArray[i].topicId.name;
      result[i].weight = promissArray[i].weight;
    }
  }

  return result;
};

// На вход первым параметром поступает массив ключей, которые должны быть
// в объекте, вторым же параметром идёт массив объектов, ключи которого надо
// отфильтровать
exports.fieldFilter = (keysArray, objectsArray) => {
  return objectsArray.map(item => keysArray.reduce((obj, key) => {
    obj[key] = item[key];
    return obj;
  }, {}));
};

exports.getTeachersGroups = (_teacherID) => {
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

  result.tasksTop = await User.find({ status: 'student' }, { firstName: true, lastName: 1, mediumTaskScore: 1 })
    .sort({ mediumTaskScore: -1 }).limit(10);
  const studentTaskFields = ['firstName', 'lastName', 'mediumTaskScore', '_id'];
  result.tasksTop = exports.fieldFilter(studentTaskFields, result.tasksTop);

  result.testsTop = await User.find({ status: 'student' }, { firstName: 1, lastName: 1, mediumTestScore: 1 })
    .sort({ mediumTestScore: -1 }).limit(10);
  const studentTestFields = ['firstName', 'lastName', 'mediumTestScore', '_id'];
  result.testsTop = exports.fieldFilter(studentTestFields, result.testsTop);

  result.activitiesTop = await User.aggregate([
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

  result.marksTop = await User.aggregate([
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
  const request = (await Group.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(groupID) } },
    {
      $project: {
        groupName: true,
        amountOfStudents: { $size: '$studentIdList' },
        studentIdList: true,
      },
    },
  ]));
  let result;
  if (request.length !== 0) {
    result = request[0];
  } else {
    return null;
  }

  function promiseCollector(student) {
    return User.aggregate([
      { $match: { _id: student._id } },
      {
        $project: {
          firstName: true,
          lastName: true,
          amountOfTests: {
            $reduce: {
              input: '$tests',
              initialValue: 0,
              in: {
                $cond: {
                  if: {
                    $eq: ['$$this.groupId', mongoose.Types.ObjectId(groupID)],
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
          }, // Конец подсчёта тестов
          amountOfTasks: {
            $reduce: {
              input: '$tasks',
              initialValue: 0,
              in: {
                $cond: {
                  if: {
                    $eq: ['$$this.groupId', mongoose.Types.ObjectId(groupID)],
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
          }, // Конец подсчёта заданий
          testsMarkSum: {
            $reduce: {
              input: '$tests',
              initialValue: 0,
              in: {
                $cond: {
                  if: {
                    $eq: ['$$this.groupId', mongoose.Types.ObjectId(groupID)],
                  },
                  then: {
                    $add: ['$$value', '$$this.result'],
                  },
                  else: {
                    $add: ['$$value', 0],
                  },
                },
              },
            },
          }, // Конец подсчёта суммы оценок за тесты
          tasksMarkSum: {
            $reduce: {
              input: '$tasks',
              initialValue: 0,
              in: {
                $cond: {
                  if: {
                    $eq: ['$$this.groupId', mongoose.Types.ObjectId(groupID)],
                  },
                  then: {
                    $add: ['$$value', '$$this.bestResult'],
                  },
                  else: {
                    $add: ['$$value', 0],
                  },
                },
              },
            },
          },
        },
      },
      {
        $project: {
          firstName: true,
          lastName: true,
          amountOfTests: true,
          amountOfTasks: true,
          mediumTestMark: {
            $cond: {
              if: {
                $eq: ['$amountOfTests', 0],
              },
              then: 0,
              else: {
                $divide: [
                  '$testsMarkSum',
                  '$amountOfTests',
                ],
              },
            },
          },
          mediumTaskMark: {
            $cond: {
              if: {
                $eq: ['$amountOfTasks', 0],
              },
              then: 0,
              else: {
                $divide: [
                  '$tasksMarkSum',
                  '$amountOfTasks',
                ],
              },
            },
          },
          mediumMark: {
            $cond: {
              if: {
                $eq: [{ $add: ['$amountOfTasks', '$amountOfTests'] }, 0],
              },
              then: 0,
              else: {
                $divide: [
                  { $add: ['$tasksMarkSum', '$testsMarkSum'] },
                  { $add: ['$amountOfTasks', '$amountOfTests'] },
                ],
              },
            },
          },
        },
      },
    ]);
  }

  for (let index = 0; index < result.studentIdList.length; index++) {
    result.studentIdList[index] = promiseCollector(result.studentIdList[index]);
  }

  result.studentIdList = await Promise.all(result.studentIdList);
  result.studentIdList = result.studentIdList.map(item => item[0]);

  Object.defineProperty(result, 'studentList',
    Object.getOwnPropertyDescriptor(result, 'studentIdList'));
  delete result.studentIdList;

  return result;
};

exports.getStudentHistoryByGroup = function (studentID, groupID) {
  const taskResult = User.findById(studentID)
    .populate('tasks.taskId', { '_id': 0, 'name': 1 })
    .where({ 'tasks.groupId': { $eq: groupID } })
    .select({
      '_id': 0,
      'tasks.groupId': 1,
      'tasks.taskId.name': 1,
      'tasks.attempts': 1,
      'tasks.taskId.weight': 1,
    });

  const testResult = User.findById(studentID)
    .populate('tests.topicsIds', { '_id': 0, 'name': 1 })
    .select({
      '_id': 0,
      'tests.groupId': 1,
      'tests.topicsIds': 1,
      'tests.date': 1,
      'tests.result': 1,
      'tests.status': 1,
    })
    .where({ 'tests.groupId': { $eq: groupID } });
  return Promise.all([taskResult, testResult]);
};

exports.deleteOtherGroupInfo = function (array, groupId) {
  let taskArray = [];
  let testArray = [];
  let result = [];
  if (array[0] != null) {
    taskArray = array[0].tasks.filter((elem) => {
      return String(elem.groupId) === String(groupId);
    });
    taskArray.forEach((task) => {
      task.attempts.forEach((attempt) => {
        result.push({
          'name': task.taskId.name,
          //'taskWeight': task.taskId.weight,
          'isPassed': attempt.isPassed,
          'date': attempt.date,
          //'result': attempt.result,
        });
      });
    });
  }
  if (array[1] != null) {
    testArray = array[1].tests.filter((elem) => {
      return String(elem.groupId) === String(groupId);
    });
    testArray.forEach((test) => {
      let status = test.status;
      if (status !== 'passed') {
        status = false;
      } else {
        status = true;
      }
      result.push({
        'name': '',
        'status': status,
        'date': test.date,
        //'result': test.result,
      });

      test.topicsIds.forEach((topic) => {
        result[result.length - 1].name += ` ${topic.name}`;
      });
    });
  }
  return result.sort(compareByDate);
};

exports.getStudents = async () => {
  const answer = await User.find({ status: 'student' })
    .select({
      firstName: 1,
      lastName: 1,
      email: 1,
      university: 1,
      faculty: 1,
      graduateYear: 1,
    });
  return answer;
}

exports.createGroup = async (groupName, teacherId) => {
  try {
    const teacher = await User.findById(teacherId)
      .select({
        '_id': 0,
        'firstName': 1,
        'lastName': 1,
        'fathersName': 1,
      });

    const group = new Group({
      teacherId: mongoose.Types.ObjectId(teacherId),
      firstName: teacher.firstName,
      fathersName: teacher.lastName,
      lastName: teacher.lastName,
      groupName: groupName,
      studentIdList: [],
      topicCourseIds: [],
    });
    let saveGroup = {};
    try {
      saveGroup = await group.save();
    } catch (e) {
      throw new Error('Duplicate key');
    }

    return saveGroup;
  } catch (e) {
    throw e;
  }
};

exports.getUsersActivities = async (name, role, activityType) => {
  const tmp = await Activities.find({})
    .populate('userId', { '_id': 0, 'lastName': 1, 'firstName': 1, 'fathersName': 1 })
    .select({
      '_id': 0,
      'date': 1,
      'userType': 1,
      'type': 1,
    });

  let result = [];

  tmp.forEach((elem) => {
    let name = '';
    if (elem.userId._doc.fathersName) {
      name = `${elem.userId._doc.lastName} ${elem.userId._doc.firstName} ${elem.userId._doc.fathersName}`;
    } else {
      name = `${elem.userId._doc.lastName} ${elem.userId._doc.firstName}`;
    }

    result.push({ 'name': name, 'type': elem.type.slice(3), 'userType': elem.userType, 'date': elem.date });
  });

  if (name) {
    result = result.filter((elem) => {
      return elem.name === name;
    });
  }

  if (role) {
    result = result.filter((elem) => {
      return elem.userType === role;
    });
    console.log(result);
  }

  if (activityType) {
    result = result.filter((elem) => {
      return elem.type === activityType;
    });
  }

  result.sort(compareByDate);

  return result;
};

exports.getStudents = async () => {
  const answer = await User.find({ status: 'student' })
    .select({
      firstName: 1,
      lastName: 1,
      email: 1,
      university: 1,
      faculty: 1,
      graduateYear: 1,
    });
  return answer;
};

exports.getGroupStudentTests = async (studentId, groupId) => {
  const result = await User.find({ _id: mongoose.Types.ObjectId(studentId) })
    .populate('tests.topicsIds', { _id: 0, name: 1 })
    .select({
      _id: 0,
      'tests.result': 1,
      'tests.groupId': 1,
      'tests.isTraining': 1,
      'tests.status': 1,
    });
  let trainingTests = [];
  let notTrainingTests = [];
  let trCount = 0;
  let notTrCount = 0;
  let trSum = 0;
  let notTrSum = 0;

  if (result.length !== 0) {
    for (let i = 0; i < result[0].tests.length; i++) {
      console.log(result[0].tests[i].isTraining);
      if (String(result[0].tests[i].groupId) === String(groupId)) {
        if (result[0].tests[i].isTraining) {
          trCount += 1;
          trSum += result[0].tests[i].result;
          trainingTests.push({
            topicsNames: result[0].tests[i].topicsIds,
            status: result[0].tests[i].status,
            result: result[0].tests[i].result,
          });
        } else {
          notTrCount += 1;
          notTrSum += result[0].tests[i].result;
          notTrainingTests.push({
            topicsNames: result[0].tests[i].topicsIds,
            status: result[0].tests[i].status,
            result: result[0].tests[i].result,
          });
        }
      }
    }
  }

  return [{
    name: 'Training tests',
    info: trainingTests,
    avgMark: trSum / trCount,
  }, {
    name: 'Examination tests',
    info: notTrainingTests,
    avgMark: notTrSum / notTrCount,
  }];
};

function getExtension(fileName) {
  const index = fileName.indexOf('.');
  return fileName.slice(index);
}

function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

exports.getAttemptsCodes = async (userId, taskId, attemptNumber) => {
  try {
    const userInfo = await User.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(userId) } },
      {
        $project: {
          taskInfo: {
            $filter: {
              input: '$tasks',
              as: 'task',
              cond: { $eq: ['$$task.taskId', mongoose.Types.ObjectId(taskId)] },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          'taskInfo.attempts': 1,
        },
      },
    ]);
    if (userInfo[0].taskInfo.length === 0 || !userInfo[0].taskInfo[0].attempts[attemptNumber - 1]) {
      return [];
    }
    const attemptInfo = userInfo[0].taskInfo[0].attempts[attemptNumber - 1];
    const answer = [];
    for (let i = 0; i < attemptInfo.files.length; i++) {
      answer.push({});
      answer[i].name = attemptInfo.files[i];
      answer[i].extension = getExtension(attemptInfo.files[i]);
      answer[i].fileContents = await readFile(`dataFileStorage\\srcCodes\\${userId}\\${taskId}\\${attemptNumber}\\src\\${attemptInfo.files[i]}`);
    }
    return answer;
  } catch (e) {
    throw e;
  }
};
