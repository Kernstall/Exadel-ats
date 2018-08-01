import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Common from '../../../common/styles/Common';
import localize from '../../localization';
import Caption from '../caption/Caption';

const styles = {
  ...Common,
  fullWidth: {
    width: '100%',
  },
  date: {
    width: '15%',
  },
  role: {
    width: '20%',
  },
  userType: {
    width: '30%',
  },
  listItem: {
    marginBottom: 1,
  },
  primary: {
    fontSize: '15px',
  },
  names: {
    width: '30%',
  },
  root: {
    padding: 0,
    margin: 0,
  },
};

class ActivityListItems extends Component {
  constructor(props) {
    super(props);
    this.sortBy = ['name', 'date', 'userType', 'type'];
    this.state = {
      sortBy: this.sortBy[0],
      isDecreasing: true,
    };
  }

  onChangeHandle = clickedSortBy => (event) => {
    const { sortBy, isDecreasing } = this.state;
    this.setState({
      sortBy: clickedSortBy,
      isDecreasing: sortBy === clickedSortBy ? !isDecreasing : true,
    });
  }

  comparator = key => (a, b) => {
    if (a[key] < b[key]) {
      return 1;
    } if (a[key] > b[key]) {
      return -1;
    }
    return 0;
  };
  // eslint-disable-next-line
  sort(array, cryterions, isDecreasing) {
    const result = array.sort(this.comparator(cryterions));
    return isDecreasing ? result : result.reverse();
  }

  render() {
    const { classes, info } = this.props;
    const { sortBy, isDecreasing } = this.state;

    const sortedInfo = this.sort(info, sortBy, isDecreasing);

    const dateToString = (_date) => {
      const date = new Date(Date.parse(_date));
      const parsedTime = `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;
      const parsedData = `${date.getHours()}:${date.getMinutes()}`;
      return `${parsedTime} ${parsedData}`;
    };

    return (
      <div>
        <Paper className={classes.control} elevation={0}>
          <Caption
            onChangeSorting={this.onChangeHandle}
            captionNames={this.sortBy}
            {...this.state}
          />
        </Paper>
        {sortedInfo.map(element => (
          <Paper className={classes.listItem} elevation={1}>
            <ListItem button elevation={0}>
              <Grid container className={classes.fullWidth}>
                <Grid item className={classes.names}>
                  <ListItemText classes={{ primary: classes.primary }} primary={`${localize(element.name)}`} />
                </Grid>
                <Grid item className={classes.date}>
                  <ListItemText className={{ root: classes.root }} secondary={`${dateToString(element.date)}`} />
                </Grid>
                <Grid item className={classes.role}>
                  <ListItemText className={{ root: classes.root }} secondary={`${localize(element.userType)}`} />
                </Grid>
                <Grid item className={classes.userType}>
                  <ListItemText className={{ root: classes.root }} secondary={`${localize(element.type)}`} />
                </Grid>
              </Grid>
            </ListItem>
          </Paper>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(ActivityListItems);
