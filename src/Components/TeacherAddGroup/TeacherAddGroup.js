import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FilterStudentCard from './FilterFieldsCard';
import Paper from "@material-ui/core/es/Paper/Paper";

const styles = {
  FlexContainerHorizontal: {
    display: 'flex',
    'flex-wrap': 'wrap',
  },
};

class TeacherAddGroup extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.FlexContainerHorizontal}>
        <FilterStudentCard />
        <Paper>
          Hello WorldDDDDDDDDDDDDDDDDDD
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(TeacherAddGroup);
