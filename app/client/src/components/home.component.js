import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import Button from 'react-bootstrap/Button';



export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      currentUser: undefined,
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
      }
    );

    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div className="container">
        <header className="jumbotron">
          <Card>
            <Card.Header>
              <h1>AVM Guard</h1>
            </Card.Header>
            <Card.Body>
              <p>
                With this interface, you can view all branches of AVM Guard.
                More options await you after logging in. If you are a user with
                the admin role, you can create a user, delete a user, create a
                branch, delete a branch, edit a branch. If you are a regular
                user, you can only view branches.
              </p>
            </Card.Body>
            {!currentUser && (
              <Card.Footer>
                <Button variant="primary" href="/login">Click to Login</Button></Card.Footer>
            )}
          </Card>
        </header>
      </div>
    );
  }
}
