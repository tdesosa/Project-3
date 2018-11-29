import React, { Component } from 'react';
// import './style.css';

class Login extends Component {
  render(){
    return (
    <div>
      <h1>REGISTER</h1>
      <form onSubmit={this.props.handleRegisterSubmit} >
          <label> Username:</label>
          <input type='text' name="username" onChange={this.props.handleRegisterChange}></input>
          <label> Password:</label>
          <input type='password' name="password" onChange={this.props.handleRegisterChange}></input>
          <button type="Submit">Register</button>
      </form>
      <h1>LOGIN</h1>
      <form onSubmit={this.props.handleLoginSubmit} >
          <label> Username:</label>
          <input type='text' name="username" onChange={this.props.handleLoginChange}></input>
          <label> Password:</label>
          <input type='password' name="password" onChange={this.props.handleLoginChange}></input>
          <button type="Submit">Login</button>
      </form>
    </div>
    )
  }
}

export default Login;