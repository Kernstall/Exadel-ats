import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/es/styles/MuiThemeProvider';
import Header from './common/Header.jsx';
import Footer from './common/Footer.jsx';
import RegisterForm from './pages/registerFormPage/RegisterFormPage.jsx';
import Common from './common/styles/Common';
import MainPage from './pages/mainPage/MainPage.jsx';
import StudentMenu from './common/studentMenuList/StudentMenu.jsx';
import TeacherAddGroup from './common/teacherAddGroup/TeacherAddGroup.jsx';
import createMuiTheme from './common/styles/MUIAppTheme';
import StudentMainPage from './pages/studentMainPage/StudentMainPage.jsx';
import AdminMainPage from './pages/adminMainPage/AdminMainPage.jsx';
import TeacherMainPage from './pages/teacherMainPage/TeacherMainPage';
import AttemptFiles from './common/studentMenuList/AttemptFiles';
import TaskView from './common/taskView/TaskView';
import TeacherTaskEdit from './common/teachetTaskEdit/TeacherTaskEdit';
import { PrivateRoute } from './common/loginForm/PrivateRouter';
import ErrorDispatcher from './common/shared/ErrorDispatcher/ErrorDispatcher';
import TeacherGroupComponent from './pages/teacherMainPage/teacherGroupComponent/TeacherGroupComponent.jsx';
import PassingTest from './common/passingTest/StudentPassingTest.jsx';
import TeacherCreateTestQuestion from './pages/teacherCreateTestQuestion/TeacherCreateTestQuestion';
import ExaminationTest from './common/passingTest/ExaminationTest.jsx';

const styles = ({
  content: {
    minHeight: 'calc(100vh - 40px)',
  },
  ...Common,
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={createMuiTheme}>
        <div className={classes.minHeight}>
          <Router>
            <div className={classes.content}>
              <ErrorDispatcher />
              <Route path="/" component={Header} />
              <Route path="/" exact component={MainPage} />
              <Route path="/registration" component={RegisterForm} />
              <Route path="/studentMenu/:groupId" component={StudentMenu} />
              <Route exact path="/teacher/addGroup" component={TeacherAddGroup} />
              <PrivateRoute exact path="/student/id/:id" component={StudentMainPage} />
              <Route exact path="/teacher/id/:id" component={TeacherMainPage} />
              <Route path="/admin" component={AdminMainPage} />
              <Route exact path="/task/attempt/:taskId/:attemptNumber" component={AttemptFiles} />
              <Route path="/teacher/task/edit/:id" component={TeacherTaskEdit} />
              <Route path="/teacher/tasks/:id" component={TaskView} />
              <Route path="/teacher/groups/:id" component={TeacherGroupComponent} />
              <Route path="/teacher/question/add" component={TeacherCreateTestQuestion} />
              <Route path="/teacher/task/add" component={TeacherCreateTestQuestion} />
              <Route path="/student/passingTest/:topicId" component={PassingTest} />
              <Route path="/student/examination/test/:testId" component={ExaminationTest} />
            </div>
          </Router>
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
