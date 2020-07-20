import React, { Component } from 'react';
import firebase from "./Firebase";
import {navigate} from "@reach/router";
import SessionsList from "./SessionsList";

//This is a class for sessions created by the user
class Sessions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sessionName: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
  }

  handleSubmit(e) {

  this.props.addSession(this.state.sessionName);
  this.setState({sessionName: ''});
    e.preventDefault();

  }
  //This is a form for sessions
  render() {
    return (
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <h1 className="font-weight-light">Start a new session</h1>
              <div className="card bg-light">
                <div className="card-body text-center">
                  <form className="formgroup"
                        onSubmit={this.handleSubmit}>
                    <div className="input-group input-group-lg">
                      <input
                          type="text"
                          className="form-control"
                          name="sessionName"
                          placeholder="Session Name"
                          aria-describedby="buttonAdd"
                          value = {this.state.sessionName}
                          onChange = {this.handleChange}
                      />
                      <div className="input-group-append">
                        <button
                            type="submit"
                            className="btn btn-sm btn-info"
                            id="buttonAdd"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="col-11 col-md-6 text-center">
                  <div className="card border-top-0 rounded-0"></div>
                  {this.props.sessions && this.props.sessions.length ? (
                      <div className="card-body py-2">
                        <h4 className="card-title font-weight-light m-0"></h4>
                        Your meetings
                      </div>
                  ) : null}

                  {this.props.sessions && (
                      <div className="list-group list-group-flush">
                        <SessionsList sessions ={this.props.sessions}/>
                      </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Sessions;
