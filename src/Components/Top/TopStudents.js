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

class TopStudents extends React.Component {
  render() {
    const { classes, topScoreStudentName } = this.props;
    console.log('topScoreStudentName', topScoreStudentName);
    return (
      <List component="nav" className={classes.width}>
        {
          topScoreStudentName.map(
            (student, index) => (
              <StudentInTop
                student={student}
                key={index} //eslint-disable-line
                number={index}
              />
            ),
          )
        }
      </List>
    );
  }
}

export default withStyles(styles)(TopStudents);
