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
import StudentMenu from './Components/List/StudentMenu';
import TeacherAddGroup from './Components/TeacherAddGroup/TeacherAddGroup';
import createMuiTheme from './Styles/MUIAppTheme';

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
        <Router>
          <div>
            <div className={classes.content}>
              <Header />
              <Route path="/" exact component={MainPage} />
              <Route path="/registration" component={RegisterForm} />
              <Route path="/studentMenu" component={StudentMenu} />
              <Route path="/teacher/addGroup" component={TeacherAddGroup} />
            </div>
            <Footer />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
