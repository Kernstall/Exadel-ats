const express = require('express');
const bodyParser = require('body-parser');
// const cp = require('child_process');
// const fs = require('fs');
const mongoose = require('mongoose');
const multer = require('multer');
const dataFunctions = require('./microserviceUtils/dataFunctions');
// const got = require('got');

const app = express();
const dbName = 'TestingSystem';
const connection = `mongodb://localhost:27017/${dbName}`;

const commonSrcCodePath = `${__dirname}/dataFileStorageMicro/srcCodes`;
const commonTaskPath = `${__dirname}/dataFileStorageMicro/tasks`;
dataFunctions.initPaths(commonSrcCodePath, commonTaskPath);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const userController = {};

const storage = multer.diskStorage({
  async destination(req, file, cb) {
    if (file.fieldname === 'tests') {
      let index = file.originalname.indexOf('input.txt');
      let number;
      if (index === -1) {
        index = file.originalname.indexOf('output.txt');
        number = file.originalname.slice(0, index);
      } else {
        number = file.originalname.slice(0, index);
      }
      const path = `${commonTaskPath}/${req.xindex}/${number}`;

      if (!(await dataFunctions.checkFileExistence(path))) {
        try {
          await dataFunctions.createBinFunc(path);
        } catch (error) {
          // Папка уже есть
        }
      }
      cb(null, path);
      return;
    }
    const path = `${commonSrcCodePath}/${req.xindex}/src`;

    cb(null, path);
  },
  filename(req, file, cb) {
    if (file.fieldname === 'tests') {
      let index = file.originalname.indexOf('input.txt');
      let nameOfFile;
      if (index === -1) {
        index = file.originalname.indexOf('output.txt');
        nameOfFile = file.originalname.slice(index);
      } else {
        nameOfFile = file.originalname.slice(index);
      }
      cb(null, `${nameOfFile}`);
      return;
    }
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    try {
      if (file.originalname.match(/^[\da-f]+input.txt$|^[\da-f]+output.txt$|.cpp$|.java$|.h|.c$/)) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    } catch (error) {
      cb(error);
    }
  },
});

// deleteBinFunc();
// runFunc('HelloWorld').catch(error => error.message);
// createBinFunc().then(javaBuildFunc).then(() => runFunc('HelloWorld')).then(deleteBinFunc);
async function connectDatabase() {
  mongoose.connect(connection, { useNewUrlParser: true })
    .then(() => {
      console.log('Connected to database!!!');
    })
    .catch((err) => {
      throw new Error(err);
    });
}

/*app.post('/server/textfiles', uploadText.array('files'), async (req, res, next) => {
  res.status(200).send('Operation successful');
});*/

app.post('/server/running/srcfiles', async (req, res, next) => {
  let xindex = 0;
  while (userController[xindex] !== undefined) {
    xindex++;
  }
  userController[xindex] = 1;
  req.xindex = xindex;

  if (!(await dataFunctions.checkFileExistence(`${commonSrcCodePath}/${req.xindex}/src`))) {
    await dataFunctions.createBinFunc(`${commonSrcCodePath}/${req.xindex}/src`);
  } else {
    await dataFunctions.deleteBinFunc(`${commonSrcCodePath}/${req.xindex}/src`);
    await dataFunctions.createBinFunc(`${commonSrcCodePath}/${req.xindex}/src`);
  }
  next();
});

app.post('/server/running/srcfiles', upload.fields([{ name: 'tests' }, { name: 'src' }]), async (req, res, next) => {
  try {
    const result = await dataFunctions.checkStudentAttempt(req.query.userId, req.query.taskId,
      req.query.mainFileName, req.query.attemptNumber, req.query.lang, req.xindex);
    await dataFunctions.deleteBinFunc(`${commonSrcCodePath}/${req.xindex}`);
    await dataFunctions.deleteBinFunc(`${commonTaskPath}/${req.xindex}`);
    res.status(200).json(result);
  } catch (error) {
    delete userController[req.xindex];
    res.status(404).send(error.message);
  }
});

/*app.delete('/server/textfiles', async (req, res) => {
  try {
    const taskId = req.query.taskId;
    const number = req.query.testId;
    await dataFunctions.deleteBinFunc(`${commonTaskPath}/${req.xindex}/${taskId}/${number}`);
    res.status(200).send('Operation successful');
  } catch (error) {
    res.status(404).send(error.message);
  }
});*/

app.use(async (err, req, res, next) => {
  delete userController[req.xindex];
  console.log(err);
  res.status(404).send(err.message);
});

const server = app.listen(3002, () => console.log(`Server is listening on port ${server.address().port}`));

connectDatabase();
