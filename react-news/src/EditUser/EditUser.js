import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, Label } from 'reactstrap';


const EditUser = (props) => { 
  return (
    <Modal isOpen={props.isOpen}>
      <ModalHeader>Edit Profile:</ModalHeader>
      <ModalBody>
        <Form onSubmit={props.closeAndEdit}>
          <Label>
            Edit Username:
          </Label>
          <Input type='text' name='username' value={props.userToEdit.username} onChange={props.editUser}/>
          <Label>
            Edit Password:
          </Label>
          <Input type='text' name='password' value={props.userToEdit.password} onChange={props.editUser}/>
          <ModalFooter>
            <Button color='secondary' onSubmit={props.closeAndEdit}>Edit Profile</Button>
            <Button color="secondary" onClick={props.cancelModal}>Cancel</Button>
          </ModalFooter>
        </Form>
      </ModalBody>
    </Modal>
    )
}

export default EditUser;
