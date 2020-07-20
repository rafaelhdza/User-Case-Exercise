import React, { Component } from 'react';
import { FaUsers } from 'react-icons/fa'; //Icons
import { Link } from '@reach/router';

//This is the navigation bar to explore and move across the interface

class Navigation extends Component {
  render() {
    const { user, logOutUser } = this.props;

    return (
      <nav className="site-nav family-sans navbar navbar-expand bg-primary navbar-dark higher">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <FaUsers className="mr-1" /> Reveel
          </Link>
          <div className="navbar-nav ml-auto">
            {user && (
              <Link className="nav-item nav-link" to="/sessions">
                sessions
              </Link>
            )}
            {!user && (
              <Link className="nav-item nav-link" to="/login">
                log in
              </Link>
            )}
            {!user && (
              <Link className="nav-item nav-link" to="/register">
                register
              </Link>
            )}
            {user && (
              <Link className="nav-item nav-link" to="/home" onClick={e => logOutUser(e)}>
                log out
              </Link>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default Navigation;
