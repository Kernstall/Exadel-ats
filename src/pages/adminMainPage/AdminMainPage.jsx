import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { Route, Redirect, Link } from 'react-router-dom';
import HeaderMenue from './headerMenue/HeaderMenue';
import AdminTeacherPage from '../adminTeacherPage/AdminTeacherPage';
import AdminHistoryPage from '../adminHistoryPage/AdminHistoryPage';
import AdminGroupPage from '../adminGroupPage/AdminGroupPage';
import AdminQuestionPage from '../adminQuestionPage/AdminQuestionPage';
import AdminStudentPage from '../adminStudentPage/AdminStudentPage';
import AdminTaskPage from '../adminTaskPage/AdminTaskPage';
import { PrivateRoute } from '../../common/loginForm/PrivateRouter';
import TeacherMainPage from '../teacherMainPage/TeacherMainPage';

const styles = {
  root: {
    marginTop: 6,
  },
};

class AdminMainPage extends Component {
  render() {
    const { classes } = this.props;

    let a = localStorage.getItem('user');
    a = a.substring(1, a.length - 1);
    const pathBack = `/teacher/id/${a}`;

    return (
      <div className={classes.root}>
        <HeaderMenue />
        {/* <Route path="/" component={() => <Redirect to="/" />} /> */}
        <Route path="/admin/id/" component={() => <Redirect to="/admin/history" />} />
        <Route path="/admin/history" exact component={AdminHistoryPage} />
        <Route path="/admin/teachers" exact component={AdminTeacherPage} />
        <Route path="/admin/students" exact component={AdminStudentPage} />
        <Route path="/admin/groups" exact component={AdminGroupPage} />
        <Route path="/admin/questions" exact component={AdminQuestionPage} />
        <Route path="/admin/tasks" exact component={AdminTaskPage} />
        <PrivateRoute exact path="/teacher/id/:id" component={TeacherMainPage} />
      </div>
    );
  }
}

export default withStyles(styles)(AdminMainPage);
