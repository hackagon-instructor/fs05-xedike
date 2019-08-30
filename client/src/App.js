import React from 'react';
import './App.css';

import Menu from './components/Menu'
import UserLIst from './components/Users/UserLIst';

function App() {
  return (
    <div className="App">
      <Menu />
      <UserLIst />
    </div>
  );
}

export default App;
