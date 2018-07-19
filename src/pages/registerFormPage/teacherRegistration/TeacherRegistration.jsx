import React from 'react';
import TextField from '@material-ui/core/TextField';
import './style.css';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
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

class TeacherRegistration extends React.Component {
  constructor() {
    super();

    this.state = {
      status: 'teacher',
      firstName: '',
      lastName: '',
      fathersName: '',
      email: '',
      password: '',
      university: '',
    };

    this.handleSelectUnChange = this.handleSelectUnChange.bind(this);
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSelectUnChange(event) {
    this.setState({
      university: event.target.value,
    });
  }

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

    const { classes } = this.props;

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
        <TextField
          id="fathername-placeholder"
          label="Father name"
          value={this.state.fathersName}
          onChange={this.handleChange('fathersName')}
          placeholder="Input your father name..."
          className="text-field surname"
          margin="normal"
        />
        <ValidatorForm
          ref="form"
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
        <Button onClick={this.handleSubmit} className={classes.registerButton}>
          Register
        </Button>
      </section>
    );
  }
}

export default withStyles(styles)(TeacherRegistration);
