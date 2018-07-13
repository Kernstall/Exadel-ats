import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({

  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class StudentActivities extends React.Component {
  render() {
    const { classes, activity } = this.props;
    return (
      <div className={classes.root}>
        <ListItem open="false" button onClick={this.handleClick}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <ListItemText inset primary={activity.date} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ListItemText inset primary={activity.name} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ListItemText inset primary={activity.score} />
            </Grid>
          </Grid>
        </ListItem>
      </div>
    );
  }
}

StudentActivities.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentActivities);
