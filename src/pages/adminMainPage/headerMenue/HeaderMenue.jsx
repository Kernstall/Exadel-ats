import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TeacherImg from '../../../img/teacher.svg';
import TasksImg from '../../../img/tasks.svg';
import StudentImg from '../../../img/student.svg';
import StatisticsImg from '../../../img/statistics.svg';
import GroupsImg from '../../../img/groups.svg';
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
  },
  headerItem: {
    width: 50,
    height: 60,
    display: 'flex',
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
    console.log('is', this.state.isHover);
    // console.log('event', event);
    // console.log('this', this);
    this.setState({
      isHover: !this.state.isHover,
      suggestion: suggestion,
      mauseCoordinates: {
        x: event.clientX,
        y: event.clientY,
      },
    });
    console.log('============================================');
    // console.log('event', event);
    // console.log('this', this);
  }

  render() {
    const { classes } = this.props;
    const { mauseCoordinates, suggestion, isHover } = this.state;
    return (
      <Grid container className={classes.root}>
        {isHover && <Hint {...this.state} />}
        <div className={classes.headerItem}>
          <img
            className={classes.img}
            onMouseEnter={this.handleMouseEnterSuggestions('teacher')}
            onMouseLeave={this.handleMouseEnterSuggestions('teacher')}
            src={TeacherImg}
            alt="teacher"
          />
        </div>
        <div className={classes.headerItem}>
          <img
            className={classes.img}
            src={TasksImg}
            alt="tasks"
            onMouseEnter={this.handleMouseEnterSuggestions('tasks')}
            onMouseLeave={this.handleMouseEnterSuggestions('teacher')}
          />
        </div>
        <div className={classes.headerItem}>
          <img
            className={classes.img}
            src={StudentImg}
            alt="student"
            onMouseEnter={this.handleMouseEnterSuggestions('student')}
            onMouseLeave={this.handleMouseEnterSuggestions('teacher')}
          />
        </div>
        <div className={classes.headerItem}>
          <img
            className={classes.img}
            src={StatisticsImg}
            alt="statistics"
            onMouseEnter={this.handleMouseEnterSuggestions('statistics')}
            onMouseLeave={this.handleMouseEnterSuggestions('teacher')}
          />
        </div>
        <div className={classes.headerItem}>
          <img
            className={classes.img}
            src={GroupsImg}
            alt="groups"
            onMouseEnter={this.handleMouseEnterSuggestions('groups')}
            onMouseLeave={this.handleMouseEnterSuggestions('teacher')}
          />
        </div>
      </Grid>
    );
  }
}
export default withStyles(styles)(HeaderMenue);
