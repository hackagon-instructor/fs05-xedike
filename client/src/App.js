import React from 'react';
import './App.css';

import Menu from './components/Menu'
import UserLIst from './components/Users/UserLIst';
import Register from './components/Auth/Register';

function App() {
  return (
    <div className="App">
      <Menu />
      <UserLIst />
      <Register />
    </div>
  );
}

export default App;
