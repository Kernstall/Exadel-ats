import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/es/styles/MuiThemeProvider';
import Header from './Components/Header';
import Footer from './Components/Footer';
import RegisterForm from './Components/RegisterForm/RegisterForm';
import Common from './Styles/Common';
import MainPage from './Components/MainPage/MainPage';
import StudentMenu from './Components/StudentMenuList/StudentMenu';
import TeacherAddGroup from './Components/TeacherAddGroup/TeacherAddGroup';
import createMuiTheme from './Styles/MUIAppTheme';

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
          <Header />
          <Router>
            <div className={classes.content}>
              <Route path="/" exact component={MainPage} />
              <Route path="/registration" component={RegisterForm} />
              <Route path="/studentMenu" component={StudentMenu} />
              <Route path="/teacher/addGroup" component={TeacherAddGroup} />
            </div>
          </Router>
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
