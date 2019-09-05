import React from 'react';
import './App.css';

import Menu from './components/Menu'
import UserLIst from './components/Users/UserLIst';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login'
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Menu />
      {/* <UserLIst /> */}
      <BrowserRouter>
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
      </BrowserRouter>
    </div>
  );
}

export default App;
