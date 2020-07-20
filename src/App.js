// Import React
import React, { Component } from 'react';
import { Router, navigate } from '@reach/router';
import firebase from './Firebase';

import Home from './Home';
import Welcome from './Welcome';
import Navigation from './Navigation';
import Login from './Login';
import Register from './Register';
import Sessions from "./Sessions";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      displayName: null,
      userID: null
    };
  }
//This is a component to show the information of the user in the interface based on firebase
  componentDidMount() {
    firebase.auth().onAuthStateChanged(FBUser=> {
      if (FBUser){
        this.setState({
            user: FBUser,
            displayName: FBUser.displayName,
            userID: FBUser.uid
        });
        const sessionsRef = firebase.database().ref('sessions/' + FBUser.uid);
        sessionsRef.on('value',snapshot => {
          let sessions = snapshot.val();
          let sessionsList = [];

          for (let item in sessions){
            sessionsList.push({
              sessionID: item,
              sessionName: sessions[item].sessionName
            });
          }
          this.setState({
            sessions: sessionsList,
            howManySessions: sessionsList.length
          });
        });
      } else {
        this.setState({user: null});
      }
    });
  }

  registerUser = userName => {
    firebase.auth().onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName: userName
      }).then(() => {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
        navigate('/sessions');
      });
    });
  };

  //This fuction is to logout the user, and sign out from firebase, and route you to home
  logOutUser = e => {
    e.preventDefault();
    this.setState({
      displayName: null,
      userID: null,
      user: null
    });

    firebase.auth().signOut().then(()=>{
      navigate('/');
    });
  }

    addSession = sessionName => {
    const ref = firebase
        .database()
        .ref(`sessions/${this.state.user.uid}`);
        ref.push({sessionName: sessionName});
    }
  render() {
    return (
      <div>
        <Navigation user={this.state.user} logOutUser = {this.logOutUser}/>
        {this.state.user && <Welcome userName={this.state.displayName} logOutUser = {this.logOutUser} />}

        <Router>
          <Home path="/" user={this.state.user} />
          <Login path="/login" />
          <Sessions path="/sessions"
                    sessions={this.state.sessions}
                    addSession = {this.addSession}/>
          <Register
            path="/register"
            registerUser={this.registerUser}/>

        </Router>
      </div>
    );
  }
}

export default App;
