const cp = require('child_process');

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

// exports.deleteBinFunc();
// exports.runFunc('HelloWorld').catch(error => error.message);
exports.createBinFunc().then(exports.buildFunc).then(() => exports.runFunc('HelloWorld')).then(exports.deleteBinFunc);
