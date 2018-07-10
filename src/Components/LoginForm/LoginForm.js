import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './style.css';

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
            <Button size="small">
              Sign Up
            </Button>
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
      </form>
    );
  }
}

export default LoginForm;
