const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  // find by id
  const info = {
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
  };
  res.send(info);
});
