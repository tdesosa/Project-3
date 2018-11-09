import React from 'react'
import { Modal, Form, Button, Label, Header } from 'semantic-ui-react';


const EditUser = (props) => { 
  return (
    <Modal open={props.open}>
      <Header>Edit Profile:</Header>
      <Modal.Content>
        <Form onSubmit={props.closeAndEdit}>
          <Label>
            Edit Username:
          </Label>
          <Form.Input type='text' name='username' value={props.userToEdit.username} onChange={props.editUser}/>
          <Label>
            Edit Password:
          </Label>
          <Form.Input type='text' name='password' value={props.userToEdit.password} onChange={props.editUser}/>

          <Modal.Actions>
            <Button color='green' type='submit'>Edit Profile</Button>
          </Modal.Actions>
        </Form>
      </Modal.Content>
    </Modal>
    )
}

export default EditUser;
