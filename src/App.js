import React, { Component } from 'react';
import './stylesheets/App.css';
import UserApiHandler from './userapihandler';


class App extends Component {
  render() {
    return (<>
              <h1 id='title'>Chitter</h1>
              <UserApiHandler />
            </>);
  };
};

export default App;
