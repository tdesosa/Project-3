import React, { Component } from 'react';
// import Login from './Login/Login';;
// import logo from './logo.svg';
import './App.css';
import NewsContainer from './NewsContainer/NewsContainer';


class App extends Component {
  constructor(){
    super();
    this.state = {
    }
  }
  render() {
    return (
      <div className="App">
        <NewsContainer />
      </div>
    );
  }
}

export default App;
