import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Customers from './components/customers';
import Button from '@material-ui/core/Button';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Express Starter</h1>
          {/* Sample Usage... make sure to import the button too! */}
          <Button variant="contained" color="primary">
            Temp Button
          </Button>
        </header>
        <Customers />
      </div>
    );
  }
}

export default App;
