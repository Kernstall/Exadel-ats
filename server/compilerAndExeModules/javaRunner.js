const cp = require('child_process');

cp.exec('javac -d bin src/*.java', (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  const child = cp.exec('java -classpath ./bin HelloWorld', (error, stdout, stderr) => {
    if (error) {
      throw error;
    }
    console.log(stdout);
    console.log(stderr);
  });
});
