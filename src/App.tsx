import React, { useEffect, useState } from 'react';
import {SocketContext, socket} from '../src/context/socket.js'

import './App.css';
import Host from './components/Host';
import Participant from './components/Participant';
import TimeInterval, { Props } from './components/TimeInterval';

function App() {

  return (
    <div className="App">
      <header className="App-header">
      <SocketContext.Provider value={socket}>
        <Host />
        <Participant />
      </SocketContext.Provider>
      </header>
    </div>
  );
}

export default App;
