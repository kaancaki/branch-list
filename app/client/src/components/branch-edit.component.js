import Button from "react-bootstrap/Button";
import UserService from "../services/user.service";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPenToSquare } from '@fortawesome/free-solid-svg-icons';


 function MyVerticallyCenteredModal(props) {

  let [formData, setFormData] = useState({
    id: props.dataprops.data.id,
    name: props.dataprops.data.name,
    full_adress: props.dataprops.data.full_adress,
    phone: props.dataprops.data.phone,
    branch_number: props.dataprops.data.branch_code
  });

function onName(e){
    setFormData({
        ...formData,
        name: e.target.value
    })
    
}

function onFullAdress(e) {
    setFormData({
        ...formData,
        full_adress: e.target.value
    })
}

function onPhone(e) {
    setFormData({
        ...formData,
        phone: e.target.value
    })
}

function onBranchNumber(e) {
    setFormData({
        ...formData,
        branch_number: e.target.value
    })
}

function branchUpdate(){
   UserService.updateBranchs(formData.id, formData.name, formData.full_adress, formData.phone, formData.branch_number).then((res) => {
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
          Branch Edit
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBranchName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" onChange={ (text) => onName(text)} value={formData.name}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBranchFullAdress">
            <Form.Label>Full Adress</Form.Label>
            <Form.Control type="text" placeholder="Enter full adress" onChange={onFullAdress} value={formData.full_adress}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBranchPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" placeholder="Enter phone" onChange={onPhone} value={formData.phone}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBranchNumber">
            <Form.Label>Branch Number</Form.Label>
            <small><b> (Branch number must be a unique value)</b></small>
            <Form.Control type="text" placeholder="Enter branch number" onChange={onBranchNumber} value={formData.branch_number}/>
          </Form.Group>


          <Button variant="primary" onClick={() => branchUpdate()}><FontAwesomeIcon style={{padding: "1px"}} icon={faPaperPlane}/>
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}


export default function App(dataprops) {
  const [modalShow, setModalShow] = React.useState(false);
  console.log(dataprops);

  return (
    <>
      <Button style={{padding: "2px", margin: "2px"}} onClick={() => setModalShow(true)} variant="btn btn-primary btn-sm"><FontAwesomeIcon icon={faPenToSquare}/></Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        dataprops={dataprops}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
