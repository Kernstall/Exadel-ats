import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/es';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Common from '../../common/styles/Common';
import { getActivities } from '../../commands/admin';
import SearchBox from './searchBox/SearchBox';
import ActivityListItems from './ActivityListItems/ActivityListItems';

const styles = {
  ...Common,
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

const mocks = [
  {
    name: 'Побегайло Александр Павлович',
    email: 'pobegos@bsu.by',
    numberTestsToCheck: '13',
    university: 'BSU',
  },
  {
    name: 'Зенько Татьяна Алексеевна',
    email: 'zenko@bsu.by',
    numberTestsToCheck: '1',
    university: 'BSU',
  },
];

class AdminTeacherPage extends Component {
  constructor(props) { // eslint-disable-line
    super(props);
    this.state = {
      historyFilter: {
        name: '',
        email: '',
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

  handleHistoryFilter = (name, activityType) => {
    const newState = {
      historyFilter: { name, activityType },
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
              <ActivityListItems info={mocks} />
            </List>
          </Grid>
          <h1>Teacher</h1>
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

export default connect(mapStateToProps, mapCommandsToProps)(withStyles(styles)(AdminTeacherPage));
