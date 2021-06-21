import React, { useState, useEffect } from "react";
import io from 'socket.io-client'
import {
  BrowserRouter as Router, Route,
  
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";


//app
const App=()=>{
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  return(
    <Router>
    <Route exact path="/" render={()=>(<Login name={name} key="uni" setName={setName} room={room} setRoom={setRoom}/>)} />
    <Route  path="/land" component={()=>(<Home name={name} room={room} />)}/>
  </Router>
  )

}
export default App;
