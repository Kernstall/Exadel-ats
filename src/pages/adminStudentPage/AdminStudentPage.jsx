import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/es';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Common from '../../common/styles/Common';
import { getAdminStudents } from '../../commands/admin';
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
    name: 'Alexander Gusev Sergeevich',
    universityInfo: 'БГУ ФПМИ 2020',
    mediumTaskScore: '10',
    mediumTestScore: '10',
  },
  {
    name: 'Еремин Гульзар Десад',
    universityInfo: 'БГУИР ФПМИ 2022',
    mediumTaskScore: '8',
    mediumTestScore: '8',
  },
];

class AdminStudentPage extends Component {
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
    this.props.getAdminStudents(this.state.historyFilter);
  }

  componentDidUpdate(prevProps, prevState) {
    prevState.historyFilter == this.state.historyFilter
      || this.props.getAdminStudents(this.state.historyFilter);
  }

  handleHistoryFilter = (name, role, activityType) => {
    const newState = {
      historyFilter: { name, role, activityType },
    };
    this.setState(newState);
  };

  render() {
    const { classes, adminStudents } = this.props;
    if (adminStudents) {
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
          <h1>Students</h1>
        </Grid>
      );
    }
    return null;
  }
}


const mapStateToProps = state => ({
  adminStudents: state.adminStudents.adminStudents,
});

const mapCommandsToProps = dispatch => ({
  getAdminStudents: param => dispatch(getAdminStudents(param)),
});

export default connect(mapStateToProps, mapCommandsToProps)(withStyles(styles)(AdminStudentPage));
