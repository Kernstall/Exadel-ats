import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Route, Link, Redirect } from 'react-router-dom';
import './style.css';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import RegisterForm from '../../pages/registerFormPage/RegisterFormPage.jsx';
import logo from '../../img/logo.png';
import { login } from '../../commands/userLogin';

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
  }

  handleChange = name => (e) => {
    this.setState({
      [name]: e.target.value,
    });
  };

  handleClick = () => {
    this.props.login(this.state);
  };

  render() {
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
              onChange={this.handleChange('username')}
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
              onChange={this.handleChange('password')}
            />
            <Button onClick={this.handleClick} className="login-button" fullWidth>
              Login
            </Button>
          </div>
        </div>
        <Route exact path="/registration" component={RegisterForm} />
        {
          this.props.response && !console.log(this.props.response) && <Redirect to={`/${this.props.response.status}/id/${this.props.response.id}`} />
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

export default connect(mapStateToProps, mapCommandsToProps)(withStyles(styles)(LoginForm));
