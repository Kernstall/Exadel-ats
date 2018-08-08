import React from 'react';
import TextField from '@material-ui/core/TextField';
import './style.css';
import MenuItem from '@material-ui/core/MenuItem';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
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

const gradYears = [2019, 2020, 2021, 2022, 2023, 2024, 2025];

class StudentRegistration extends React.Component {
  constructor() {
    super();

    this.state = {
      status: 'student',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      university: '',
      faculty: '',
      course: undefined,
      groupNumber: undefined,
      graduateYear: 0,
      isRedirected: false,
    };
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
    const universitiesArr = Object.keys(universities);
    console.log(universitiesArr);
    console.log(this.state.topics);
    const { university } = this.state;
    const { classes } = this.props;
    const facultiesArr = universities[university];

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
        <ValidatorForm
          onError={errors => console.log(errors)}
        >
          <TextValidator
            id="email-placeholder"
            label="Почта"
            name="email"
            value={this.state.email}
            onChange={this.handleChange('email')}
            validators={['required', 'isEmail']}
            errorMessages={['this field is required', 'email is not valid']}
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
          onChange={this.handleChange('university')}
          options={universitiesArr}
          className={classes.width}
        />
        {facultiesArr && (
        <FormSelect
          id="faculty-placeholder"
          label="Факультут"
          value={this.state.faculty}
          inputProps={{
            university: 'Faculty',
            id: '0',
          }}
          className={classes.width}
          onChange={this.handleChange('faculty')}
          options={facultiesArr}
        />
        )}
        <TextField
          id="group-placeholder"
          label="Номер группы"
          value={this.state.groupNumber}
          onChange={this.handleChange('groupNumber')}
          type="number"
          placeholder="Введите номер вашей группы..."
          className="text-field"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <TextField
          id="course-placeholder"
          label="Курс"
          value={this.state.course}
          onChange={this.handleChange('course')}
          type="number"
          placeholder="Введите номер вашего курса.."
          className="text-field"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <TextField
          id="graduateYear-placeholder"
          select
          label="Год выпуска"
          className="text-field"
          value={this.state.graduateYear}
          onChange={this.handleChange('graduateYear')}
          SelectProps={{
            MenuProps: {
              className: {
                width: 200,
              },
            },
          }}
          helperText="Выберите ваш год выпуска"
          margin="normal"
        >
          {gradYears.map((item, index) => (
            <MenuItem key={`gradYear${index}`} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
        <Button onClick={this.handleSubmit} className={classes.registerButton}>
          Зарегистрироваться
        </Button>
        {this.state.isRedirected && <Redirect to="/" />}
      </section>
    );
  }
}

export default withStyles(styles)(StudentRegistration);
