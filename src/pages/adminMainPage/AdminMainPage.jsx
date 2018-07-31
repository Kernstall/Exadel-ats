import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/es';
import { Route, Redirect } from 'react-router-dom';
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
      <div className={classes.root}>
        <HeaderMenue />
        {/* <Route path="/" component={() => <Redirect to="/" />} /> */}
        <Route path="/admin/id/" component={() => <Redirect to="/admin/history" />} />
        <Route path="/admin/history" exact component={AdminHistoryPage} />
        <Route path="/admin/teachers" exact component={AdminTeacherPage} />
        <Route path="/admin/students" exact component={AdminStudentPage} />
        <Route path="/admin/groups" exact component={AdminGroupPage} />
        <Route path="/admin/statistics" exact component={AdminStatisticsPage} />
        <Route path="/admin/tasks" exact component={AdminTaskPage} />
      </div>
    );
  }
}

export default withStyles(styles)(AdminMainPage);
