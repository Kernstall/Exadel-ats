import React from 'react';
import TextField from '@material-ui/core/TextField';
import './style.css';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/es/Button/Button';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import FormSelect from '../../../common/shared/select/index';

const universities = {
  BSU: ['A1', 'B1', 'C1'],
  BSUIR: ['A2', 'B2', 'C2'],
};

const styles = theme => ({
  registerButton: {
    backgroundColor: '#2196f3',
    color: '#fff',
    margin: '15px',
    width: 300,
    '&:hover': {
      backgroundColor: '#1b77c5',
    },
  },
  width: {
    width: 300,
  },
});

class TeacherRegistration extends React.Component {
  constructor() {
    super();

    this.state = {
      universityList: [],
      status: 'teacher',
      firstName: '',
      lastName: '',
      fathersName: '',
      email: '',
      password: '',
      university: '',
      isRedirected: false,
    };
  }

  componentDidMount() {
    fetch('/api/user/universities', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Set-Cookie': 'true',
      },
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          universityList: res.map(el => el.name),
        });
      });
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = () => {
    fetch('/api/user/signup', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-type': 'application/json',
      },
    }).then(res => res.json())
      .then(res => console.log(`Success: ${res}`))
      .then(() => this.setState({ isRedirected: true }))
      .catch(rej => console.log(`Rejected: ${rej}`));
  };

  render() {
    const { classes } = this.props;

    return (
      <section className="student-container">
        <TextField
          id="name-placeholder"
          label="Имя"
          value={this.state.firstName}
          onChange={this.handleChange('firstName')}
          placeholder="Введите ваше имя..."
          className="text-field first-name"
        />
        <TextField
          id="lastname-placeholder"
          label="Фамилия"
          value={this.state.lastName}
          onChange={this.handleChange('lastName')}
          placeholder="Введите вашу фамилию..."
          className="text-field surname"
          margin="normal"
        />
        <TextField
          id="fathername-placeholder"
          label="Отчество"
          value={this.state.fathersName}
          onChange={this.handleChange('fathersName')}
          placeholder="Введите ваше отчество..."
          className="text-field surname"
          margin="normal"
        />
        <ValidatorForm
          ref="form"
        >
          <TextValidator
            id="email-placeholder"
            label="Почта"
            name="email"
            value={this.state.email}
            onChange={this.handleChange('email')}
            validators={['required', 'isEmail']}
            errorMessages={['this field is required', 'почта не валидна']}
            placeholder="Введите вашу почту..."
            className="text-field email"
            margin="normal"
          />
        </ValidatorForm>
        <TextField
          id="password-placeholder"
          label="Пароль"
          className="text-field"
          value={this.state.password}
          onChange={this.handleChange('password')}
          type="password"
          autoComplete="current-password"
          margin="normal"
        />
        <FormSelect
          id="university-placeholder"
          label="Университет"
          value={this.state.university}
          inputProps={{
            university: 'University',
            id: '0',
          }}
          className={classes.width}
          onChange={this.handleChange('university')}
          options={this.state.universityList}
        />
        <Button onClick={this.handleSubmit} className={classes.registerButton}>
          Зарегистрироваться
        </Button>
        {this.state.isRedirected && <Redirect to="/" />}
      </section>
    );
  }
}

export default withStyles(styles)(TeacherRegistration);
