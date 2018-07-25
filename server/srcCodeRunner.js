const app = require('express');
const bodyParser = require('body-parser');
const cp = require('child_process');
const fs = require('fs');
const mongoose = require('mongoose');
const multer = require('multer');
const Task = require('./models/Task');
// const got = require('got');

const dbName = 'TestingSystem';
const connection = `mongodb://localhost:27017/${dbName}`;

const commonSrcCodePath = 'dataFileStorage\\srcCodes';
const commonTaskPath = 'dataFileStorage\\tasks';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storageText = multer.diskStorage({
  destination(req, file, cb) {
    let index = file.originalname.indexOf('input.txt');
    let number;
    if (index === -1) {
      index = file.originalname.indexOf('output.txt');
      number = file.originalname.slice(0, index);
    } else {
      number = file.originalname.slice(0, index);
    }
    cb(null, `tasks\\${req.query.taskId}\\${number}`);
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

const storageSrcCode = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `srcCodes\\${req.query.userId}\\${req.query.taskId}\\${req.query.attemptNumber}\\src`);
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

const uploadText = multer({
  storage: storageText,
  fileFilter(req, file, cb) {

  },
});

const uploadSrcCode = multer({
  storage: storageSrcCode,
  fileFilter(req, file, cb) {

  },
});

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

async function placeInputFile(inputFromFileWay, inputWhereFileWay) {
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
}

async function placeOutputFile(outputWhereFileWay) {
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
}

async function removeInputFile(inputWhereFileWay) {
  return new Promise((resolve, reject) => {
    cp.exec(`del /q ${inputWhereFileWay}`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

async function removeOutputFile(outputWhereFileWay) {
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
}

async function deleteBinFunc(path) {
  return new Promise((resolve, reject) => {
    cp.exec(`rmdir ${path} /s /q`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

async function createBinFunc(path) {
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
}

async function readFile(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

async function checkFileExistence(path) {
  return new Promise((resolve, reject) => {
    fs.access(path, fs.constants.F_OK, (err) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

async function compareFiles(firstFileName, secondFileName) {
  const firstContent = (await readFile(firstFileName)).toString();
  const secondContent = (await readFile(secondFileName)).toString();
  if (firstContent === secondContent) {
    return true;
  }
  return false;
}

async function checkStudentAttempt(studentId, taskId, mainFileName, attemptNumber, lang) {
  try {
    const results = [];
    let tests = await Task.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(taskId) } },
      { $project: { tests: true } },
    ]);
    if (tests.length === 0) {
      throw new Error('Incorrect task id');
    }
    if (await checkFileExistence(`${commonSrcCodePath}\\${studentId}\\${taskId}\\${attemptNumber}\\bin`)) {
      // Удаление папки bin, если таковая по какой-либо непредвиденной причине
      // осталась в директории
      await deleteBinFunc(`${commonSrcCodePath}\\${studentId}\\${taskId}\\${attemptNumber}\\bin`);
    }

    // Создание папки bin
    await createBinFunc(`${commonSrcCodePath}\\${studentId}\\${taskId}\\${attemptNumber}\\bin`); // Работает

    // Компиляция файлов в папку bin
    await builder[lang.toLowerCase()](`${commonSrcCodePath}\\${studentId}\\${taskId}\\${attemptNumber}`);

    tests = tests[0].tests;

    // console.log(tests._id.toString());
    for (let index = 0; index < tests.length; index++) {
      // Копирование очередного входного файла в папку bin
      await placeInputFile(`${commonTaskPath}\\${taskId}\\${tests[index]._id.toString()}\\input\\${tests[index].inputFileAdress}`,
        `${commonSrcCodePath}\\${studentId}\\${taskId}\\${attemptNumber}\\bin`);
      // Создание файла для выходных данных
      await placeOutputFile(`${commonSrcCodePath}\\${studentId}\\${taskId}\\${attemptNumber}\\bin\\${tests[index].outputFileAdress}`);
      // Запуск скомпилированных файлов
      await runner[lang.toLowerCase()](`${commonSrcCodePath}\\${studentId}\\${taskId}\\${attemptNumber}\\bin`, mainFileName);
      // Удаление входного файла
      await removeInputFile(`${commonSrcCodePath}\\${studentId}\\${taskId}\\${attemptNumber}\\bin\\${tests[index].inputFileAdress}`);
      // Сравнение выходного файла и ожидаемого результата
      let isSuccessfull;
      try {
        isSuccessfull = await compareFiles(`${commonTaskPath}\\${taskId}\\${tests[index]._id.toString()}\\expextedOutput\\${tests[index].outputFileAdress}`,
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
      await removeOutputFile(`${commonSrcCodePath}\\${studentId}\\${taskId}\\${attemptNumber}\\bin\\${tests[index].outputFileAdress}`);
    }
    // Удаление папки bin
    await deleteBinFunc(`${commonSrcCodePath}\\${studentId}\\${taskId}\\${attemptNumber}\\bin`);

    return results;
  } catch (error) {
    // Тут что-то должно быть
    throw error;
  }
}

// deleteBinFunc();
// runFunc('HelloWorld').catch(error => error.message);
// createBinFunc().then(javaBuildFunc).then(() => runFunc('HelloWorld')).then(deleteBinFunc);
async function connectDatabase() {
  mongoose.connect(connection, { useNewUrlParser: true })
    .then(() => {
      console.log('Connected to database!!!');
      checkStudentAttempt('5b45b16575224332745f7587', '5b44fb2508a2b31ddcddab32', 'Process', 2, 'Java');
    })
    .catch((err) => {
      throw new Error(err);
    });
}

app.post('server/files', async (req, res) => {

});

app.post('server/run', async (req, res) => {

});

connectDatabase();
