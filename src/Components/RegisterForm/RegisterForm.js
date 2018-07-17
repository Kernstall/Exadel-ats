import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import { Route, Link, Redirect } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import StudentRegistration from './StudentRegistration/StudentRegistration';
import TeacherRegistration from './TeacherRegistration/TeacherRegistration';
import './style.css';

const styles = theme => ({
  registerButton: {
    backgroundColor: '#2196f3',
    color: '#fff',
    margin: '15px',
    width: 300,
    '&:hover': {
      backgroundColor: '#1b77c5',
    },
  }
});

class RegisterForm extends React.Component {
  state = {
    selectedValue: 'a',
  };

  handleChange = event => {
    this.setState({ selectedValue: event.target.value });
  };

  render() {
    const { classes } = this.props;
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
        <Route exact path="/registration" component={() => <Redirect to="/registration/student"/>}/>
        <Route exact path="/registration/student" component={StudentRegistration}/>
        <Route exact path="/registration/teacher" component={TeacherRegistration}/>
        <Button className={classes.registerButton}>
          Register
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(RegisterForm);
