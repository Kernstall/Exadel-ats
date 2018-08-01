import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Common from '../../../common/styles/Common';
import localize from '../../../localization/localization';
import Caption from '../caption/Caption';

const styles = {
  ...Common,
  fullWidth: {
    width: '100%',
  },
  names: {
    width: '20%',
  },
  date: {
    width: '40%',
  },
  role: {
    width: '30%',
  },
  userType: {
    width: '1%',
  },
  listItem: {
    marginBottom: 1,
  },
  primary: {
    fontSize: '15px',
  },

  root: {
    padding: 0,
    margin: 0,
  },
};

class ActivityListItems extends Component {
  constructor(props) {
    super(props);
    this.sortBy = ['name', 'universityInfo', 'mediumTaskScore', 'mediumTestScore'];
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
                  <ListItemText classes={{ primary: classes.primary }} primary={`${element.name}`} />
                </Grid>
                <Grid item className={classes.date}>
                  <ListItemText className={{ root: classes.root }} secondary={`${element.universityInfo}`} />
                </Grid>
                <Grid item className={classes.role}>
                  <ListItemText className={{ root: classes.root }} secondary={`${element.mediumTaskScore}`} />
                </Grid>
                <Grid item className={classes.userType}>
                  <ListItemText className={{ root: classes.root }} secondary={`${element.mediumTestScore}`} />
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
