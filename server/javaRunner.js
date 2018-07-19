const exec = require('child_process').exec;

exec('node app.js', (err, stdout, stderr) => {
  console.log(stdout);
});
