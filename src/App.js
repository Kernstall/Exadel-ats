import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Header from './Components/Header';
import Footer from './Components/Footer';
import RegisterForm from './Components/RegisterForm/RegisterForm';
import Common from './Styles/Common';
import MainPage from './Components/MainPage/MainPage';
import StudentMenu from './Components/StudentMenuList/StudentMenu';

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
      <Router>
        <div>
          <div className={classes.content}>
            <Header />
            <Route path="/" exact component={MainPage} />
            <Route path="/registration" component={RegisterForm} />
            <Route path="/studentMenu" component={StudentMenu} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default withStyles(styles)(App);
