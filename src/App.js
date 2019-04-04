import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import Notifier from "./components/Notifier";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Provider } from 'react-redux';
import Feed from "./components/Feed";
import Welcome from "./components/Welcome";

import store from './store';
import { setCurrentUser } from './actions/authActions'
import Profile from "./components/Profile";
import ResetPassword from "./components/ResetPassword";

if(localStorage.token){
    store.dispatch(setCurrentUser(localStorage.user));
    axios.defaults.headers.common['Authorization']= localStorage.token;
}

class App extends Component {
  render() {
    return (
      <div className="App">
          <Provider store={store}>
              <Router>
                  <NavBar/>
                  {/*<Login/>*/}
                  {/*<Register/>*/}
                  <Route exact path="/" component={Welcome} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/resetPassword" component={ResetPassword} />
                  <Route exact path="/feed" component={Feed} />
                  <Route exact path="/profile/:userId" component={Profile} />
              </Router>

              <Notifier/>
          </Provider>

      </div>
    );
  }
}

export default App;
