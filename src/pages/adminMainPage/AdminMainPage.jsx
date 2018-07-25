import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/es';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Common from '../../common/styles/Common';
import { getActivities } from '../../commands/activities';
import SearchBox from '../../common/searchBox/SearchBox.jsx';
import ActivityListItems from './ActivityListItems/ActivityListItems';
import Menue from './menue/Menue';

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
  SearcBox: {
    minWidth: '300px',
  },
  menue: {
    margin: '10px',
  },
};

class AdminMainPage extends Component {
  constructor(props) { // eslint-disable-line
    super(props);
    this.state = {
      historyFilter: {
        name: '',
        role: '',
        activityType: '',
      },
    };
  }

  componentDidMount() { // eslint-disable-next-line
    this.props.getActivities(this.state.historyFilter);
  }

  componentDidUpdate(prevProps, prevState) {
    prevState.historyFilter == this.state.historyFilter
      || this.props.getActivities(this.state.historyFilter);
  }

  handleHistoryFilter = (name, role, activityType) => {
    const newState = {
      historyFilter: { name, role, activityType },
    };
    this.setState(newState);
  };

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
          <Grid item className={classes.SearcBox}>
            <SearchBox handleHistoryFilter={this.handleHistoryFilter} />
            <Menue className={classes.menue} />
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

export default connect(mapStateToProps, mapCommandsToProps)(withStyles(styles)(AdminMainPage));
