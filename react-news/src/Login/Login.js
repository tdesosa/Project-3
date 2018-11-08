import React, { Component } from 'react';
import NewsContainer from '../NewsContainer/NewsContainer'
// import './style.css';
class Login extends Component {
  render(){
    return (
    <div>
      <form onSubmit={this.props.handleRegisterSubmit} >
          <label> Username:</label>
          <input type='text' name="username" onChange={this.props.handleRegisterChange}></input>
          <label> Password:</label>
          <input type='password' name="password" onChange={this.props.handleRegisterChange}></input>
          <button type="Submit">Register</button>
      </form>
      <form onSubmit={this.props.handleLoginSubmit} >
          <label> Username:</label>
          <input type='text' name="username" onChange={this.props.handleLoginChange}></input>
          <label> Password:</label>
          <input type='password' name="password" onChange={this.props.handleLoginChange}></input>
          <button type="Submit">Login</button>
      </form>
      {this.props.loggedIn === true ? <NewsContainer username={this.props.user.username} password={this.props.user.password} handleLogout={this.props.handleLogout} loggedIn={this.props.loggedIn} /> : <div></div>}
    </div>
    )
  }
}

export default Login;