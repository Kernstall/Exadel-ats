import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Switch } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Header from './Components/Header';
import Footer from './Components/Footer';
import RegisterForm from './Components/RegisterForm/RegisterForm';
import LoginForm from './Components/LoginForm/LoginForm';
import Common from './Styles/Common';
import TopStudents from './Components/TopStudents';
import TabComponent from './Components/TabComponent/TabComponent';

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
          <Route path="/" exact component={LoginForm} />
          <Route path="/registration" component={RegisterForm} />
          </div>
          <Footer />
        </div>
      </Router>

    );
  }
}

export default withStyles(styles)(App);
