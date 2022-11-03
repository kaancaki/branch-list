import Button from "react-bootstrap/Button";
import UserService from "../services/user.service";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPaperPlane } from '@fortawesome/free-solid-svg-icons';




function MyVerticallyCenteredModal(props) {
  const [formData] = useState({
    name: "",
    full_adress: "",
    phone: "",
    branch_number: ""
  });

  function onName(e) {
    formData.name = e.target.value;
}

function onFullAdress(e) {
  formData.full_adress = e.target.value;
}

function onPhone(e) {
  formData.phone = e.target.value;
}

function onBranchNumber(e) {
    formData.branch_number = e.target.value;
}

function newBranchCreate(){
   UserService.createBranchs(formData.name, formData.full_adress, formData.phone, formData.branch_number).then((res) => {
    alert(res.data)
    window.location.reload(1);
   }).catch((err) => alert(err));
}

  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Branch
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBranchName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" onChange={onName}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBranchFullAdress">
            <Form.Label>Full Adress</Form.Label>
            <Form.Control type="text" placeholder="Enter full adress" onChange={onFullAdress}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBranchPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" placeholder="Enter phone" onChange={onPhone}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBranchNumber">
            <Form.Label>Branch Number</Form.Label>
            <small><b> (Branch number must be a unique value)</b></small>
            <Form.Control type="text" placeholder="Enter branch number" onChange={onBranchNumber}/>
          </Form.Group>


          <Button variant="primary" onClick={() => newBranchCreate()}><FontAwesomeIcon style={{padding: "1px"}} icon={faPaperPlane}/>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}


export default function App() {
  const [modalShow, setModalShow] = React.useState(false);
  
  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}><FontAwesomeIcon style={{padding: "1px"}} icon={faPlus}/>
        Create Branch
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
