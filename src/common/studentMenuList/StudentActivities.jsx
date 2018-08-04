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
    const dateToString = (_date) => {
      function addZero(i) {
        if (i < 10) {
          i = `0${i}`;
        }
        return i;
      }
      const date = new Date(Date.parse(_date));
      const parsedTime = `${addZero(date.getDay())}.${addZero(date.getMonth())}.${addZero(date.getFullYear())}`;
      const parsedData = `${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
      return `${parsedTime} ${parsedData}`;
    };
    const { classes, activity } = this.props;
    return (
      <div className={classes.root}>
        <ListItem open="false" onClick={this.handleClick}>
          <Grid container>
            <Grid item xs>
              <ListItemText primary={`${dateToString(activity.date)}`} />
            </Grid>
            <Grid item xs>
              <ListItemText primary={activity.name} />
            </Grid>
            <Grid item xs>
              <ListItemText primary={activity.isPassed || activity.status ? 'Пройдено' : 'Не пройдено'} />
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
