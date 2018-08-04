const mongoose = require('mongoose');
const fs = require('fs');
const Task = require('../models/Task');
const Question = require('../models/Question');
const Group = require('../models/Group');
const User = require('../models/User');
const Topic = require('../models/Topic');
const Activities = require('../models/Activity');
const TopicCourse = require('../models/TopicCourse');
const mapping = require('./mapping/map');

exports.commonSrcCodePath;
exports.commonTaskPath;

exports.initPaths = function initPaths(srcCodePath, taskPath) {
  exports.commonSrcCodePath = srcCodePath;
  exports.commonTaskPath = taskPath;
};

function compareByDate(a, b) {
  return new Date(b.date) - new Date(a.date);
}

exports.getStudentTasksByGroup = async (studentId, groupId) => {
  const tasks = await User.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(studentId) } },
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
      .populate('topicId', { _id: 0, name: 1 })
      .select({
        _id: 0,
        topicId: 1,
        name: 1,
        description: 1,
        weight: 1,
      });
  }

  const result = tasks[0].taskArray;
  let promissArray = [];
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

exports.getStudentHistoryByGroup = function getStudentHistoryByGroup(studentID, groupID) {
  const taskResult = User.findById(studentID)
    .populate('tasks.taskId', { _id: 0, name: 1 })
    .where({ 'tasks.groupId': { $eq: groupID } })
    .select({
      _id: 0,
      'tasks.groupId': 1,
      'tasks.taskId.name': 1,
      'tasks.attempts': 1,
      'tasks.taskId.weight': 1,
    });

  const testResult = User.findById(studentID)
    .populate('tests.topicsIds', { _id: 0, name: 1 })
    .select({
      _id: 0,
      'tests.groupId': 1,
      'tests.topicsIds': 1,
      'tests.date': 1,
      'tests.result': 1,
      'tests.status': 1,
    })
    .where({ 'tests.groupId': { $eq: groupID } });
  return Promise.all([taskResult, testResult]);
};

