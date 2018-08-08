import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
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
      const date = new Date(_date);

      let day = date.getDate().toString();
      let monthIndex = (date.getMonth() + 1).toString();
      const year = (date.getFullYear()).toString();
      const hour = (date.getHours()).toString();
      const minute = (date.getMinutes()).toString();

      if (day.length === 1) {
        day = 0 + day;
      }

      if (monthIndex.length === 1) {
        monthIndex = 0 + monthIndex;
      }

      if (hour.length === 1) {
        hour = 0 + hour;
      }

      if (minute.length === 1) {
        minute = 0 + minute;
      }

      return `${day}.${monthIndex}.${year} ${hour}:${minute}`;
    };
    const { classes, activity } = this.props;
    return (
      <div className={classes.root}>
        <ListItem open="false" onClick={this.handleClick}>
          <Grid container>
            <Grid item xs>
              <ListItemText primary={`${dateToString(activity.date)}`}/>
            </Grid>
            <Grid item xs>
              <ListItemText primary={activity.name}/>
            </Grid>
            <Grid item xs>
              <ListItemText primary={activity.isPassed || activity.status ? 'Пройдено' : 'Не пройдено'}/>
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
