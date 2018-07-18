import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
import TeacherMainPage from "./pages/teacherMainPage/TeacherMainPage";
import TeacherSelectedGroupComponent from "./pages/teacherMainPage/teacherSelectedGroupComponent/TeacherSelectedGroupComponent";
import TeacherGroupComponent from "./pages/teacherMainPage/teacherGroupComponent/TeacherGroupComponent";
import TeacherTasksList from "./common/teacherTasksList/TeacherTasksList";

const styles = ({
  content: {
    minHeight: 'calc(100vh - 40px)',
  },
  SpreadWrapper: {
  },
  ...Common,
});

const response = [
  {
    groupId: 1,
    groupName: 'First Group',
    studentsAmount: 21,
    groupMembers: [
      {
        name: 'Bob Marley',
        testsComplete: 3,
        tasksComplete: 5,
        score: 8.4,
      },
      {
        name: 'Aliaxei Dziadziuk',
        testsComplete: 3,
        tasksComplete: 5,
        score: 8.4,
      },
      {
        name: 'Maksim Anikeyeu',
        testsComplete: 3,
        tasksComplete: 5,
        score: 8.4,
      },
    ],
  },
  {
    groupId: 2,
    groupName: 'Second Group',
    studentsAmount: 27,
    groupMembers: [
      {
        name: 'Bob Marley',
        testsComplete: 3,
        tasksComplete: 5,
        score: 8.4,
      },
      {
        name: 'Aliaxei Dziadziuk',
        testsComplete: 3,
        tasksComplete: 5,
        score: 8.4,
      },
      {
        name: 'Maksim Anikeyeu',
        testsComplete: 3,
        tasksComplete: 5,
        score: 8.4,
      },
    ],
  },
  {
    groupId: 3,
    groupName: 'Third Group',
    studentsAmount: 18,
    groupMembers: [
      {
        name: 'Bob Marley',
        testsComplete: 3,
        tasksComplete: 5,
        score: 8.4,
      },
      {
        name: 'Aliaxei Dziadziuk',
        testsComplete: 3,
        tasksComplete: 5,
        score: 8.4,
      },
      {
        name: 'Maksim Anikeyeu',
        testsComplete: 3,
        tasksComplete: 5,
        score: 8.4,
      },
    ],
  },
];

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={createMuiTheme}>
        <div className={classes.SpreadWrapper}>
          <Router>
            <div className={classes.content}>
              <Header />
              <Route path="/" exact component={MainPage} />
              <Route path="/registration" component={RegisterForm} />
              <Route path="/studentMenu" component={StudentMenu} />
              <Route path="/teacher/addGroup" component={TeacherAddGroup} />
              <Route path="/student/mainPage" component={StudentMainPage} />
              <Route exact path="/groups" component={TeacherMainPage} />
              <Route path="/groups/:id" render={props => <TeacherGroupComponent {...props} />} />
              <Route exact path="/tasks" component={TeacherTasksList} />
            </div>
          </Router>
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
