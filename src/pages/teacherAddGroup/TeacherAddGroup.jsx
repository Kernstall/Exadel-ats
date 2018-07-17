import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/es/Paper/Paper';
import FilterStudentCard from './FilterFieldsCard.jsx';

const styles = {
  flexContainerHorizontal: {
    display: 'flex',
    'flex-wrap': 'wrap',
  },
};

class TeacherAddGroup extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.flexContainerHorizontal}>
        <FilterStudentCard />
        <Paper>
          Hello WorldDDDDDDDDDDDDDDDDDD
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(TeacherAddGroup);
