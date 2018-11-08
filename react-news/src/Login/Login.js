import React, { Component } from 'react';
// import './style.css';
class Login extends Component {
  constructor(){
    super();

    this.state = {
      username: '',
      password: '',
      profilePic: ''
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }
  handleSubmit = async (e) => {
    e.preventDefault();

    const loginResponse = await fetch('http://localhost:9000/auth', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const parsedResponse = await loginResponse.json();

    if(parsedResponse.data === 'login successful'){
      console.log('login succesful')
      this.props.history.push('/news');
    }
  }
  render(){
    return (

      <form onSubmit={this.handleSubmit} >
        <label> Username:</label>
        <input type='text' name="username" onChange={this.handleChange}></input>
        <label> Password:</label>
        <input type='password' name="password" onChange={this.handleChange}></input>
        <button type="Submit">Login</button>
      </form>
      )
  }
}

export default Login;