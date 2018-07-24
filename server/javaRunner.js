const cp = require('child_process');
const fs = require('fs');
const mongoose = require('mongoose');
const User = require('./models/User');
const Task = require('./models/Task');
// const got = require('got');

const dbName = 'TestingSystem';
const connection = `mongodb://localhost:27017/${dbName}`;

const commonSrcCodePath = 'dataFileStorage\\srcCodes';
const commonTaskPath = 'dataFileStorage\\tasks';
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

exports.placeOutputFile = async (outputWhereFileWay) => {
  return new Promise((resolve, reject) => {
    cp.exec(`echo. 2> ${outputWhereFileWay}`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
    // echo. 2> bin\output.txt
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

exports.buildFunc = async (path) => {
  return new Promise((resolve, reject) => {
    cp.exec(`javac -d ${path}\\bin ${path}\\src\\*.java`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
};

exports.runFunc = async (path, mainFileName) => {
  return new Promise((resolve, reject) => {
    cp.exec(`cd ${path} && java ${mainFileName}`, { timeout: 30 * 1000 }, (error, stdout, stderr) => {
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

exports.deleteBinFunc = async (path) => {
  return new Promise((resolve, reject) => {
    cp.exec(`rmdir ${path} /s /q`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
};

exports.createBinFunc = async (path) => {
  return new Promise((resolve, reject) => {
    cp.exec(`mkdir ${path}`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      console.log(stdout);
      console.log(stderr);
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

exports.checkFileExistence = async (path) => {
  return new Promise((resolve, reject) => {
    fs.access(path, fs.constants.F_OK, (err) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

exports.compareFiles = async (firstFileName, secondFileName) => {
  const firstContent = (await exports.readFile(firstFileName)).toString();
  const secondContent = (await exports.readFile(secondFileName)).toString();
  if (firstContent === secondContent) {
    return true;
  }
  return false;
};

exports.checkStudentAttempt = async (studentId, taskId, mainFileName) => {
  try {
    let tests = await Task.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(taskId) } },
      { $project: { tests: true } },
    ]);
    if (tests.length === 0) {
      throw new Error('Incorrect task id');
    }
    if (await exports.checkFileExistence(`${commonSrcCodePath}\\${studentId}\\${taskId}\\2\\bin`)) {
      // Удаление папки bin, если таковая по какой-либо непредвиденной причине
      // осталась в директории
      await exports.deleteBinFunc(`${commonSrcCodePath}\\${studentId}\\${taskId}\\2\\bin`);
    }

    // Создание папки bin
    await exports.createBinFunc(`${commonSrcCodePath}\\${studentId}\\${taskId}\\2\\bin`); // Работает

    // Компиляция файлов в папку bin
    await exports.buildFunc(`${commonSrcCodePath}\\${studentId}\\${taskId}\\2`);

    tests = tests[0].tests;

    // console.log(tests._id.toString());
    for (let index = 0; index < tests.length; index++) {
      // Копирование очередного входного файла в папку bin
      await exports.placeInputFile(`${commonTaskPath}\\${taskId}\\${tests[index]._id.toString()}\\input\\${tests[index].inputFileAdress}`,
        `${commonSrcCodePath}\\${studentId}\\${taskId}\\2\\bin`);
      // Создание файла для выходных данных
      await exports.placeOutputFile(`${commonSrcCodePath}\\${studentId}\\${taskId}\\2\\bin\\${tests[index].outputFileAdress}`);
      // Запуск скомпилированных файлов
      await exports.runFunc(`${commonSrcCodePath}\\${studentId}\\${taskId}\\2\\bin`, mainFileName);
      // Удаление входного файла
      await exports.removeInputFile(`${commonSrcCodePath}\\${studentId}\\${taskId}\\2\\bin\\${tests[index].inputFileAdress}`);
      // Сравнение выходного файла и ожидаемого результата
      await exports.compareFiles(`${commonTaskPath}\\${taskId}\\${tests[index]._id.toString()}\\expextedOutput\\${tests[index].outputFileAdress}`,
        `${commonSrcCodePath}\\${studentId}\\${taskId}\\2\\bin\\${tests[index].outputFileAdress}`);
      // Удаление выходного файла
      await exports.removeOutputFile(`${commonSrcCodePath}\\${studentId}\\${taskId}\\2\\bin\\${tests[index].outputFileAdress}`);
    }
    // Удаление папки bin
    await exports.deleteBinFunc(`${commonSrcCodePath}\\${studentId}\\${taskId}\\2\\bin`);
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
      exports.checkStudentAttempt('5b45b16575224332745f7587', '5b44fb2508a2b31ddcddab32', 'Process');
    })
    .catch((err) => {
      throw new Error(err);
    });
}
connectDatabase();
