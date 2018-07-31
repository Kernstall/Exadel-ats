import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TeacherImg from '../../../img/teacher.svg';
import TasksImg from '../../../img/tasks.svg';
import StudentImg from '../../../img/student.svg';
import StatisticsImg from '../../../img/statistics.svg';
import GroupsImg from '../../../img/groups.svg';
import HistoryImg from '../../../img/history.svg';
import QuestionsImg from '../../../img/questions.svg';
import Hint from './hint/Hint';

const styles = {
  img: {
    height: `${window.screen.height * 0.03}px`,
    margin: 'auto',
    opacity: '.3',
    transition: '.3s',
    '&:hover': {
      opacity: '.8',
      cursor: 'pointer',
    },
  },
  root: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 'fit-content',
  },
  headerItem: {
    width: 50,
    height: 60,
    display: 'flex',
    userSelect: 'none',
  },
};

class HeaderMenue extends Component {
  constructor() {
    super();
    this.state = {
      isHover: false,
      suggestion: '',
      mauseCoordinates: {
        x: 0,
        y: 0,
      },
    };
  }

  handleMouseEnterSuggestions = suggestion => (event) => {
    this.setState({
      isHover: !this.state.isHover,
      suggestion,
      mauseCoordinates: {
        x: event.clientX,
        y: event.clientY,
      },
    });
  }

  render() {
    const { classes } = this.props;
    const { isHover } = this.state;
    return (
      <Grid container className={classes.root}>
        {isHover && <Hint {...this.state} />}
        <Link to="/admin/history">
          <div className={classes.headerItem}>
            <img
              className={classes.img}
              src={HistoryImg}
              alt="history"
              onMouseEnter={this.handleMouseEnterSuggestions('history')}
              onMouseLeave={this.handleMouseEnterSuggestions('teacher')}
            />
          </div>
        </Link>
        <Link to="/admin/teachers">
          <div className={classes.headerItem}>
            <img
              className={classes.img}
              onMouseEnter={this.handleMouseEnterSuggestions('teachers')}
              onMouseLeave={this.handleMouseEnterSuggestions('teacher')}
              src={TeacherImg}
              alt="teacher"
            />
          </div>
        </Link>
        <Link to="/admin/students">
          <div className={classes.headerItem}>
            <img
              className={classes.img}
              src={StudentImg}
              alt="student"
              onMouseEnter={this.handleMouseEnterSuggestions('students')}
              onMouseLeave={this.handleMouseEnterSuggestions('teacher')}
            />
          </div>
        </Link>
        <Link to="/admin/groups">
          <div className={classes.headerItem}>
            <img
              className={classes.img}
              src={GroupsImg}
              alt="groups"
              onMouseEnter={this.handleMouseEnterSuggestions('groups')}
              onMouseLeave={this.handleMouseEnterSuggestions('teacher')}
            />
          </div>
        </Link>
        <Link to="/admin/tasks">
          <div className={classes.headerItem}>
            <img
              className={classes.img}
              src={TasksImg}
              alt="tasks"
              onMouseEnter={this.handleMouseEnterSuggestions('tasks')}
              onMouseLeave={this.handleMouseEnterSuggestions('teacher')}
            />
          </div>
        </Link>
        <Link to="/admin/statistics">
          <div className={classes.headerItem}>
            <img
              className={classes.img}
              src={QuestionsImg}
              alt="statistics"
              onMouseEnter={this.handleMouseEnterSuggestions('questions')}
              onMouseLeave={this.handleMouseEnterSuggestions('teacher')}
            />
          </div>
        </Link>
      </Grid>
    );
  }
}
export default withStyles(styles)(HeaderMenue);
