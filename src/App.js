import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { Switch, Route, Router  } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Header from './Components/Header';
import Footer from './Components/Footer';
import LoginForm from './Components/LoginForm/LoginForm';
import Common from './Styles/Common';

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
      <div>
        <div className={classes.content}>
          <Header />
          <nav>
            <ul>
              <li>
                <Link to="/l">
                  None
                </Link>
              </li>
              <li>
                <Link to="/Components/LoginForm">
                  Footer
                </Link>
              </li>
              <li>
                <Link to="/Components">
                  Header
                </Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/Components/LoginForm" component={Footer} />
            <Route path="/Components" component={Header} />
          </Switch>
          <LoginForm />
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(styles)(App);
