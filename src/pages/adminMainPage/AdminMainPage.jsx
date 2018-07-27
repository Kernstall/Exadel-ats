import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/es';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { getActivities } from '../../commands/activities';
import HeaderMenue from './headerMenue/HeaderMenue';
import AdminTeacherPage from '../adminTeacherPage/AdminTeacherPage';
import AdminHistoryPage from '../adminHistoryPage/AdminHistoryPage';
import AdminGroupPage from '../adminGroupPage/AdminGroupPage';
import AdminStatisticsPage from '../adminStatisticsPage/AdminStatisticsPage';
import AdminStudentPage from '../adminStudentPage/AdminStudentPage';
import AdminTaskPage from '../adminTaskPage/AdminTaskPage';

const styles = {
  root: {
    marginTop: 6,
  },
};

class AdminMainPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Router className={classes.root}>
        <div>
          <HeaderMenue />
          <Route path="/admin" component={() => <Redirect to="/admin/history" />} />
          <Route path="/admin/history" exact component={AdminHistoryPage} />
          <Route path="/admin/teachers" exact component={AdminTeacherPage} />
          <Route path="/admin/students" exact component={AdminStudentPage} />
          <Route path="/admin/groups" exact component={AdminGroupPage} />
          <Route path="/admin/statistics" exact component={AdminStatisticsPage} />
          <Route path="/admin/tasks" exact component={AdminTaskPage} />
        </div>
      </Router>
    );
  }
}


const mapStateToProps = state => ({
  activities: state.activities.activities,
});

const mapCommandsToProps = dispatch => ({
  getActivities: param => dispatch(getActivities(param)),
});

export default connect(mapStateToProps, mapCommandsToProps)(withStyles(styles)(AdminMainPage));
