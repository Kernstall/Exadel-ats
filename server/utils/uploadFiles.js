const multer = require('multer');

const fileSystemFunctions = require('./fileSystemFunctions');
const dataFunctions = require('./dataFunctions');

const commonTaskPath = 'dataFileStorage/tasks';
const commonSrcCodePath = 'dataFileStorage/srcCodes';

const storageTests = multer.diskStorage({
  async destination(req, file, cb) {
    let index = file.originalname.indexOf('input.txt');
    let number;
    if (index === -1) {
      index = file.originalname.indexOf('output.txt');
      number = file.originalname.slice(0, index);
    } else {
      number = file.originalname.slice(0, index);
    }
    const path = `${commonTaskPath}/${req.query.taskId}/${number}`;
    await fileSystemFunctions.createDirFunc(path);

    cb(null, path);
  },
  filename(req, file, cb) {
    let index = file.originalname.indexOf('input.txt');
    let nameOfFile;
    if (index === -1) {
      index = file.originalname.indexOf('output.txt');
      nameOfFile = file.originalname.slice(index);
    } else {
      nameOfFile = file.originalname.slice(index);
    }
    cb(null, `${nameOfFile}`);
  },
});

exports.uploadTests = multer({
  storage: storageTests,
  fileFilter(req, file, cb) {
    try {
      if (file.originalname.match(/^[\da-f]+input.txt$|^\[\da-f]+output.txt$/)) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    } catch (error) {
      cb(error);
    }
  },
});

const storageSrcCode = multer.diskStorage({
  async destination(req, file, cb) {
    const userId = req.query.userId;
    const taskId = req.query.taskId;
    const result = await dataFunctions.getUsersTasksAttemptNumber(userId, taskId);
    const path = `${commonSrcCodePath}/${req.query.userId}/${req.query.taskId}/${result + 1}/src`;
    await fileSystemFunctions.createDirFunc(path);
    cb(null, path);
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

exports.uploadSrcCode = multer({
  storage: storageSrcCode,
  fileFilter(req, file, cb) {
    try {
      if (file.originalname.match(/.cpp$|.java$|.h|.c$/)) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    } catch (error) {
      cb(error);
    }
  },
});
