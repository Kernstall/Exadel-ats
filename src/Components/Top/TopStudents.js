import React from 'react';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import sharedStyles from '../../Styles/Common';
import StudentInTop from './StudentInTop';

const styles = ({
  width: {
    width: '100%',
  },
  ...sharedStyles,
});

function TopStudents(props) {
  const { classes, topScoreStudentName } = props;
  return (
    <List component="nav" className={[classes.width]}>
      {
        topScoreStudentName.map(
          (student, index) => (
            <StudentInTop
              student={student}
              key={student}
              number={index}
            />
          ),
        )
      }
    </List>
  );
}

export default withStyles(styles)(TopStudents);
