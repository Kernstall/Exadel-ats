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
    const themes = test.topicsNames.map(theme => theme.name);
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <ListItemText primary={themes.join(' ')} />
          </Grid>
          <Grid item xs={6}>
            <ListItemText primary={(test.result > 0) ? test.result : 'Not sent'} />
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
