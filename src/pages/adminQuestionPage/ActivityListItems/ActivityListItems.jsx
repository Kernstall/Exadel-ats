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
  zero: {
    width: '40%',
  },
  first: {
    width: '30%',
  },
  second: {
    width: '19%',
  },
  third: {
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
    this.sortBy = ['kind', 'isTraining', 'difficultyRate', 'correctPrecent'];
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
    if (a[key][a[key].length - 1] !== '%') {
      if (a[key] < b[key]) {
        return 1;
      } if (a[key] > b[key]) {
        return -1;
      }
      return 0;
    }
    const intA = a[key].substring(0, a[key].length - 2);
    const intB = b[key].substring(0, b[key].length - 2);
    return intB - intA;
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
                <Grid item className={classes.zero}>
                  <ListItemText classes={{ primary: classes.primary }} primary={`${localize(element.kind)}`} />
                </Grid>
                <Grid item className={classes.first}>
                  <ListItemText className={{ root: classes.root }} secondary={`${element.isTraining}`} />
                </Grid>
                <Grid item className={classes.second}>
                  <ListItemText className={{ root: classes.root }} secondary={`${element.difficultyRate}`} />
                </Grid>
                <Grid item className={classes.third}>
                  <ListItemText className={{ root: classes.root }} secondary={`${element.correctPrecent}`} />
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
