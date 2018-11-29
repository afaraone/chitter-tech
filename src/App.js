import React, { Component } from 'react';
import './App.css';
import UserApiHandler from './userapihandler';


class App extends Component {
  render() {
    return (
      <div className="App">
        <UserApiHandler />
      </div>
    );
  }
}

export default App;
