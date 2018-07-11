const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const fs = require('fs');
// const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const mongoose = require('mongoose');
const studentRouter = require('./routes/student-router');

const dbName = 'TestingSystem';
mongoose.Promise = global.Promise;

async function connectDatabase() {
  mongoose.connect(`mongodb://localhost:27017/${dbName}`)
    .then(() => {
      console.log('Connected to database!!!');
    })
    .catch((err) => {
      throw new Error(err);
    });
}

connectDatabase();

let taskArray = [];

const app = express();

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

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/student', studentRouter);


passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

const server = app.listen(3001, () => console.log(`Server is listening on port ${server.address().port}`));
