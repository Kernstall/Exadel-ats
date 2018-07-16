import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core/es';
import { withStyles } from '@material-ui/core/styles';
import Capture from '../Capture/Capture';
import List from '../Shared/List/List';
import Common from '../../Styles/Common';

const info = [
  {
    groupName: '12FAMCS',
    completedTasks: '476767',
    allTasks: '6',
    completedTests: '10',
    allTests: '20',
  },
  {
    groupName: '13FAMCS',
    completedTasks: '5',
    allTasks: '7',
    completedTests: '9',
    allTests: '2131231',
  },
];

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
};


const StudentMainPage = ({ classes }) => {
  const studentInfoComponent = Object.keys(studentInfo).map(element => (
    <Grid>
      <Grid className={classes.infoCapture}>
        {element}
      </Grid>
      <Grid className={[classes.infoContent, classes.content].join(' ')}>
        {studentInfo[element]}
      </Grid>
    </Grid>
  ));

  return (
    <Grid className={classes.centerScreen}>
      <Capture className={classes.captionMargin}>
        Current groups
      </Capture>
      <List info={info} />
      <Capture className={classes.captionMargin}>
        Information about you
      </Capture>
      <Grid className={[classes.font, classes.wrapper].join(' ')}>
        {studentInfoComponent}
      </Grid>
    </Grid>
  );
};


export default withStyles(styles)(StudentMainPage);
