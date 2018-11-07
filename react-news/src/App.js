import React, { Component } from 'react';
// import Login from './Login/Login';
import NewsContainer from './NewsContainer/NewsContainer';
import NewsDropdown from './NewsDropdown/NewsDropdown';
// import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(){
    super();
    this.state = {
    }
  }
  render() {
    return (
      <div className="App">
        <NewsDropdown />
      </div>
    );
  }
}

export default App;
