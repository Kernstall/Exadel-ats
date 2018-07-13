import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Route, Link } from 'react-router-dom';
import './style.css';
import RegisterForm from '../RegisterForm/RegisterForm';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class StudentMainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      courses: [],
    };
  }

  render() {
    return (
      <section className="student-container">
        <Typography>
          Information
        </Typography>
        <Typography>
          Courses
        </Typography>
        <List component="nav">
          <ListItem button>
            <ListItemText primary="Course_name1" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Course_name1" />
          </ListItem>
        </List>
      </section>
    );
  }
}

export default StudentMainPage;
