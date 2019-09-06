import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import setHeaders from './helpers/setHeaders';
import { connect } from 'react-redux';
import validateToken from './helpers/validateToken';

// components
import Menu from './components/Menu'
import Register from './components/Auth/Register';
import Login from './components/Auth/Login'
import Profile from './components/Auth/Profile'
import NotFound from './components/NotFound';
import UserList from './components/Users/UserLIst';

if (validateToken().status) setHeaders({ token: localStorage.getItem('token') })

function App(props) {
  const { auth } = props;
  const { isAuthenticated } = auth;
  return (
    <div className="App">
      <BrowserRouter>
        <Menu />

        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/profile" exact component={isAuthenticated ? Profile : NotFound} />
        <Route path="/users" exact component={isAuthenticated ? UserList : NotFound} />
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(App);
