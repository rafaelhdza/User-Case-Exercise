import React, { Component } from 'react';
import { Link } from '@reach/router';

//This is the homepage of the interface
class Home extends Component {
  render() {
    const { user } = this.props;

    const biggerLead = {
      fontSize: 1.4 + 'em',
      fontWeight: 200
    };

    return (
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-10 col-md-10 col-lg-8 col-xl-7">
            <div
              className="display-4 text-primary mt-3 mb-2"
              style={{
                fontSize: 2.8 + 'em'
              }}
            >
              Hello!
            </div>
            <p className="lead" style={biggerLead}>

              This is a collaborative platform to manage your creative projects. Have everything in one
place: your communication, audio files, creator credits & metadata, legal agreements, and more.
            </p>

            {user == null && (
              <span>
                <Link
                    to="/sessions"
                    className="btn btn-outline-primary mr-2"
                >
                  Continue Session
                </Link>
                <Link
                  to="/register"
                  className="btn btn-outline-primary mr-2"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="btn btn-outline-primary mr-2"
                >
                  Log In
                </Link>
              </span>
            )}
            {user && (
              <Link to="/sessions" className="btn btn-primary">
                Sessions
              </Link>
            )}
          </div>{' '}
          {/* columns */}
        </div>
      </div>
    );
  }
}

export default Home;
