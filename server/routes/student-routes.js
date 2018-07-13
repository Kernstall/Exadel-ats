const express = require('express');

const router = express.Router();

const info = [{
  student: {
    firstName: 'Оля',
    lastName: 'Ветрова',
    university: 'БГУ',
    faculty: 'ФПМИ',
    course: '3',
    groupNamber: '6',
    graduateYear: '2020',
  },
  groups: [{
    name: 'Алгоритмы и структуры данных',
    count: '15',
  }, {
    name: 'Программирование на С++ 2017',
    count: '13',
  }],
}];


router.get('/top', (req, res) => {
  // TODO: get data from mongo db
  res.status(200).json(info).end();
});

router.post('/', (req, res) => {
  // find by id
  res.send(info);
});

module.exports = router;
