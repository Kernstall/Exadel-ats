const cp = require('child_process');
const fileExtension = require('file-extension');
const fsFull = require('fs-extra');
const fs = require('fs.extra');
const mongoose = require('mongoose');
const Task = require('../models/Task');

exports.commonSrcCodePath;
exports.commonTaskPath;

exports.initPaths = function initPaths(srcCodePath, taskPath) {
  exports.commonSrcCodePath = srcCodePath;
  exports.commonTaskPath = taskPath;
};

exports.checkHFilesPresence = async function checkHFilesPresence(path) {
  return new Promise((resolve) => {
    fsFull.readdir(path, (err, files) => {
      if (files.some((file) => {
        if (fileExtension(file) === 'h') {
          return true;
        }
        return false;
      })) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

exports.checkFileExistence = async function checkFileExistence(path) {
  return new Promise((resolve) => {
    fs.access(path, fs.constants.F_OK, (err) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

exports.deleteBinFunc = async function deleteBinFunc(path) { // удаляет конечную папку
  return new Promise((resolve, reject) => {
    fs.rmrf(`${path}`, (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
};

exports.createBinFunc = async function createBinFunc(path) { // создаёт полную папковую иерархию
  return new Promise((resolve, reject) => {
    fs.mkdirp(`${path}`, (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
};

exports.javaBuildFunc = async function javaBuildFunc(path) {
  return new Promise((resolve, reject) => {
    cp.exec(`javac -d ${path}/bin ${path}/src/*.java`, (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
};

exports.cppBuildFunc = async function cppBuildFunc(path) {
  const areHFilesPresent = await exports.checkHFilesPresence(`${path}/src`);
  return new Promise((resolve, reject) => {
    // g++ ABS_LIB.cpp ABS_LIB.h structs.h structs.cpp main.cpp
    cp.exec(`cd ${path}/src &&  g++ *.cpp${areHFilesPresent ? ' *.h' : ''} -o ../bin/main.exe`, (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
};

exports.javaRunFunc = async function javaRunFunc(path, mainFileName) {
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

exports.cppRunFunc = async function cppRunFunc(path) {
  return new Promise((resolve, reject) => {
    cp.exec(`cd ${path} && ./main.exe`, { timeout: 30 * 1000 }, (error, stdout, stderr) => {
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

exports.builder = {
  java: exports.javaBuildFunc,
  cpp: exports.cppBuildFunc,
};

exports.runner = {
  java: exports.javaRunFunc,
  cpp: exports.cppRunFunc,
};

exports.placeInputFile = async function copy(extractionPath, destinationPath) { // замещает файл
  return new Promise((resolve, reject) => { // если таковой есть
    fs.copy(`${extractionPath}`, `${destinationPath}`, { replace: true }, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

exports.placeOutputFile = async function createFile(path) { // создаёт пустой файл
  return new Promise((resolve, reject) => {
    fs.createFile(`${path}`, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

exports.removeInputFile = async function removeFile(path) {
  return new Promise((resolve, reject) => {
    fs.unlink(`${path}`, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

exports.removeOutputFile = async function removeFile(path) {
  return new Promise((resolve, reject) => {
    fs.unlink(`${path}`, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

exports.readFile = async function readFile(fileName) {
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

exports.compareFiles = async function compareFiles(firstFileName, secondFileName) {
  const firstContent = (await exports.readFile(firstFileName)).toString();
  const secondContent = (await exports.readFile(secondFileName)).toString();
  if (firstContent === secondContent) {
    return true;
  }
  return false;
};

exports.checkStudentAttempt = async function checkStudentAttempt(studentId, taskId,
  mainFileName, attemptNumber, lang, userNumber) {
  try {
    const results = [];
    let tests = await Task.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(taskId) } },
      { $project: { tests: true } },
    ]);
    if (tests.length === 0) {
      throw new Error('Incorrect task id');
    }
    if (await exports.checkFileExistence(`${exports.commonSrcCodePath}/${userNumber}/bin`)) {
      // Удаление папки bin, если таковая по какой-либо непредвиденной причине
      // осталась в директории
      await exports.deleteBinFunc(`${exports.commonSrcCodePath}/${userNumber}/bin`);
    }

    // Создание папки bin
    await exports.createBinFunc(`${exports.commonSrcCodePath}/${userNumber}/bin`); // Работает

    tests = tests[0].tests;

    try {
      // Компиляция файлов в папку bin
      await exports.builder[lang.toLowerCase()](`${exports.commonSrcCodePath}/${userNumber}`);
    } catch (error) {
      for (let index = 0; index < tests.length; index++) {
        results.push({
          success: false,
          weight: tests[index].weight,
          _id: tests[index]._id.toString(),
        });
      }
      return results;
    }

    // console.log(tests._id.toString());
    for (let index = 0; index < tests.length; index++) {
      // Копирование очередного входного файла в папку bin
      await exports.placeInputFile(`${exports.commonTaskPath}/${userNumber}/${tests[index]._id}/input.txt`,
        `${exports.commonSrcCodePath}/${userNumber}/bin/input.txt`);
      // Создание файла для выходных данных
      await exports.placeOutputFile(`${exports.commonSrcCodePath}/${userNumber}/bin/output.txt`);
      try {
        // Запуск скомпилированных файлов
        await exports.runner[lang.toLowerCase()](`${exports.commonSrcCodePath}/${userNumber}/bin`, mainFileName);
        // Удаление входного файла
        await exports.removeInputFile(`${exports.commonSrcCodePath}/${userNumber}/bin/input.txt`);
        // Сравнение выходного файла и ожидаемого результата
        let isSuccessfull;
        try {
          isSuccessfull = await exports.compareFiles(`${exports.commonTaskPath}/${userNumber}/${tests[index]._id}/output.txt`,
            `${exports.commonSrcCodePath}/${userNumber}/bin/output.txt`);
        } catch (error) {
          isSuccessfull = false;
        }
        results.push({
          success: isSuccessfull,
          weight: tests[index].weight,
          _id: tests[index]._id.toString(),
        });
      } catch (error) {
        results.push({
          success: false,
          weight: tests[index].weight,
          _id: tests[index]._id.toString(),
        });
        await exports.removeInputFile(`${exports.commonSrcCodePath}/${userNumber}/bin/input.txt`);
        // Сравнение выходного файла и ожидаемого результата
      }
      if (await exports.checkFileExistence(`${exports.commonSrcCodePath}/${userNumber}/bin/ouput.txt`)) {
        // Удаление выходного файла
        await exports.removeOutputFile(`${exports.commonSrcCodePath}/${userNumber}/bin/ouput.txt`);
      }
    }
    // Удаление папки bin
    await exports.deleteBinFunc(`${exports.commonSrcCodePath}/${userNumber}/bin`);

    return results;
  } catch (error) {
    // Тут что-то должно быть
    throw error;
  }
};
