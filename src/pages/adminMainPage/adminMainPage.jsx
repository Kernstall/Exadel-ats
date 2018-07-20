import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/es';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Common from '../../common/styles/Common';
import { getActivities } from '../../commands/activities';
import SearchBox from '../../common/searchBox/SearchBox.jsx';
import ActivityListItems from './ActivityListItems/ActivityListItems';

const styles = {
  ...Common,
  centerScreen: {
    width: '70%',
    margin: '0 auto',
    paddingTop: '10px',
  },
  '@media (max-width: 400px)': {
    centerScreenMobile: {
      width: '100%',
      display: 'flex',
    },
  },
  marginLeft: {
    marginLeft: '5px',
    width: 'calc(100% - 310px)',
  },
  SearchBoxWidth: {
    minWidth: '280px',
  },
};

class adminMainPage extends Component {
  constructor(props) { // eslint-disable-line
    super(props);
  }

  componentDidMount() { // eslint-disable-next-line
    this.props.getActivities({
      role: 'teacher',
    });
  }

  render() {
    const { classes, activities } = this.props;

    if (activities) {
      return (
        <Grid
          alignItems="stretch"
          justify="center"
          container
          flexDirection="row"
          className={[classes.centerScreen, classes.centerScreenMobile].join(' ')}
        >
          <Grid item className={classes.SearchBoxWidth}>
            <SearchBox />
          </Grid>
          <Grid
            item
            className={classes.marginLeft}
          >
            <List
              disablePadding="false"
              component="nav"
              className={classes.noMargin}
            >
              <ActivityListItems info={activities} />
            </List>
          </Grid>
        </Grid>
      );
    }
    return null;
  }
}


const mapStateToProps = state => ({
  activities: state.activities.activities,
});

const mapCommandsToProps = dispatch => ({
  getActivities: param => dispatch(getActivities(param)),
});

export default connect(mapStateToProps, mapCommandsToProps)(withStyles(styles)(adminMainPage));
