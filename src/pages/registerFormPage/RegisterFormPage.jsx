import React from 'react';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import { Route, Link, Redirect } from 'react-router-dom';
import StudentRegistration from './studentRegistration/StudentRegistration.jsx';
import TeacherRegistration from './teacherRegistration/TeacherRegistration.jsx';
import './style.css';

class RegisterForm extends React.Component {
  state = {
    selectedValue: 'a',
  };

  handleChange = (event) => {
    this.setState({ selectedValue: event.target.value });
  };

  render() {
    return (
      <form className="sign-up">
        <Typography className="sign-up-header" variant="headline">
          Sign Up
        </Typography>
        <section className="checkbox">
          <Typography>
            I'm a student
          </Typography>
          <Link to="/registration/student">
            <Radio
              checked={this.state.selectedValue === 'a'}
              onChange={this.handleChange}
              value="a"
              name="radio-button-demo"
              aria-label="A"
            />
          </Link>
          <Typography>
            I'm a teacher
          </Typography>
          <Link to="/registration/teacher">
            <Radio
              checked={this.state.selectedValue === 'b'}
              onChange={this.handleChange}
              value="b"
              name="radio-button-demo"
              aria-label="B"
            />
          </Link>
        </section>
        <Route exact path="/registration" component={() => <Redirect to="/registration/student" />} />
        <Route exact path="/registration/student" component={StudentRegistration} />
        <Route exact path="/registration/teacher" component={TeacherRegistration} />
      </form>
    );
  }
}

export default RegisterForm;
