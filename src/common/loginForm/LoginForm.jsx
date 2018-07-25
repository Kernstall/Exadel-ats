import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Route, Link } from 'react-router-dom';
import './style.css';
import { withStyles } from '@material-ui/core/styles';
import RegisterForm from '../../pages/registerFormPage/RegisterFormPage.jsx';
import logo from '../../img/logo.png';

const styles = {
  img: {
    height: `${window.screen.height * 0.1}px`,
  },
  link: {
    fontWeight: '100',
    color: '#c8c8c8',
  },
  input: {
    color: '#c3c3c3',
  },
};

class LoginForm extends React.Component {
  render(props) {
    const { classes } = this.props;
    return (
      <form className="container" noValidate autoComplete="off">
        <div className="input-container">
          <div className="text-panel">
            <img className={classes.img} src={logo} alt="logo" />
          </div>
          <div className="input-panels">
            <Typography variant="subheading" className={classes.link}>
              Not a member yet?
              {' '}
              <Link to="/registration" className="sign-up-button">
                Sign Up
              </Link>
              {' '}
              now.
            </Typography>
            <TextField
              autoFocus
              InputLabelProps={{
                className: classes.input,
              }}
              inputProps={{
                className: classes.input,
              }}
              id="name"
              label="Login"
              className="text-field"
              margin="normal"
            />
            <TextField
              InputLabelProps={{
                className: classes.input,
              }}
              inputProps={{
                className: classes.input,
              }}
              id="password-input"
              label="Password"
              className="text-field"
              type="password"
              autoComplete="current-password"
              margin="normal"
            />
            <Button className="login-button" fullWidth>
              Login
            </Button>
          </div>
        </div>
        <Route exact path="/registration" component={RegisterForm} />
      </form>
    );
  }
}

export default withStyles(styles)(LoginForm);
