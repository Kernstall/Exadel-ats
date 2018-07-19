import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FilterStudentCard from './FilterFieldsCard.jsx';
import DragAndDropStudents from './DragAndDropStudents';

const styles = {
  FlexContainerHorizontal: {
    display: 'flex',
    'flex-wrap': 'wrap',
    width: '100%',
  },
};

class TeacherAddGroup extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.FlexContainerHorizontal}>
        <FilterStudentCard />
        <DragAndDropStudents />
      </div>
    );
  }
}

export default withStyles(styles)(TeacherAddGroup);
