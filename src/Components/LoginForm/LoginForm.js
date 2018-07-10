import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Route, Link } from "react-router-dom";
import { Redirect } from 'react-router';
import './style.css';
import TeacherRegistration from "../RegisterForm/TeacherRegistration/TeacherRegistration";
import RegisterForm from "../RegisterForm/RegisterForm";
import Footer from "../Footer";
import StudentRegistration from "../RegisterForm/StudentRegistration/StudentRegistration";

class LoginForm extends React.Component {
  render() {
    return (
      <form className="container" noValidate autoComplete="off">
        <div className="input-container">
          <Typography className="login-header" variant="headline">
            Log In
          </Typography>
          <Typography variant="subheading">
            Not a member yet?
            <br />
            <Link to="/registration">
              <Button size="small">
                Sign Up
              </Button>
            </Link>
            {' '}
            now.
          </Typography>
          <TextField
            id="name"
            label="Login"
            className="text-field"
            margin="normal"
          />
          <TextField
            id="password-input"
            label="Password"
            className="text-field"
            type="password"
            autoComplete="current-password"
            margin="normal"
          />
          <Button className="login-button">
            Login
          </Button>
        </div>
        <Route exact path="/registration" component={RegisterForm} />
      </form>
    );
  }
}

export default LoginForm;
