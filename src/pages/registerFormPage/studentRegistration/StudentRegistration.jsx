import React from 'react';
import TextField from '@material-ui/core/TextField';
import './style.css';
import MenuItem from '@material-ui/core/es/MenuItem/MenuItem';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/es/Button/Button';
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
      .catch(rej => console.log(`Rejected: ${rej}`));
  };

  render() {
    const universitiesArr = Object.keys(universities);
    const { university } = this.state;
    const { classes } = this.props;
    const facultiesArr = universities[university];

    return (
      <section className="student-container">
        <TextField
          id="name-placeholder"
          label="First name"
          value={this.state.firstName}
          onChange={this.handleChange('firstName')}
          placeholder="Input your name..."
          className="text-field first-name"
        />
        <TextField
          id="lastname-placeholder"
          label="Last name"
          value={this.state.lastName}
          onChange={this.handleChange('lastName')}
          placeholder="Input your last name..."
          className="text-field surname"
          margin="normal"
        />
        <ValidatorForm
          onError={errors => console.log(errors)}
        >
          <TextValidator
            id="email-placeholder"
            label="Email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange('email')}
            validators={['required', 'isEmail']}
            errorMessages={['this field is required', 'email is not valid']}
            placeholder="Input your email..."
            className="text-field email"
            margin="normal"
          />
        </ValidatorForm>
        <TextField
          id="password-placeholder"
          label="Password"
          className="text-field"
          value={this.state.password}
          onChange={this.handleChange('password')}
          type="password"
          autoComplete="current-password"
          margin="normal"
        />
        <FormSelect
          id="university-placeholder"
          label="University"
          value={this.state.university}
          inputProps={{
            university: 'University',
            id: '0',
          }}
          onChange={this.handleChange('university')}
          options={universitiesArr}
        />
        {facultiesArr && (
        <FormSelect
          id="faculty-placeholder"
          label="Faculty"
          value={this.state.faculty}
          inputProps={{
            university: 'Faculty',
            id: '0',
          }}
          onChange={this.handleChange('faculty')}
          options={facultiesArr}
        />
        )}
        <TextField
          id="group-placeholder"
          label="Group number"
          value={this.state.groupNumber}
          onChange={this.handleChange('groupNumber')}
          type="number"
          placeholder="Input your group number..."
          className="text-field"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <TextField
          id="course-placeholder"
          label="Course"
          value={this.state.course}
          onChange={this.handleChange('course')}
          type="number"
          placeholder="Input your course..."
          className="text-field"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <TextField
          id="graduateYear-placeholder"
          select
          label="Graduation year"
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
          helperText="Please select your graduation year"
          margin="normal"
        >
          {gradYears.map((item, index) => (
            <MenuItem key={`gradYear${index}`} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
        <Button onClick={this.handleSubmit} className={classes.registerButton}>
          Register
        </Button>
      </section>
    );
  }
}

export default withStyles(styles)(StudentRegistration);
