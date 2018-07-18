import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import StudentTests from './StudentTests.jsx';

const styles = theme => ({

  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

function StudentTabTestsList(props) {
  const { classes, testsList } = props;
  return (
    <div className={classes.root}>
      <List
        component="nav"
      >
        {
          testsList.map(
            (test, index) => (
              <StudentTests
                test={test}
                key={index}
              />
            ),
          )
        }
      </List>
    </div>
  );
}

StudentTabTestsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentTabTestsList);
