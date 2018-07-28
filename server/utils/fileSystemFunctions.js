const fs = require('fs-extra');

exports.createDirFunc = async (path) => {
  try {
    await fs.ensureDir(path);
    console.log('success!');
  } catch (err) {
    console.error(err);
  }
};


exports.copyFile = async (oldPath, newPath) => {
  try {
    await fs.copy(oldPath, newPath);
    console.log('success!');
  } catch (err) {
    console.error(err);
  }
}
