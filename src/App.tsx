import React, { useEffect, useState } from 'react';
import {SocketContext, socket} from '../src/context/socket.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Host from './components/Host';
import Participant from './components/Participant';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import Main from './components/Main';

function App() {
  return (
   <SocketContext.Provider value={socket}>
  <Router>

      <Main />

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}

          <Switch>
            <Route path="/participant">
           
                <Participant />
             
              
            </Route>
            <Route path="/host">
           
                <Host />
             
            </Route>
        
          </Switch>

         
   
  </Router> 
  </SocketContext.Provider>
  
  )
}

export default App;
