import React, { Component } from "react";
import UserService from "../services/user.service";
import Table from "react-bootstrap/Table";
import BranchCreate from "./branch-create.component";
import BranchEdit from "./branch-edit.component";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import AuthService from "../services/auth.service";


export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
      showAdminProperties: false,
      currentUser: undefined,

    };
  }

  onChangeDeleteBranch(branchCode) {
    if(branchCode){
      UserService.deleteBranch(branchCode).then((res) => {
          alert(res.data)
          window.location.reload(1);
      }).catch((err) => alert(err));
    }
  }

  componentDidMount() {
    UserService.getBranchList().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      }
    );

    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminProperties: user.roles.includes("ROLE_ADMIN"),
      });
    }

  }


  render() {
    const { showAdminProperties } = this.state;
    return (
      <div className="container">
        {showAdminProperties && (
          <div style={{margin: "5px", textAlign: "right"}}><BranchCreate /></div>
        )}
        <header className="jumbotron">
          <Table striped bordered hover>
          
            <thead>
              <tr>
                <th>ID</th>
                <th>Latitude</th>
                <th>Longlitude</th>
                <th>Name</th>
                <th>Full Adress</th>
                <th>Phone</th>
                <th>Branch Number</th>
                {showAdminProperties && (<th>Editing</th>)}
              </tr>
            </thead>
            <tbody>
              {this.state.content.map((branch, key) => (
                <tr key={key}>
                  <td>{branch.id}</td>
                  <td>{branch.latitude}</td>
                  <td>{branch.longlitude}</td>
                  <td>{branch.name}</td>
                  <td>{branch.full_adress}</td>
                  <td>{branch.phone}</td>
                  <td>{branch.branch_code}</td>
                  {showAdminProperties && (
                    <td align="center">
                    <BranchEdit data={branch}/>
                    <Button style={{padding: "2px", margin: "2px"}} variant="btn btn-primary btn-sm" onClick={() => this.onChangeDeleteBranch(branch.branch_code)}><FontAwesomeIcon icon={faTrash}/></Button>
                  </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </header>
      </div>
    );
  }
}
