import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({

  root: {
    width: '100%',
    backgroundColor: 'none',
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  listItem: {
    backgroundColor: 'transparent',
  },
  minWidth: {
    minWidth: '100%',
  },
  minWidthItem: {
    minWidth: '50%',
  },
});

class StudentTestsDDInfo extends React.Component {
  render() {
    const { classes, test } = this.props;
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={6}>
            <ListItemText inset primary={test.theme} />
          </Grid>
          <Grid item xs={6}>
            <ListItemText inset primary={test.status} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

StudentTestsDDInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentTestsDDInfo);
