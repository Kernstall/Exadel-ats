const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
// const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const mongoose = require('mongoose');

const app = express();

const dbName = 'TestingSystem';
const connectionString = `mongodb://localhost:27017/${dbName}`;
//mongoose.connect(connectionString);

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

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

const server = app.listen(3001, () => console.log(`Server is listening on port ${server.address().port}`));
