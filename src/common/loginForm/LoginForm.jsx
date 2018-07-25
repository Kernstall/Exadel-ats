import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Route, Link, Redirect } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import createHistory from 'history/createBrowserHistory';
import { connect } from 'react-redux';
import RegisterForm from '../../pages/registerFormPage/RegisterFormPage.jsx';
import { login } from '../../commands/userLogin';
import { getStudents } from '../../commands/students';

const history = createHistory();

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      _id: '',
      status: '',
      isLogged: false,
    };
  }

  componentDidUpdate() {
    console.log('STATE', this.state);
    console.log('PROPS', this.props);
  }

  handleChange = name => (e) => {
    this.setState({
      [name]: e.target.value,
    });
  };

  handleClick = (e) => {
    this.props.login(this.state);
    /* axios.post('/api/user/login', {
      username: this.state.username,
      password: this.state.password,
    })/!* .then(res => console.log(res.headers.etag, res.data)); *!/
      .then((res) => {
        console.log(res);
        localStorage.setItem(`user`, res.headers.etag);
        this.setState({
          _id: res.data.id,
          status: res.data.status,
          isLogged: true,
        });
      }); */
    /* fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-type': 'application/json',
        'Set-Cookie': 'true',
      },
      credentials: 'include',
    })
      .then(res => {console.log(res); return res;})
      .then(res => res.json())
      .then((res) => {
        localStorage.setItem('user', JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }));
        this.setState({
          _id: res.id,
          status: res.status,
          isLogged: true,
        });
        console.log(res);
      }); */
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
        {
          this.props.response && <Redirect to={`/${this.props.response.status}/${this.props.response.id}`} />
        }
      </form>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.userLogin.isLoading,
  response: state.userLogin.response,
});

const mapCommandsToProps = dispatch => ({
  login: param => dispatch(login(param)),
});

export default connect(mapStateToProps, mapCommandsToProps)(LoginForm);
