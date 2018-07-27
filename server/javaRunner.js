const cp = require('child_process');
const fs = require('fs');
const mongoose = require('mongoose');
const User = require('./models/User');
const Task = require('./models/Task');

const dbName = 'TestingSystem';
const connection = `mongodb://localhost:27017/${dbName}`;

const commonSrcCodePath = '\\dataFileStorage\\srcCodes';
const commonTaskPath = '\\dataFileStorage\\tasks';
exports.placeInputFile = async (inputFromFileWay, inputWhereFileWay) => {
  return new Promise((resolve, reject) => {
    cp.exec(`copy ${inputFromFileWay} ${inputWhereFileWay}`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
    // copy ..\check\355ea642ea43112e\input.txt bin
  });
};

exports.removeInputFile = async (inputWhereFileWay) => {
  return new Promise((resolve, reject) => {
    cp.exec(`del /q ${inputWhereFileWay}`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
    // copy ..\check\355ea642ea43112e\input.txt bin
  });
};

exports.removeOutputFile = async (outputWhereFileWay) => {
  return new Promise((resolve, reject) => {
    cp.exec(`del /q ${outputWhereFileWay}`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
    // del /q bin\input.txt
  });
};

exports.buildFunc = async () => {
  return new Promise((resolve, reject) => {
    cp.exec('javac -d bin src/*.java', (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
};

exports.runFunc = async (mainFileName) => {
  return new Promise((resolve, reject) => {
    cp.exec(`java -classpath ./bin ${mainFileName}`, { timeout: 50 * 1000 }, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      if (stdout) {
        console.log(stdout);
      }
      if (stderr) {
        console.log(stderr);
      }
      resolve();
    });
  });
};

exports.deleteBinFunc = async () => {
  return new Promise((resolve, reject) => {
    cp.exec('rmdir bin /s /q', (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
};

exports.createBinFunc = async () => {
  return new Promise((resolve, reject) => {
    cp.exec('mkdir bin', (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
};

exports.readFile = async (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

exports.checkStudentAttempt = async (studentId, taskId) => {
  try {
    const userPath = `${commonSrcCodePath}\\${studentId}\\${taskId}`;
    let tests = await Task.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(taskId) } },
      { $project: { tests: true } },
    ]);
    if (tests.length === 0) {
      throw new Error('Incorrect task id');
    }
    tests = tests[0];
    await exports.createBinFunc(); //Создание
    const protoTaskPath = `${commonSrcCodePath}\\${taskId}`;
    // console.log(tests._id.toString());
    for (let index = 0; index < tests.length; index++) {
      let taskPath = `${protoTaskPath}\\${tests[index]._id.toString()}`;
    }
  } catch (error) {
    // Тут что-то должно быть
    console.log(error);
  }
};
// exports.deleteBinFunc();
// exports.runFunc('HelloWorld').catch(error => error.message);
// exports.createBinFunc().then(exports.buildFunc).then(() => exports.runFunc('HelloWorld')).then(exports.deleteBinFunc);
async function connectDatabase() {
  mongoose.connect(connection, { useNewUrlParser: true })
    .then(() => {
      console.log('Connected to database!!!');
      // exports.checkStudentAttempt('5b45b16f75224332745f7595', '5b44fb2508a2b31ddcddab32');
    })
    .catch((err) => {
      throw new Error(err);
    });
}
connectDatabase();
