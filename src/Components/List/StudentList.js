import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import StudentTasksList from './StudentTasksList';

const styles = theme => ({

  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

function StudentList(props) {
  const {classes, tasksList} = props;
  return (
    <div className={classes.root}>
      <List
        component="nav"
      >
        {
          tasksList.map(
            (task, index) => (
              <StudentTasksList
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

StudentList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentList);
