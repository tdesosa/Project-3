import React, { Component } from 'react';
import Login from './Login/Login';
import NewsContainer from './NewsContainer/NewsContainer';
import NewsDropdown from './NewsDropdown/NewsDropdown';
import { Route, Switch } from 'react-router-dom'
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
        <main>
          <Switch>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/" component={NewsDropdown}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
