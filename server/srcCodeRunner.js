const cp = require('child_process');
const fs = require('fs');
const mongoose = require('mongoose');
const Task = require('./models/Task');
// const got = require('got');

const dbName = 'TestingSystem';
const connection = `mongodb://localhost:27017/${dbName}`;

const commonSrcCodePath = 'dataFileStorage\\srcCodes';
const commonTaskPath = 'dataFileStorage\\tasks';

async function javaBuildFunc(path) {
  return new Promise((resolve, reject) => {
    cp.exec(`javac -d ${path}\\bin ${path}\\src\\*.java`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

async function cppBuildFunc(path) {
  return new Promise((resolve, reject) => {
    // g++ ABS_LIB.cpp ABS_LIB.h structs.h structs.cpp main.cpp
    cp.exec(`cd ${path}\\src &&  g++ *.cpp *.h -o ..\\bin\\main.exe`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

async function javaRunFunc(path, mainFileName) {
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
}

async function cppRunFunc(path) {
  return new Promise((resolve, reject) => {
    cp.exec(`cd ${path} && main.exe`, { timeout: 30 * 1000 }, (error, stdout, stderr) => {
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
}

const builder = {
  java: javaBuildFunc,
  cpp: cppBuildFunc,
};

const runner = {
  java: javaRunFunc,
  cpp: cppRunFunc,
};

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

exports.checkStudentAttempt = async (studentId, taskId, mainFileName, attemptNumber, lang) => {
  try {
    const results = [];
    let tests = await Task.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(taskId) } },
      { $project: { tests: true } },
    ]);
    if (tests.length === 0) {
      throw new Error('Incorrect task id');
    }
    if (await exports.checkFileExistence(`${commonSrcCodePath}\\${studentId}\\${taskId}\\${attemptNumber}\\bin`)) {
      // Удаление папки bin, если таковая по какой-либо непредвиденной причине
      // осталась в директории
      await exports.deleteBinFunc(`${commonSrcCodePath}\\${studentId}\\${taskId}\\${attemptNumber}\\bin`);
    }

    // Создание папки bin
    await exports.createBinFunc(`${commonSrcCodePath}\\${studentId}\\${taskId}\\${attemptNumber}\\bin`); // Работает

    // Компиляция файлов в папку bin
    await builder[lang.toLowerCase()](`${commonSrcCodePath}\\${studentId}\\${taskId}\\${attemptNumber}`);

    tests = tests[0].tests;

    // console.log(tests._id.toString());
    for (let index = 0; index < tests.length; index++) {
      // Копирование очередного входного файла в папку bin
      await exports.placeInputFile(`${commonTaskPath}\\${taskId}\\${tests[index]._id.toString()}\\input\\${tests[index].inputFileAdress}`,
        `${commonSrcCodePath}\\${studentId}\\${taskId}\\${attemptNumber}\\bin`);
      // Создание файла для выходных данных
      await exports.placeOutputFile(`${commonSrcCodePath}\\${studentId}\\${taskId}\\${attemptNumber}\\bin\\${tests[index].outputFileAdress}`);
      // Запуск скомпилированных файлов
      await runner[lang.toLowerCase()](`${commonSrcCodePath}\\${studentId}\\${taskId}\\${attemptNumber}\\bin`, mainFileName);
      // Удаление входного файла
      await exports.removeInputFile(`${commonSrcCodePath}\\${studentId}\\${taskId}\\${attemptNumber}\\bin\\${tests[index].inputFileAdress}`);
      // Сравнение выходного файла и ожидаемого результата
      let isSuccessfull;
      try {
        isSuccessfull = await exports.compareFiles(`${commonTaskPath}\\${taskId}\\${tests[index]._id.toString()}\\expextedOutput\\${tests[index].outputFileAdress}`,
          `${commonSrcCodePath}\\${studentId}\\${taskId}\\${attemptNumber}\\bin\\${tests[index].outputFileAdress}`);
      } catch (error) {
        isSuccessfull = false;
      }
      results.push({
        success: isSuccessfull,
        weight: tests[index].weight,
        _id: tests[index]._id.toString(),
      });
      // Удаление выходного файла
      await exports.removeOutputFile(`${commonSrcCodePath}\\${studentId}\\${taskId}\\${attemptNumber}\\bin\\${tests[index].outputFileAdress}`);
    }
    // Удаление папки bin
    await exports.deleteBinFunc(`${commonSrcCodePath}\\${studentId}\\${taskId}\\${attemptNumber}\\bin`);

    return results;
  } catch (error) {
    // Тут что-то должно быть
    throw error;
  }
};

// exports.deleteBinFunc();
// exports.runFunc('HelloWorld').catch(error => error.message);
// exports.createBinFunc().then(exports.javaBuildFunc).then(() => exports.runFunc('HelloWorld')).then(exports.deleteBinFunc);
async function connectDatabase() {
  mongoose.connect(connection, { useNewUrlParser: true })
    .then(() => {
      console.log('Connected to database!!!');
      exports.checkStudentAttempt('5b45b16575224332745f7587', '5b44fb2508a2b31ddcddab32', 'Process', 2, 'Java');
    })
    .catch((err) => {
      throw new Error(err);
    });
}
connectDatabase();
