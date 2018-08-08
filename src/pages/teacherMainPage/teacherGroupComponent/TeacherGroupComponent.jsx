import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import TeacherSelectedGroupComponent from '../teacherSelectedGroupComponent/TeacherSelectedGroupComponent.jsx';

const styles = theme => ({
  root: {
    margin: 'auto',
    color: 'whitesmoke',
    height: 'fit-content',
    width: '95%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addStudentButton: {
    '&:hover': {
      backgroundColor: '#1b77c5',
    },
    transition: '.3s',
    width: 200,
    color: '#fff',
    backgroundColor: '#2196f3',
  },
  teacherButtonsHolder: {
    display: 'flex',
    paddingTop: 25,
  },
  buttonCorrection: {
    paddingRight: 25,
  },
  noUnderline: {
    textDecoration: 'none',
    color: '#000',
  },
});

const TabContainer = props => (
  <Typography component="div">
    {props.children}
  </Typography>
);

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class TeacherGroupComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      groupName: '',
      amountOfStudents: '',
      studentList: [],
      _id: '',
    };
  }

  componentDidMount() {
    fetch(`/api/teacher/group/info?groupID=${this.props.id}`, {
      headers: {
        'Content-type': 'application/json',
        'Set-Cookie': 'true',
      },
      credentials: 'include',
    })
      .then(res => res.json())
      .then((res) => {
        this.setState({
          groupName: res.groupName,
          amountOfStudents: res.amountOfStudents,
          studentList: res.studentList,
          _id: res._id,
        });
      });
  }

  handleChange = (e, value) => {
    this.setState({ value });
  };

  render() {
    const { groupName, studentList } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <TeacherSelectedGroupComponent
          groupName={groupName}
          groupMembers={studentList}
        />
      </div>
    );
  }
}

export default withStyles(styles)(TeacherGroupComponent);
