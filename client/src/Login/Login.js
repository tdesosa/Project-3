import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import './style.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render(){
    return (
    <div>
      <div id="instructions">
        <Button color="warning" onClick={this.toggle}>What's The Idea Here?</Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Your News > Their News > Fake News</ModalHeader>
            <ModalBody>
              In the age of information, being able to trust a news source is key. YourNewsApp allows you to take control of your news feed so that the information you digest is not force fed but rather hand selected.
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>Close, Register, Start Reading!</Button>
            </ModalFooter>
          </Modal>
      </div>
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