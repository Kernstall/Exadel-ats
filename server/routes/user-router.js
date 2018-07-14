const mongoose = require('mongoose');
const express = require('express');
const Student = require('../models/User');
const dataFunctions = require('../dataFunctions');

const router = express.Router();

router.get('/Tops', async (req, res) => {
  const result = {};
  result.tasksTop = await Student.find({ status: 'student' }, { firstName: true, lastName: 1, mediumTaskScore: 1 })
    .sort({ mediumTaskScore: -1 }).limit(10);
  const studentTaskFields = ['firstName', 'lastName', 'mediumTaskScore', 'id'];
  result.tasksTop = dataFunctions.fieldFilter(studentTaskFields, result.tasksTop);

  result.testsTop = await Student.find({ status: 'student' }, { firstName: 1, lastName: 1, mediumTestScore: 1 })
    .sort({ mediumTestScore: -1 }).limit(10);
  const studentTestFields = ['firstName', 'lastName', 'mediumTestScore', 'id'];
  result.testsTop = dataFunctions.fieldFilter(studentTestFields, result.testsTop);

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
        id: true,
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

  res.send(JSON.stringify(result));
});

module.exports = router;