exports.deleteOtherGroupInfo = function deleteOtherGroupInfo(array, groupId) {
  let taskArray = [];
  let testArray = [];
  const result = [];
  if (array[0] != null) {
    taskArray = array[0].tasks.filter((elem) => {
      return String(elem.groupId) === String(groupId);
    });
    taskArray.forEach((task) => {
      task.attempts.forEach((attempt) => {
        result.push({
          name: task.taskId.name,
          // 'taskWeight': task.taskId.weight,
          isPassed: attempt.isPassed,
          date: attempt.date,
          // 'result': attempt.result,
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
        name: '',
        status,
        date: test.date,
        // 'result': test.result,
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
};

exports.createGroup = async (groupName, teacherId) => {
  try {
    const teacher = await User.findById(teacherId)
      .select({
        _id: 0,
        firstName: 1,
        lastName: 1,
        fathersName: 1,
      });

    const group = new Group({
      teacherId: mongoose.Types.ObjectId(teacherId),
      firstName: teacher.firstName,
      fathersName: teacher.lastName,
      lastName: teacher.lastName,
      groupName,
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
    .populate('userId', {
      _id: 0, lastName: 1, firstName: 1, fathersName: 1,
    })
    .select({
      _id: 0,
      date: 1,
      userType: 1,
      type: 1,
    });

  let result = [];

  tmp.forEach((elem) => {
    let name = '';
    if (elem.userId._doc.fathersName) {
      name = `${elem.userId._doc.lastName} ${elem.userId._doc.firstName} ${elem.userId._doc.fathersName}`;
    } else {
      name = `${elem.userId._doc.lastName} ${elem.userId._doc.firstName}`;
    }

    result.push({
      name, type: elem.type.slice(3), userType: elem.userType, date: elem.date,
    });
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

const isValidByQuestionsTypes = async (elem) => {
  const typeOne = Question.find({ topicId: mongoose.Types.ObjectId(elem.id), kind: 'one answer' });
  const typeTwo = Question.find({ topicId: mongoose.Types.ObjectId(elem.id), kind: 'multiple answers' });
  const typeThree = Question.find({ topicId: mongoose.Types.ObjectId(elem.id), kind: 'multiple answers' });
  const typeFour = Question.find({
    topicId: mongoose.Types.ObjectId(elem.id),
    kind: 'without answer with verification',
  });
  const result = await Promise.all([typeOne, typeTwo, typeThree, typeFour]);
  if (result[0].length === 0 || result[1].length === 0 || result[2].length === 0 || result[3].length === 0) {
    return { isValid: false, id: elem.id, name: elem.name };
  }
  return { isValid: true, id: elem.id, name: elem.name };
};

exports.getGroupStudentTests = async (studentId, groupId) => {
  try {
    const result = await User.find({ _id: mongoose.Types.ObjectId(studentId) })
      .populate('tests.topicsIds', { _id: 1, name: 1 })
      .select({
        _id: 0,
        'tests.result': 1,
        'tests.groupId': 1,
        'tests.isTraining': 1,
        'tests.status': 1,
      });
    const trainingTests = [];
    const notTrainingTests = [];
    let trCount = 0;
    let notTrCount = 0;
    let trSum = 0;
    let notTrSum = 0;
    const invalidTopicsIds = [];

    if (result.length !== 0) {
      for (let i = 0; i < result[0].tests.length; i++) {
        console.log(result[0].tests[i].isTraining);
        if (String(result[0].tests[i].groupId) === String(groupId)) {
          if (result[0].tests[i].isTraining) {
            trCount += 1;
            invalidTopicsIds.push(String(result[0].tests[i].topicsIds[0]._id));
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

    const topicCourseId = await Group.findById(groupId)
      .select({
        _id: 0,
        topicCourseIds: 1,
      });

    const groupTopicsIds1 = (await TopicCourse.findById(topicCourseId.topicCourseIds)
      .populate('topicsIds', { _id: 1, name: 1 })
      .select({
        _id: 0,
        name: 0,
        __v: 0,
      })).topicsIds;

    const topicsFilter1 = [];

    groupTopicsIds1.forEach((elem) => {
      const index = invalidTopicsIds.indexOf(String(elem.id));
      if (index === -1) {
        topicsFilter1.push(elem);
      }
    });

    const promiseArr = [];

    topicsFilter1.forEach((elem) => {
      promiseArr.push(isValidByQuestionsTypes(elem));
    });

    const resultQuestionTypeCheck = await Promise.all(promiseArr);

    const topicsFilter2 = [];

    resultQuestionTypeCheck.forEach((elem) => {
      if (elem.isValid === true) {
        topicsFilter2.push({ id: elem.id, name: elem.name });
      }
    });

    return [{
      name: 'Training tests',
      info: trainingTests,
      avgMark: trSum / trCount,
      availableTopics: topicsFilter2,
    }, {
      name: 'Examination tests',
      info: notTrainingTests,
      avgMark: notTrSum / notTrCount,
    }];
  } catch (e) {
    console.log(e.toString());
  }
};

function getExtension(fileName) {
  const index = fileName.indexOf('.');
  return fileName.slice(index);
}

exports.readFile = async (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
exports.readFileUTF = async (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

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
      answer[i].name = attemptInfo.files[i].slice(0, attemptInfo.files[i].indexOf('.'));
      answer[i].extension = getExtension(attemptInfo.files[i]);

      answer[i].fileContents = await exports.readFileUTF(`${exports.commonSrcCodePath}/${userId}/${taskId}/${attemptNumber}/src/${attemptInfo.files[i]}`);
    }
    return answer;
  } catch (e) {
    throw e;
  }
};

exports.getTaskInfo = async (taskId) => {
  try {
    const taskInfo = await Task.findById(taskId);
    const input = await exports.readFileUTF(`${exports.commonTaskPath}/${taskId}/${taskInfo.tests[0]._id}/input.txt`);
    const output = await exports.readFileUTF(`${exports.commonTaskPath}/${taskId}/${taskInfo.tests[0]._id}/output.txt`);
    const result = mapping.mapTaskAndTestsToDto(taskInfo, input, output);
    return result;
  } catch (e) {
    throw e;
  }
};

exports.getUsersTasksAttemptNumber = async (userId, taskId) => {
  // console.log(userId);
  const result = await User.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(userId) } },
    {
      $project: {
        _id: 0,
        taskArray: {
          $filter: {
            input: '$tasks',
            as: 'task',
            cond: { $eq: ['$$task.taskId', mongoose.Types.ObjectId(taskId)] },
          },
        },
      },
    },
  ]);
  return result[0].taskArray[0].attempts.length;
};

exports.getFullTaskInfo = async (taskId) => {
  try {
    const taskInfo = await Task.findById(taskId)
      .populate('topicId', { name: 1 })
      .select({
        _id: 0,
        topicId: 1,
        name: 1,
        description: 1,
        weight: 1,
        tags: 1,
        tests: 1,
      });
    if (taskInfo.topicId) {
      taskInfo.topicName = taskInfo.topicId.name;
      taskInfo.topId = taskInfo.topicId.id;
    }

    for (let index = 0; index < taskInfo.tests.length; index++) {
      const buff = {};
      buff._id = taskInfo.tests[index]._id;
      buff.weight = taskInfo.tests[index].weight;
      buff.input = await exports.readFileUTF(`${exports.commonTaskPath}/${taskId}/${taskInfo.tests[index]._id}/input.txt`);
      buff.output = await exports.readFileUTF(`${exports.commonTaskPath}/${taskId}/${taskInfo.tests[index]._id}/output.txt`);
      taskInfo.tests[index] = buff;
    }
    const result = {
      name: taskInfo.name,
      description: taskInfo.description,
      weight: taskInfo.weight,
      tags: taskInfo.tags,
      tests: taskInfo.tests,
      topicName: taskInfo.topicName,
      topicId: taskInfo.topId,
    };

    return result;
  } catch (e) {
    throw e;
  }
};

const compileProcessing = (testsResult, taskWeight) => {
  let mark = 0;
  let isPassedFlag = false;
  const isPassedValue = 0.4;
  let maxValue = 0;
  let currentValue = 0;

  testsResult.forEach((elem) => {
    maxValue += elem.weight;
    if (elem.success) {
      currentValue += elem.weight;
    }
  });

  mark = (currentValue / maxValue) * taskWeight;
  if (mark >= 0.4) {
    isPassedFlag = true;
  }
  return { isPassed: isPassedFlag, result: mark };
};

exports.saveAttemptInfo = async (userId, taskId, attemptNumber, mainFile, files, testsResult, bestResult, taskWeight) => {
  try {
    const result = compileProcessing(testsResult, taskWeight);
    result.result = 8;
    if (result.result > bestResult) {
      await User.update(
        { _id: mongoose.Types.ObjectId(userId), 'tasks.taskId': taskId },
        { $set: { 'tasks.$.bestResult': result.result } },
      );
    }
    const obj = {};
    obj.date = new Date();
    obj.number = attemptNumber + 1;
    obj.mainFile = mainFile;
    obj.result = result.result;
    obj.isPassed = result.isPassed;
    obj.files = [];
    obj.tests = testsResult;
    files.forEach((elem) => {
      obj.files.push(elem.originalname);
    });

    const answer = await User.update(
      { _id: mongoose.Types.ObjectId(userId), 'tasks.taskId': taskId },
      { $push: { 'tasks.$.attempts': obj } },
    );
    return obj;
  } catch (e) {
    console.log(e.toString());
  }
};

exports.getstudentTaskInfo = async (userId, taskId) => {
  const task = await User.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(userId) } },
    {
      $project: {
        _id: 0,
        taskArray: {
          $filter: {
            input: '$tasks',
            as: 'task',
            cond: { $eq: ['$$task.taskId', mongoose.Types.ObjectId(taskId)] },
          },
        },
      },
    },
  ]);
  return task;
};

exports.getTaskTests = async (taskId) => {
  const answer = await Task.findById(taskId)
    .select({
      _id: 0,
      tests: 1,
      language: 1,
      weight: 1,
    });
  return answer;
};

exports.filterTeacher = async (skip, limit, body) => {
  const filter = body;
  filter.status = 'teacher';
  let result;
  if (limit > 0) {
    result = await User.find(filter).limit(limit).skip(skip);
  } else {
    result = await User.find(filter);
  }
  return result;
};
exports.filterStudent = async (skip, limit, body) => {
  let result;
  const filter = body;
  filter.status = 'student';
  if (limit > 0) {
    result = await User.find(filter).limit(limit).skip(skip);
  } else {
    result = await User.find(filter);
  }
  return result;
};
exports.filterGroup = async (skip, limit, body) => {
  let result;
  if (limit > 0) {
    result = await Group.find(body).limit(limit).skip(skip);
  } else {
    result = await Group.find(body);
  }
  return result;
};
exports.filterTask = async (skip, limit, body) => {
  let result;
  if (limit > 0) {
    result = await Task.find(body).limit(limit).skip(skip);
  } else {
    result = await Task.find(body);
  }
  return result;
};
exports.filterQuestion = async (skip, limit, body) => {
  let result;
  if (limit > 0) {
    result = await Question.find(body).limit(limit).skip(skip);
  } else {
    result = await Question.find(body);
  }
  return result;
};
exports.getAllTopics = async () => {
  const answer = await Topic.find({})
    .select({
      _id: 1,
      name: 1,
    });
  return answer;
};

const checkQuestion = (reqBody) => {
  const commonFields = ['topicId', 'tags', 'description', 'kind', 'isTraining', 'difficultyRate'];
  let flag = true;
  commonFields.forEach((elem) => {
    if (!reqBody[elem]) {
      flag = false;
    }
  });
  if (!flag) {
    return false;
  }
  const type1_2 = ['correctAnswersIndexes', 'answersVariants'];
  const type3 = ['answersVariants'];
  if (reqBody.kind === 'one answer' || reqBody.kind === 'multiple answers') {
    type1_2.forEach((elem) => {
      if (!reqBody[elem]) {
        flag = false;
      }
    });
  }
  if (!flag) {
    return false;
  }
  if (reqBody.kind === 'without answer option') {
    type3.forEach((elem) => {
      if (!reqBody[elem]) {
        flag = false;
      }
    });
  }
  if (!flag) {
    return false;
  }
  return true;
};

exports.createQuestion = async (creatorId, reqBody) => {
  try {
    if (checkQuestion(reqBody)) {
      reqBody.creatorId = mongoose.Types.ObjectId(creatorId);
      reqBody.correntAnswersCount = 0;
      reqBody.wrongAnswersCount = 0;
      reqBody.isBlocked = false;
      reqBody.haveCheckedReport = false;
      const record = new Question(reqBody);

      await record.save();
    } else {
      throw new Error('Missing field');
    }
  } catch (e) {
    throw e;
  }
};

exports.getGroupsAndStudents = async (teacherId) => {
  try {
    let groups = await Group.find({ teacherId }).populate('studentIdList', ['_id', 'firstName', 'lastName']);
    let students = [];
    groups.forEach(el => el.studentIdList.forEach(stud => students.push({
      studentInfo: `${stud._id.toString()}_${el._id}`,
      studentName: `${stud.lastName} ${stud.firstName} (${el.groupName})`,
    })));
    groups = groups.map(el => el = mapping.mapGroupForChooseToDto(el));
    return { groups, students };
  } catch (err) {
    return err;
  }
};

function random(num) {
  return Math.floor(Math.random() * num);
}
function arrRandom(arr, count) {
  let a = arr.slice();
  while (a.length > count) a.splice(random(a.length - 1), 1);
  return a;
}

exports.getRandomTest = async (topicId, count) => {
  const typeOne = Question.find({ topicId, kind: 'one answer' }).select({ _id: 1 });
  const typeTwo = Question.find({ topicId, kind: 'multiple answers' }).select({ _id: 1 });
  const typeThree = Question.find({ topicId, kind: 'without answer option' }).select({ _id: 1 });
  const typeFour = Question.find({ topicId, kind: 'without answer with verification' }).select({ _id: 1 });
  const result = await Promise.all([typeOne, typeTwo, typeThree, typeFour]);
  if (result[0].length === 0 || result[1].length === 0 || result[2].length === 0
    || result[3].length === 0) {
    throw new Error('Недостаточно вопросов');
  }
  const firstQuestions = [result[0][random(result[0].length)], result[1][random(result[1]
    .length)], result[2][random(result[2].length)], result[2][random(result[2].length)]];
  const notSearch = firstQuestions.map(el => el = el._id);
  const all = await Question.find({
    topicId,
    _id: { $nin: notSearch },
  }).select({ _id: 1 });
  const test = [...firstQuestions, ...arrRandom(all, count - 4)].map((el) => { return { questionId: el._id }; });
  return test;
};
