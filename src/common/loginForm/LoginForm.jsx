import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Route, Link, Redirect } from 'react-router-dom';
import './style.css';
import RegisterForm from '../../pages/registerFormPage/RegisterFormPage.jsx';
import { login, makeRequest } from './api';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  handleChange = name => e => {
    this.setState({
      [name]: e.target.value,
    });
  };

  handleClick = e => {
    login(this.state).then(() => {
      makeRequest('/api/user/login', {
        method: 'GET',
      }).then(() => this.props.history.push('/data'));
    });
  };

  render() {
    return (
      <form className="container" noValidate autoComplete="off">
        <div className="input-container">
          <div className="text-panel">
            <Typography className="login-header" variant="headline">
              Log In
            </Typography>
            <Typography variant="subheading">
              Not a member yet?
              <br />
              <Link to="/registration" className="sign-up-button">
                Sign Up
              </Link>
              {' '}
              now.
            </Typography>
          </div>
          <div className="input-panels">
            <TextField
              id="name"
              label="Login"
              className="text-field"
              margin="normal"
              onChange={this.handleChange('username')}
            />
            <TextField
              id="password-input"
              label="Password"
              className="text-field"
              type="password"
              autoComplete="current-password"
              margin="normal"
              onChange={this.handleChange('password')}
            />
            <Button onClick={this.handleClick} className="login-button">
              Login
            </Button>
          </div>
        </div>
        <Route exact path="/registration" component={RegisterForm} />
        <Route exact path="/" render={() => (this.state.isLogged ? <Redirect to="/teacher" /> : <Redirect to="/" />)} />
      </form>
    );
  }
}

export default LoginForm;
