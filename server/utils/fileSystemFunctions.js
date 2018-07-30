const fs = require('fs-extra');

exports.createDirFunc = async (path) => {
  try {
    await fs.ensureDir(path);
  } catch (err) {
    console.error(err);
  }
};


exports.copyFile = async (oldPath, newPath) => {
  try {
    await fs.copy(oldPath, newPath);
  } catch (err) {
    console.error(err);
  }
};

exports.deleteFile = async (path) => {
  try {
    await fs.remove(path);
  } catch (err) {
    console.error(err);
  }
};
