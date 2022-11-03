import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import Table from "react-bootstrap/Table";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vrole = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Please choose role
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};


export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      roles: [],
      successful: false,
      message: "",
      userList: []
    };
  }

  componentDidMount() {
    UserService.getUserList().then(
      (response) => {
        this.setState({
          userList: response.data,
        });
      },
      (error) => {
        this.setState({
          userList:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeDeleteUser(userId) {
    if(userId >= 1){
      UserService.deleteUser(userId);
      setTimeout(function(){
        window.location.reload(1);
     }, 1500);
      this.setState({
        message: "User is deleted",
        successful: true,
      });
    }
  }

  onChangeRole(e) {
    this.setState({
      roles: [e.target.id]
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();
    this.setState({
      message: "",
      successful: false,
    });

    this.form.validateAll();


    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password,
        this.state.roles
      ).then(
        (response) => {
          setTimeout(function(){
            window.location.reload(1);
         }, 1500);
          this.setState({
            message: response.data.message,
            successful: true,
          });
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage,
          });
        }
      );
    }
  }
  

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <strong>Create User</strong>
          <Form
            onSubmit={this.handleRegister}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group" onChange={this.onChangeRole} validations={[required, vrole]}>
                  <label htmlFor="roles">Role</label> <br></br>
                  <input
                    type="radio"
                    id="user"
                    name="roles"
                    value={this.state.roles}
                    required
                  ></input>
                  <label style={{padding: "5px"}} htmlFor="user">User</label>
                  <input
                    type="radio"
                    id="admin"
                    name="roles"
                    value={this.state.roles}
                  ></input>
                  <label style={{padding: "5px"}} htmlFor="admin">Admin</label>
                  <br></br>
                </div>

                <br></br>
                <div className="form-group">
                  <button className="btn btn-primary btn-block">
                    Create User
                  </button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
        <div className="container">
        <header className="jumbotron">
          <Table striped bordered hover>

            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Process</th>
              </tr>
            </thead>
            <tbody>
              {this.state.userList.map((userList) => (
                <tr>
                  <td>{userList.id}</td>
                  <td>{userList.username}</td>
                  <td>{userList.email}</td>
                  <td>{userList.createdAt}</td>
                  <td>{userList.updatedAt}</td>
                  <td align="center">
                    <Button style={{padding: "2px", margin: "2px"}} variant="btn btn-primary btn-sm" onClick={() => this.onChangeDeleteUser(userList.id)}><FontAwesomeIcon icon={faTrash}/></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </header>
      </div>
      </div>
    );
  }
}
