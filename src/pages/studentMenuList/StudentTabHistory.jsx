import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import StudentActivities from './StudentActivities.jsx';

const styles = theme => ({

  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

const StudentTabHistory = (props) => {
  const { classes, activitiesList } = props;
  return (
    <div className={classes.root}>
      <List component="nav">
        {
          activitiesList.map(
            (activity, index) => (
              <StudentActivities
                activity={activity}
                key={index}
              />
            ),
          )
        }
      </List>
    </div>
  );
};

StudentTabHistory.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentTabHistory);
