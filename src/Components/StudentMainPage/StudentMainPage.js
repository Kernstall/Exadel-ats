import React, { Component } from 'react';
import { Grid } from '@material-ui/core/es';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Capture from '../Capture/Capture';
import List from '../Shared/List/List';
import Common from '../../Styles/Common';
import { getStudentGroups } from '../../commands/studentGroups';
import Spinner from '../Shared/Spinner';

const info = {
  studentGroups: [
    {
      groupName: '12FAMCS',
      completedTasks: '476767',
      allTasks: '6',
      completedTests: '10',
      allTests: '20',
    },
  ],
};

const studentInfo = {
  StudentName: 'Igor\'',
  ActiveCourses: ['12FAMCS 13FAMCS'],
  averageScore: '3.5',
};

const styles = {
  ...Common,
  wrapper: {
    padding: '20px 20px 20px 60px',
  },
  content: {
    margin: '5px 20px 10px 20px',
    fontWeight: '100',
  },
  captionMargin: {
    margin: '40px',
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
  }
};

class StudentMainPage extends Component {
  componentDidMount() {
    this.props.getStudentGroups({ param: 'param for command' }); // eslint-disable-line
  }

  JSONtoJSX = (studentInfo, classes) => (
    Object.keys(studentInfo).map(element => (
      <Grid>
        <Grid className={classes.infoCapture}>
          {element}
        </Grid>
        <Grid className={[classes.infoContent, classes.content].join(' ')}>
          {studentInfo[element]}
        </Grid>
      </Grid>
    ))
  );

  render() {
    const { classes, isLoading, studentGroups } = this.props;

    console.log('isLoading', isLoading);
    console.log('students', studentGroups);

    let spinner;
    let groupList;
    let studentInfoComponent;

    if (!studentGroups) {
      spinner = <Grid className={classes.absoluteCenter}><Spinner className={classes.center} /></Grid>;
    } else {
      spinner = null;
      groupList = (
        <div>
          <Capture className={classes.captionMargin}>
            Current groups
          </Capture>
          <List info={studentGroups} />
        </div>
      );
      studentInfoComponent = (
        <div>
          <Capture className={classes.captionMargin}>
            Information about you
          </Capture>
          {this.JSONtoJSX(studentInfo, classes)}
        </div>
      )
    }

    return (
      <Grid className={classes.centerScreen}>
        {spinner}

        {groupList}

        <Grid className={[classes.font, classes.wrapper].join(' ')}>
          {studentInfoComponent}
        </Grid>
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
