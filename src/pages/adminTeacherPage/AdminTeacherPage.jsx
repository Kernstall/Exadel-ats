import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/es';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import CloudDownload from '@material-ui/icons/CloudDownload';
import Button from '@material-ui/core/Button';
import Common from '../../common/styles/Common';
import { getAdminTeachers } from '../../commands/admin';
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

  handleDownload = () => {
    this.props.getAdminTeachers(this.state.historyFilter, true);
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
              <ActivityListItems info={adminTeachers} />
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
  adminTeachers: state.adminTeachers.adminTeachers,
});

const mapCommandsToProps = dispatch => ({
  getAdminTeachers: (param, isFile) => dispatch(getAdminTeachers(param, isFile)),
});

export default connect(mapStateToProps, mapCommandsToProps)(withStyles(styles)(AdminTeacherPage));
