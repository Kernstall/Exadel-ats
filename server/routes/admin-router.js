const express = require('express');
const Excel = require('exceljs');
const mapping = require('../utils/mapping/map');
const dataFunctions = require('../utils/dataFunctions');

const router = express.Router();

router.use((req, res, next) => {
  if (req.user.status !== 'admin') {
    return res.status(403).end();
  }
  return next();
});

router.get('/activities', async (req, res) => {
  const name = req.query.name;
  const role = req.query.role;
  const activityType = req.query.activityType;
  try {
    const result = await dataFunctions.getUsersActivities(name, role, activityType);
    res.status(200).send(JSON.stringify(result));
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.post('/teachers', async (req, res) => {
  if (!req.query.skip) {
    return res.status(400).end();
  }
  try {
    const skip = parseInt(req.query.skip, 10);
    let result = await dataFunctions.filterTeacher(skip, 15, req.body);
    result = result.map(element => element = mapping.mapTeachersToDto(element));
    return res.send(result);
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
});

router.post('/students', async (req, res) => {
  if (!req.query.skip) {
    return res.status(400).end();
  }
  try {
    const skip = parseInt(req.query.skip, 10);
    let result = await dataFunctions.filterStudent(skip, 15, req.body);
    result = result.map(element => element = mapping.mapStudentsToDto(element));
    return res.send(result);
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
});

router.post('/groups', async (req, res) => {
  if (!req.query.skip) {
    return res.status(400).end();
  }
  try {
    const skip = parseInt(req.query.skip, 10);
    let result = await dataFunctions.filterGroup(skip, 15, req.body);
    result = result.map(element => element = mapping.mapGroupsToDto(element));
    return res.send(result);
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
});

router.post('/tasks', async (req, res) => {
  if (!req.query.skip) {
    return res.status(400).end();
  }
  try {
    const skip = parseInt(req.query.skip, 10);
    let result = await dataFunctions.filterTask(skip, 15, req.body);
    result = result.map(element => element = mapping.mapTasksToDto(element));
    return res.send(result);
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
});

router.post('/questions', async (req, res) => {
  if (!req.query.skip) {
    return res.status(400).end();
  }
  try {
    const skip = parseInt(req.query.skip, 10);
    let result = await dataFunctions.filterQuestion(skip, 15, req.body);
    result = result.map(element => element = mapping.mapQuestionsToDto(element));
    return res.send(result);
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
});

router.post('/statistics/teachers', async (req, res) => {
  try {
    let result = await dataFunctions.filterTeacher(0, 0, req.body);
    result = result.map(element => element = mapping.mapTeachersToDto(element));
    const options = {
      filename: 'server/routes/teacher-workbook.xlsx',
      useStyles: true,
      useSharedStrings: true,
    };
    const workbook = new Excel.stream.xlsx.WorkbookWriter(options);
    const worksheet = workbook.addWorksheet('Учителя');
    worksheet.columns = [
      { header: 'Фамилия', key: 'lastName', width: 20 },
      { header: 'Имя', key: 'firstName', width: 20 },
      { header: 'Отчество', key: 'fathersName', width: 20 },
      { header: 'Почта', key: 'email', width: 30 },
      { header: 'Университет', key: 'university', width: 15 },
      { header: 'Количество ожидающих тестов', key: 'numberTestsToCheck', width: 30 },
    ];
    result.forEach((elem) => {
      worksheet.addRow({
        lastName: elem.lastName,
        firstName: elem.firstName,
        fathersName: elem.fathersName,
        email: elem.email,
        university: elem.university,
        numberTestsToCheck: elem.numberTestsToCheck,
      });
    });
    await worksheet.commit();
    const fileName = 'teacher-workbook.xlsx';
    return workbook.commit().then(async () => {
      const data = await dataFunctions.readFile(`${__dirname}/${fileName}`);
      res.contentType('application/vnd.ms-excel');
      return res.send(data);
    });
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
});

router.post('/statistics/students', async (req, res) => {
  try {
    let result = await dataFunctions.filterStudent(0, 0, req.body);
    result = result.map(element => element = mapping.mapStudentsToDto(element));
    const options = {
      filename: 'server/routes/student-workbook.xlsx',
      useStyles: true,
      useSharedStrings: true,
    };
    const workbook = new Excel.stream.xlsx.WorkbookWriter(options);
    const worksheet = workbook.addWorksheet('Студенты');
    worksheet.columns = [
      { header: 'Фамилия Имя', key: 'name', width: 25 },
      { header: 'Университет', key: 'university', width: 20 },
      { header: 'Факультет', key: 'faculty', width: 15 },
      { header: 'Год окончание', key: 'graduateYear', width: 20 },
      { header: 'Средний балл по задачам', key: 'mediumTaskScore', width: 30 },
      { header: 'Средний балл по тестам', key: 'mediumTestScore', width: 30 },
    ];
    result.forEach((elem) => {
      worksheet.addRow({
        name: `${elem.lastName} ${elem.firstName}`,
        university: elem.university,
        faculty: elem.faculty,
        graduateYear: elem.graduateYear,
        mediumTaskScore: elem.mediumTaskScore,
        mediumTestScore: elem.mediumTestScore,
      });
    });
    await worksheet.commit();
    const fileName = 'student-workbook.xlsx';
    return workbook.commit().then(async () => {
      const data = await dataFunctions.readFile(`${__dirname}/${fileName}`);
      res.contentType('application/vnd.ms-excel');
      return res.send(data);
    });
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
});

router.post('/statistics/groups', async (req, res) => {
  try {
    let result = await dataFunctions.filterGroup(0, 0, req.body);
    result = result.map(element => element = mapping.mapGroupsToDto(element));
    const options = {
      filename: 'server/routes/group-workbook.xlsx',
      useStyles: true,
      useSharedStrings: true,
    };
    const workbook = new Excel.stream.xlsx.WorkbookWriter(options);
    const worksheet = workbook.addWorksheet('Группы');
    worksheet.columns = [
      { header: 'Имя группы', key: 'groupName', width: 25 },
      { header: 'ФИО учителя', key: 'teacherName', width: 40 },
      { header: 'Количество студентов', key: 'studentsCount', width: 25 },
    ];
    result.forEach((elem) => {
      worksheet.addRow({
        groupName: elem.groupName,
        teacherName: `${elem.lastName} ${elem.firstName} ${elem.fathersName}`,
        studentsCount: elem.studentsCount,
      });
    });
    await worksheet.commit();
    const fileName = 'group-workbook.xlsx';
    return workbook.commit().then(async () => {
      const data = await dataFunctions.readFile(`${__dirname}/${fileName}`);
      res.contentType('application/vnd.ms-excel');
      return res.send(data);
    });
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
});

router.post('/statistics/tasks', async (req, res) => {
  try {
    let result = await dataFunctions.filterTask(0, 0, req.body);
    result = result.map(element => element = mapping.mapTasksToDto(element));

    const options = {
      filename: 'server/routes/task-workbook.xlsx',
      useStyles: true,
      useSharedStrings: true,
    };
    const workbook = new Excel.stream.xlsx.WorkbookWriter(options);
    const worksheet = workbook.addWorksheet('Задачи');
    worksheet.columns = [
      { header: 'Имя задачи', key: 'name', width: 40 },
      { header: 'Оценка', key: 'score', width: 10 },
      { header: 'Язык', key: 'language', width: 15 },
    ];
    result.forEach((elem) => {
      worksheet.addRow({
        name: elem.name,
        score: elem.score,
        language: elem.language,
      });
    });
    await worksheet.commit();
    const fileName = 'task-workbook.xlsx';
    return workbook.commit().then(async () => {
      const data = await dataFunctions.readFile(`${__dirname}/${fileName}`);
      res.contentType('application/vnd.ms-excel');
      return res.send(data);
    });
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
});

router.post('/statistics/questions', async (req, res) => {
  try {
    let result = await dataFunctions.filterQuestion(0, 0, req.body);
    result = result.map(element => element = mapping.mapQuestionsToDto(element));
    const options = {
      filename: 'server/routes/question-workbook.xlsx',
      useStyles: true,
      useSharedStrings: true,
    };
    const workbook = new Excel.stream.xlsx.WorkbookWriter(options);
    const worksheet = workbook.addWorksheet('Вопросы');
    worksheet.columns = [
      { header: 'Тип вопроса', key: 'kind', width: 40 },
      { header: 'Сложность', key: 'difficultyRate', width: 15 },
      { header: 'Тренировочный', key: 'isTraining', width: 15 },
      { header: 'Количество правильных ответов', key: 'correntAnswersCount', width: 40 },
      { header: 'Количество неправильных ответов', key: 'wrongAnswersCount', width: 40 },
    ];
    result.forEach((elem) => {
      worksheet.addRow({
        kind: elem.kind,
        difficultyRate: elem.difficultyRate,
        isTraining: (elem.isTraining ? 'да' : 'нет'),
        correntAnswersCount: elem.correntAnswersCount,
        wrongAnswersCount: elem.wrongAnswersCount,
      });
    });
    await worksheet.commit();
    const fileName = 'question-workbook.xlsx';
    return workbook.commit().then(async () => {
      const data = await dataFunctions.readFile(`${__dirname}/${fileName}`);
      res.contentType('application/vnd.ms-excel');
      return res.send(data);
    });
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
});

module.exports = router;
