import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Route, Link, Redirect } from 'react-router-dom';
import Capture from '../../common/capture/Capture.jsx';
import List from '../../common/shared/list/List';
import Common from '../../common/styles/Common';
import { getStudentGroups } from '../../commands/studentGroups';
import Spinner from '../../common/shared/spinner/index';

const styles = {
  ...Common,
  wrapper: {
    padding: '20px 20px 20px 0px',
  },
  content: {
    margin: '5px 20px 10px 0px',
    fontWeight: '100',
    fontSize: '0.7em',
  },
  captionMargin: {
    margin: '100px',
  },
  absoluteCenter: {
    display: 'flex',
    center: {
      margin: 'auto',
    },
    position: 'absolute',
    height: '100vh',
    width: '100%',
    top: 0,
    left: 0,
  },
};

class StudentMainPage extends Component {
  componentDidMount() {
    this.props.getStudentGroups({ id: this.props.match.params.id }); // eslint-disable-line
  }

  JSONtoJSX = (studentInfo, classes, keysToRender) => (
    Object.keys(studentInfo).map((element) => {
      if (element in keysToRender) {
        return (
          <Grid item xs={6}>
            <Grid className={classes.infoCapture} container justify="center">
              {keysToRender[element]}
            </Grid>
            <Grid className={[classes.infoContent, classes.content].join(' ')} container justify="center">
              {studentInfo[element]}
            </Grid>
          </Grid>
        );
      }
    }));

  render() {
    const { classes, studentGroups } = this.props;

    let spinner;
    let groupList;
    let studentInfoComponent;

    const keysToRender = {
      fullName: 'Имя',
      university: 'Университет',
      faculty: 'Факультет',
      course: 'Курс',
      groupNumber: 'Номер группы',
      graduateYear: 'Год окончания',
    };

    if (!studentGroups) {
      spinner = (
        <Grid className={classes.absoluteCenter}>
          <Spinner className={classes.center} />
        </Grid>
      );
    } else {
      spinner = null;
      groupList = (
        <div>
          <Capture className={classes.captionMargin}>
            Мои группы
          </Capture>
          <List info={studentGroups} />
        </div>
      );
      studentInfoComponent = (
        <div>
          <Capture className={classes.captionMargin}>
            Информация обо мне
          </Capture>
          <Grid container direction="row">
            {this.JSONtoJSX(studentGroups.student, classes, keysToRender)}
          </Grid>
        </div>
      );
    }

    return (
      <Grid className={classes.centerScreen}>
        <Grid className={[classes.font, classes.wrapper].join(' ')}>
          {studentInfoComponent}
        </Grid>
        {spinner}
        {groupList}
      </Grid>
    );
  }
}
const styledComponent = withStyles(styles)(StudentMainPage);

const mapStateToProps = state => ({
  isLoading: state.studentGroups.isLoading,
  studentGroups: state.studentGroups.studentGroups,
});

const mapCommandsToProps = dispatch => ({
  getStudentGroups: param => dispatch(getStudentGroups(param)),
});

export default connect(mapStateToProps, mapCommandsToProps)(styledComponent);
