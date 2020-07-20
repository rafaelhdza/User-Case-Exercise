import React, { Component } from 'react';
import FormError from './FormError';
import firebase from './Firebase';
import './index.css'

//This is the Registration form, and data is being stored in Google's Firebase

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname:'',
      ISNI: '',
      stagename: '',
      email:'',
      passOne:'',
      passTwo:'',
      errorMessage: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Handle Change

  handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue }, () => {
      if (this.state.ISNI.length !== 16) {
        this.setState({ errorMessage: 'ISNI should be 16 digits long (`1234 5678 1234 5678`)' });
      } else if (this.state.passOne !== this.state.passTwo) {
        this.setState({ errorMessage: 'Passwords do not match' });
      }
        else {
        this.setState({ errorMessage: null });
      }
    });
  }

  handleSubmit(e) {
    var registrationInfo = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      ISNI: this.state.ISNI,
      stagename: this.state.stagename,
      email: this.state.email,
      passOne: this.state.passOne,
      passTwo: this.state.passTwo
    };
    e.preventDefault();

    //Store information on Firebase
    firebase
      .auth().createUserWithEmailAndPassword(
          registrationInfo.email,registrationInfo.passOne)
      .then(() => {
        this.props.registerUser(registrationInfo.firstname,
            registrationInfo.lastname, registrationInfo.ISNI, registrationInfo.stagename,
            registrationInfo);
      })
      .catch(error => {
        if (error.message !== null) {
          this.setState({ errorMessage: error.message });
        } else {
          this.setState({ errorMessage: null });
        }
      });
  }

  render() {
    return (
      <form className="mt-3" onSubmit={this.handleSubmit}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card bg-light">
                <div className="card-body">
                  <h3 className="font-weight-light mb-3">Register</h3>
                  <div className="form-row">
                    {this.state.errorMessage !== null ? (
                      <FormError
                        theMessage={this.state.errorMessage}
                      />
                    ) : null}
                    <section className="col-sm-12 form-group">
                      
                      <label
                        className="form-control-label sr-only"
                        htmlFor="firstname"
                      >
                        First Name
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="firstname"
                        placeholder="First Name"
                        name="firstname"
                        required
                        value={this.state.firstname}
                        onChange={this.handleChange}
                      />
                    </section>
                  </div>


                  <section className=" form-group">

                    <label
                        className="form-control-label sr-only"
                        htmlFor="firstname"
                    >
                      Last Name
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        id="lastname"
                        placeholder="Last Name"
                        name="lastname"
                        required
                        value={this.state.lastname}
                        onChange={this.handleChange}
                    />
                  </section>


                  <section className="form-group">
                    <label
                      className="form-control-label sr-only"
                      htmlFor="ISNI"
                    >
                      ISNI
                    </label>
                    <input
                      className="form-control"
                      type="number"
                      id="ISNI"
                      placeholder="ISNI"
                      required
                      name="ISNI"
                      value={this.state.ISNI}
                      maxLength={16}
                      onChange={this.handleChange}
                    />
                  </section>
                  <section className=" form-group">

                    <label
                        className="form-control-label sr-only"
                        htmlFor="firstname"
                    >
                      Stage Name
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        id="stagename"
                        placeholder="Stage Name"
                        name="stagename"
                        required
                        value={this.state.stagename}
                        onChange={this.handleChange}
                    />
                  </section>
                  <section className="form-group">
                    <label
                        className="form-control-label sr-only"
                        htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                        className="form-control"
                        type="email"
                        id="email"
                        placeholder="Email Address"
                        required
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                  </section>
                  <div className="form-row">
                    <section className="col-sm-6 form-group">
                      <input
                        className="form-control"
                        type="password"
                        name="passOne"
                        placeholder="Password"
                        value={this.state.passOne}
                        onChange={this.handleChange}
                      />
                    </section>
                    <section className="col-sm-6 form-group">
                      <input
                        className="form-control"
                        type="password"
                        required
                        name="passTwo"
                        placeholder="Repeat Password"
                        value={this.state.passTwo}
                        onChange={this.handleChange}
                      />
                    </section>
                  </div>
                  <div className="form-group text-right mb-0">
                    <button className="btn btn-primary" type="submit">
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Register;
