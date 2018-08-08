import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import CloudDownload from '@material-ui/icons/CloudDownload';
import Button from '@material-ui/core/Button';
import Common from '../../common/styles/Common';
import { getAdminTasks } from '../../commands/admin';
import SearchBox from './searchBox/SearchBox';
import ActivityListItems from './ActivityListItems/ActivityListItems';
import Spinner from '../../common/shared/spinner';

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
  absoluteCenter: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    display: 'flex',
    left: 0,
    top: 0,
  },
  center: {
    margin: 'auto',
  },
  icon: {
    opacity: '0.3',
    marginLeft: 10,
  },
  button: {
    background: '#2196f350',
    '&:hover': {
      background: '#2196f3',
    },
    transition: '.4s',
    marginTop: '10px',
    width: 280,
    fontWeight: 300,
  },
};

class AdminTaskPage extends Component {
  constructor(props) { // eslint-disable-line
    super(props);
    this.state = {
      historyFilter: {},
    };
  }

  componentDidMount() {
    this.props.getAdminTasks(this.state.historyFilter, false);
  }

  componentDidUpdate(prevProps, prevState) {
    prevState.historyFilter == this.state.historyFilter
      || this.props.getAdminTasks(this.state.historyFilter);
  }

  handleDownload = () => {
    this.props.getAdminTasks(this.state.historyFilter, true);
  }

  handleHistoryFilter = (props) => {
    const newState = {
      historyFilter: { ...props },
    };
    console.log('newState', newState);
    this.setState(newState);
  };

  render() {
    const { classes, adminTasks } = this.props;
    if (adminTasks) {
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
            <Button className={classes.button} onClick={this.handleDownload}>
              Загрузить excel
              <CloudDownload className={classes.icon} />
            </Button>
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
              <ActivityListItems info={adminTasks} />
            </List>
          </Grid>
        </Grid>
      );
    }
    return (
      <div className={classes.absoluteCenter}>
        <Spinner className={classes.center} />
      </div>
    );
  }
}


const mapStateToProps = state => ({
  adminTasks: state.adminTasks.adminTasks,
});

const mapCommandsToProps = dispatch => ({
  getAdminTasks: (param, isFile) => dispatch(getAdminTasks(param, isFile)),
});

export default connect(mapStateToProps, mapCommandsToProps)(withStyles(styles)(AdminTaskPage));
