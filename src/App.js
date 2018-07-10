import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import RegisterForm from './Components/RegisterForm/RegisterForm';
import LoginForm from './Components/LoginForm/LoginForm';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Footer />
          <Route path="/" exact component={LoginForm} />
          <Route path="/registration" component={RegisterForm} />
        </div>
      </Router>
    );
  }
}

export default App;
