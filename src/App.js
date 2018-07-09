import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import LoginForm from './Components/LoginForm/LoginForm';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <LoginForm/>
        <Footer />
      </div>
    );
  }
}

export default App;
