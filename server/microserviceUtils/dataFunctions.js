const cp = require('child_process');
const fs = require('fs');
const mongoose = require('mongoose');
const Task = require('../models/Task');

const commonSrcCodePath = 'dataFileStorageMicro\\srcCodes';
const commonTaskPath = 'dataFileStorageMicro\\tasks';

exports.checkFileExistence = async function checkFileExistence(path) {
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

exports.deleteBinFunc = async function deleteBinFunc(path) {
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

exports.createBinFunc = async function createBinFunc(path) {
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

exports.javaBuildFunc = async function javaBuildFunc(path) {
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

exports.cppBuildFunc = async function cppBuildFunc(path) {
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
};

exports.builder = {
  java: exports.javaBuildFunc,
  cpp: exports.cppBuildFunc,
};

exports.runner = {
  java: exports.javaRunFunc,
  cpp: exports.cppRunFunc,
};

exports.placeInputFile = async function placeInputFile(inputFromFileWay, inputWhereFileWay) {
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

exports.placeOutputFile = async function placeOutputFile(outputWhereFileWay) {
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

exports.removeInputFile = async function removeInputFile(inputWhereFileWay) {
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

exports.removeOutputFile = async function removeOutputFile(outputWhereFileWay) {
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

exports.checkStudentAttempt = async function checkStudentAttempt(studentId, taskId, mainFileName, attemptNumber, lang) {
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
    await exports.builder[lang.toLowerCase()](`${commonSrcCodePath}\\${studentId}\\${taskId}\\${attemptNumber}`);

    tests = tests[0].tests;

    // console.log(tests._id.toString());
    for (let index = 0; index < tests.length; index++) {
      // Копирование очередного входного файла в папку bin
      await exports.placeInputFile(`${commonTaskPath}\\${taskId}\\${tests[index]._id.toString()}\\${tests[index].inputFileAdress}`,
        `${commonSrcCodePath}\\${studentId}\\${taskId}\\${attemptNumber}\\bin`);
      // Создание файла для выходных данных
      await exports.placeOutputFile(`${commonSrcCodePath}\\${studentId}\\${taskId}\\${attemptNumber}\\bin\\${tests[index].outputFileAdress}`);
      try {
        // Запуск скомпилированных файлов
        await exports.runner[lang.toLowerCase()](`${commonSrcCodePath}\\${studentId}\\${taskId}\\${attemptNumber}\\bin`, mainFileName);
        // Удаление входного файла
        await exports.removeInputFile(`${commonSrcCodePath}\\${studentId}\\${taskId}\\${attemptNumber}\\bin\\${tests[index].inputFileAdress}`);
        // Сравнение выходного файла и ожидаемого результата
        let isSuccessfull;
        try {
          isSuccessfull = await exports.compareFiles(`${commonTaskPath}\\${taskId}\\${tests[index]._id.toString()}\\${tests[index].outputFileAdress}`,
            `${commonSrcCodePath}\\${studentId}\\${taskId}\\${attemptNumber}\\bin\\${tests[index].outputFileAdress}`);
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
        await exports.removeInputFile(`${commonSrcCodePath}\\${studentId}\\${taskId}\\${attemptNumber}\\bin\\${tests[index].inputFileAdress}`);
        // Сравнение выходного файла и ожидаемого результата
      }
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
