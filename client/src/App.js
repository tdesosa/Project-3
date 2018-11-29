import {withRouter} from 'react-router-dom'
import React, { Component } from 'react';
import Login from './Login/Login';
import NewsContainer from './NewsContainer/NewsContainer';
import { Route, Switch } from 'react-router-dom';
import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {
        username: '',
        password: '',
        _id: ''
      },
      loggedIn: false,
    }
  }
  handleRegisterChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }
  handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const registerResponse = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/auth/register`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const parsedRegisterResponse = await registerResponse.json();

    if(parsedRegisterResponse.data === 'register successful'){
      console.log('successful registration')
      this.props.history.push('/news');
    }
  }
  handleLoginChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }
  handleLoginSubmit = async (e) => {
    e.preventDefault();
    const loginResponse = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const parsedLoginResponse = await loginResponse.json();
    console.log(parsedLoginResponse)
    if(parsedLoginResponse.status === 200){
      console.log('logged in')
      this.setState({
        loggedIn: true,
        user: parsedLoginResponse.data
      })
      // change our component
      console.log('successful login')
      console.log(this.state.loggedIn);
      this.props.history.push('/news');
    }
  }
  handleLogout = async (e) => {
    console.log('LOGOUT CLICK')
    await this.setState({
      loggedIn: false
    })
    console.log(this.state.loggedIn)
    this.props.history.push("/");
  }
  deleteUser = async (id) => {


    const deleteUserResponse = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/users/` + id, {
      method: 'DELETE'
    });

    // This is the parsed response from express
    const deleteUserParsed = await deleteUserResponse.json();


    console.log(deleteUserParsed, ' response from express server')
    this.props.history.push("/");
  }
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => {
            return <Login user={this.state.user} loggedIn={this.state.loggedIn} handleRegisterChange={this.handleRegisterChange} handleRegisterSubmit={this.handleRegisterSubmit} handleLoginChange={this.handleLoginChange} handleLoginSubmit={this.handleLoginSubmit} />
          }}/>
          <Route exact path="/news" render={() => {
            return <NewsContainer user={this.state.user} deleteUser={this.deleteUser} handleLogout={this.handleLogout}/>
          }}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
