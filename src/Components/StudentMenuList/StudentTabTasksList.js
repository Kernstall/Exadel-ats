import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import StudentTasks from './StudentTasks';

const styles = theme => ({

  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

function StudentTabTasksList(props) {
  const { classes, tasksList } = props;
  return (
    <div className={classes.root}>
      <List
        component="nav"
      >
        {
          tasksList.map(
            (task, index) => (
              <StudentTasks
                task={task}
                key={index}
              />
            ),
          )
        }
      </List>
    </div>
  );
}

StudentTabTasksList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentTabTasksList);
