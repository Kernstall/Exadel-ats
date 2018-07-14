const express = require('express');
const bodyParser = require('body-parser');
// const session = require('express-session');
const passport = require('passport');
// const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const mongoose = require('mongoose');
const studentRouter = require('./routes/student-router');
const teacherAdminRouter = require('./routes/teacher-admin-router');
const sendMail = require('./mail');
// const adminRouter = require('./routes/admin-routes');
const userRouter = require('./routes/user-router');

const app = express();

const dbName = 'TestingSystem';
mongoose.Promise = global.Promise;

async function connectDatabase() {
  mongoose.connect(`mongodb://localhost:27017/${dbName}`, { useNewUrlParser: true })
    .then(() => {
      console.log('Connected to database!!!');
    })
    .catch((err) => {
      throw new Error(err);
    });
}

connectDatabase();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*
app.use(session({
  secret: 'AXCJRGSBJUHFOS-AVDAV-4FDfd',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: `${connectionString}-app`,
    ttl: 20 * 24 * 60 * 60,
  }),
}));
*/

// app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// app.use('/api/', authorization??);
app.use('/api/student', studentRouter);
app.use('/api/teacherAdmin', teacherAdminRouter);
app.use('/api/user', userRouter);
// app.use('/api/admin', adminRouter);
// app.use('/api/user', userRouter);

//sendMail.sendMail(sendMail.mailOptions('dhaurushka@exadel.com', 'node.js', 'Димас даун'));

const server = app.listen(3001, () => console.log(`Server is listening on port ${server.address().port}`));
