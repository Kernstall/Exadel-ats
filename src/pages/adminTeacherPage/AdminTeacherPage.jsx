import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/es';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Common from '../../common/styles/Common';
import { getAdminTeachers } from '../../commands/admin';
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

class AdminTeacherPage extends Component {
  constructor(props) { // eslint-disable-line
    super(props);
    this.state = {
      historyFilter: {},
    };
  }

  componentDidMount() { // eslint-disable-next-line
    this.props.getAdminTeachers(this.state.historyFilter);
  }

  componentDidUpdate(prevProps, prevState) {
    prevState.historyFilter == this.state.historyFilter
      || this.props.getAdminTeachers(this.state.historyFilter);
  }

  handleHistoryFilter = (params) => {
    const newState = {
      historyFilter: params,
    };
    this.setState(newState);
  };

  render() {
    const { classes, adminTeachers } = this.props;
    console.log('adminTeachers', adminTeachers);
    if (adminTeachers) {
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
              <ActivityListItems info={adminTeachers} />
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
  adminTeachers: state.adminTeachers.adminTeachers,
});

const mapCommandsToProps = dispatch => ({
  getAdminTeachers: param => dispatch(getAdminTeachers(param)),
});

export default connect(mapStateToProps, mapCommandsToProps)(withStyles(styles)(AdminTeacherPage));
