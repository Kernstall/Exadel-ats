import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DirectionsRun from '@material-ui/icons/DirectionsRun';
import TeacherImg from '../../../img/teacher.svg';
import TasksImg from '../../../img/tasks.svg';
import StudentImg from '../../../img/student.svg';
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
  position: {
    position: 'absolute',
    right: 10,
    top: 10,
    color: 'black',

  },
  icon: {
    width: 38,
    height: 38,
    transition: '.3s',
    opacity: 0.3,
    '&:hover': {
      opacity: 0.8,
    },
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
      <div>
        <Grid container className={classes.root}>
          {isHover && <Hint {...this.state} />}
          <Link to="/admin/history">
            <div className={classes.headerItem}>
              <img
                className={classes.img}
                src={HistoryImg}
                alt="history"
                onMouseEnter={this.handleMouseEnterSuggestions('история')}
                onMouseLeave={this.handleMouseEnterSuggestions('teacher')}
              />
            </div>
          </Link>
          <Link to="/admin/teachers">
            <div className={classes.headerItem}>
              <img
                className={classes.img}
                onMouseEnter={this.handleMouseEnterSuggestions('учителя')}
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
                onMouseEnter={this.handleMouseEnterSuggestions('студенты')}
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
                onMouseEnter={this.handleMouseEnterSuggestions('группы')}
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
                onMouseEnter={this.handleMouseEnterSuggestions('задачи')}
                onMouseLeave={this.handleMouseEnterSuggestions('teacher')}
              />
            </div>
          </Link>
          <Link to="/admin/questions">
            <div className={classes.headerItem}>
              <img
                className={classes.img}
                src={QuestionsImg}
                alt="questions"
                onMouseEnter={this.handleMouseEnterSuggestions('вопросы')}
                onMouseLeave={this.handleMouseEnterSuggestions('teacher')}
              />
            </div>
          </Link>
        </Grid>
        <Link className={classes.position} to="/"><DirectionsRun className={classes.icon} /></Link>
      </div>
    );
  }
}
export default withStyles(styles)(HeaderMenue);
