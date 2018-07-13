import React from 'react';
import { withStyles } from '@material-ui/core/styles';
//import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import FilterFieldsCard from './FilterFieldsCard';

const styles = {
  StudentFilterCard: {
    maxWidth: '325px',
  },
};

class TeacherAddGroup extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.StudentFilterCard}>
        <FilterFieldsCard />
      </Paper>
    );
  }
}

export default withStyles(styles)(TeacherAddGroup);
