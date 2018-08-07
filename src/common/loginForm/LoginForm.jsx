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
import { requestErrorMessage } from '../../commands/errorMessage';

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

    console.log(this.props.response);

    if (this.props.response && !this.props.response.err) {
      sessionStorage.setItem('name', JSON.stringify([this.props.response.firstName, this.props.response.lastName]))
      return <Redirect to={`/${this.props.response.status}/id/${this.props.response.id}`} />
    } if (this.props.response && this.props.response.err === 'not right fiedls') {
      this.props.requestErrorMessage('Неправильный логин или пароль.');
      this.props.response.err = -1;
    }
    return (
      <form className="container" noValidate autoComplete="off">
        <div className="input-container">
          <div className="text-panel">
            <img className={classes.img} src={logo} alt="logo" />
          </div>
          <div className="input-panels">
            <Typography variant="subheading" className={classes.link}>
              <p>Не зарегистрированы?</p>
              {' '}
              <p>
                <Link to="/registration" className="sign-up-button">
                  Зарегистрируйтесь
                </Link>
                {' '}
                сейчас.
              </p>
            </Typography>
            <TextField
              autoFocus
              InputLabelProps={{
                className: classes.input,
              }}
              inputProps={{
                className: classes.input,
              }}
              id="name" label="Почта"
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
              label="Пароль"
              className="text-field"
              type="password"
              autoComplete="current-password"
              margin="normal"
              onChange={this.handleChange('password')}
            />
            <Button onClick={this.handleClick} className="login-button" fullWidth>
              Войти
            </Button>
          </div>
        </div>
        <Route exact path="/registration" component={RegisterForm} />
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
  requestErrorMessage: param => dispatch(requestErrorMessage(param)),
});

export default connect(mapStateToProps, mapCommandsToProps)(withStyles(styles)(LoginForm));
