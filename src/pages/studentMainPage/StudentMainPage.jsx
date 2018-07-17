import React from 'react';
import { Grid } from '@material-ui/core/es';
import { withStyles } from '@material-ui/core/styles';
import Capture from '../../common/capture/Capture';
import List from '../../common/Shared/list/List.jsx';
import Common from '../../common/Styles/Common';
import styles from './styles';

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
