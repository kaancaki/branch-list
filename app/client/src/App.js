import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import CreateUser from "./components/create-user.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardBranch from "./components/branch-list.component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faHome, faStore, faUser, faRightFromBracket, faDoorOpen } from '@fortawesome/free-solid-svg-icons';

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark" style={{padding: "30px"}}>
          <Link to={"/"} className="navbar-brand">
            AVM Guard
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link"><FontAwesomeIcon icon={faHome} style={{padding: "0px 5px 0px 0px"}}/>
                Home
              </Link>
            </li>


            {showAdminBoard && (
              <li className="nav-item">
              <Link to={"/create-user"} className="nav-link"><FontAwesomeIcon icon={faUserPlus} style={{padding: "0px 5px 0px 0px"}}/>
                Create User
              </Link>
            </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/branch"} className="nav-link"><FontAwesomeIcon icon={faStore} style={{padding: "0px 5px 0px 0px"}}/>
                  Branch
                </Link>
              </li>
              

            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link"><FontAwesomeIcon icon={faUser} style={{padding: "0px 5px 0px 0px"}}/>
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}><FontAwesomeIcon icon={faDoorOpen} style={{padding: "0px 5px 0px 0px"}}/>
                  Logout
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link"><FontAwesomeIcon icon={faRightFromBracket} style={{padding: "0px 5px 0px 0px"}}/>
                  Login
                </Link>
              </li>
            </div>
          )}
        </nav>
        

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/branch" element={<BoardBranch />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;