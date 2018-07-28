const multer = require('multer');

const fileSystemFunctions = require('./fileSystemFunctions');

const commonTaskPath = 'dataFileStorage\\tasks';

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
    const path = `${commonTaskPath}\\${req.query.taskId}\\${number}`;
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
});
