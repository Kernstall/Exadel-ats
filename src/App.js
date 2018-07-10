import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Header from './Components/Header';
import Footer from './Components/Footer';
import LoginForm from './Components/LoginForm/LoginForm';
import Common from './Styles/Common';
import TopStudents from './Components/TopStudents';

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
          <div className={classes.centerScreen}>
            <nav>
              <ul>
                <li>
                  <Link to="/">
                    None
                  </Link>
                </li>
                <li>
                  <Link to="/Components/LoginForm">
                    Auth
                  </Link>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route path="/Components/LoginForm" component={LoginForm} />
            </Switch>
            <TopStudents
              topScoreStudentName={[
                'dimon',
                'sasha',
                'misha',
                'nigga',
              ]}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(styles)(App);
