import React, { Component } from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import Header from './Components/Header';
import Footer from './Components/Footer';
import LoginForm from './Components/LoginForm/LoginForm';

const styles = ({
  content: {
    minHeight: 'calc(100vh - 40px)',
  },
});

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.content}>
          <Header />
          <LoginForm />
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(styles)(App);
