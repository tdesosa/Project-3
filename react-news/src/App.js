import React, { Component } from 'react';
import Login from './Login/Login';
import NewsContainer from './NewsContainer/NewsContainer';
import { Route, Switch } from 'react-router-dom';
import './App.css';



class App extends Component {
  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
      _id: ''
    }
  }
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/news" component={NewsContainer}/>
        </Switch>
      </div>
    );
  }
}

export default App;
