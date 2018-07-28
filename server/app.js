const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const logger = require('morgan');
const FormData = require('form-data');

const passportControl = require('./utils/passport-control');
const sendMail = require('./mail');
const studentRouter = require('./routes/student-router');
const teacherRouter = require('./routes/teacher-router');
const adminRouter = require('./routes/admin-router');
const userRouter = require('./routes/user-router');
const Activity = require('./models/Activity');
const User = require('./models/User');
const uploadFiles = require('./utils/uploadFiles');
const fileSystemFunctions = require('./utils/fileSystemFunctions');

const app = express();

const dbName = 'TestingSystem';
const connection = `mongodb://localhost:27017/${dbName}`;
mongoose.Promise = global.Promise;

async function connectDatabase() {
  mongoose.connect(connection, { useNewUrlParser: true })
    .then(() => {
      console.log('Connected to database!!!');
    })
    .catch((err) => {
      throw new Error(err);
    });
}

connectDatabase();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'EXADELULGOSHIPKE-HE',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: `${connection}-session`,
    ttl: 3 * 24 * 60 * 60,
  }),
  cookie: { maxAge: 3 * 24 * 60 * 60 * 1000 },
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/api/user/login', passportControl);

app.use('/api/user', userRouter);

app.use((req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).end();
  }
  return next();
});

app.use('/api/admin', adminRouter);
app.use('/api/student', studentRouter);
//app.use('/api/teacher', teacherRouter);

app.post('/api/teacher/task/tests', uploadFiles.uploadTests.array('tests'), async (req, res) => {
  const count = req.files.length;
  const form = new FormData();

  for (let i = 0; i < count / 2; i++) {
    await fileSystemFunctions.copyFile(`${req.files[i].destination}/${req.files[i].filename}`, `${req.files[i].destination}/${req.files[i].originalname}`);
  }


  res.status(200).send(req.files);
});

const server = app.listen(3001, () => console.log(`Server is listening on port ${server.address().port}`));
