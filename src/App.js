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
import AdminMainPage from './pages/adminMainPage/AdminMainPage';

const styles = ({
  content: {
    minHeight: 'calc(100vh - 40px)',
  },
  SpreadWrapper: {
  },
  ...Common,
});

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
              <Route path="/admin" component={AdminMainPage} />
            </div>
          </Router>
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
