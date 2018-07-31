import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/es';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/es/Button/Button';
import Common from '../../common/styles/Common';
import { getActivities } from '../../commands/activities';
import SearchBox from '../../common/searchBox/SearchBox.jsx';
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

  handleOnClick = () => {
    fetch('/api/admin/statistics/questions', {
      method: 'GET',
      headers: {
        'Content-type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Set-Cookie': 'true',
      },
      credentials: 'include',
    }).then(res => res.blob())
      .then((data) => {
        const a = document.createElement('a');
        const url = window.URL.createObjectURL(data);
        a.href = url;
        a.download = 'teacher-workbook.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(rej => console.log(`Rejected: ${rej}`));
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
          <h1>Teacher</h1>
          <Button onClick={this.handleOnClick}>CLICK</Button>
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
