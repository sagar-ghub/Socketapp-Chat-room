import React from 'react'
import { useState} from 'react'
import { Link } from "react-router-dom";
import bg from './bg.jpg'
export default function Login({name,room,setName,setRoom}) {

    const chatStyle={
        margin:"0",
        padding:"0",    
        backgroundImage:`url(${bg})`,
         backgroundSize:"cover",
        backgroundPosition:"center",
        position: "fixed",
       minWidth: "100%",
       minHeight: "100%",
    
    }

    const messageStyle={
        fontSize:"10px",
        position:"absolute",
        left:"550px",
        top:"200px",
        padding:"20px",
        border:"4px solid #E94100"
        
    }
    const input={
        padding:"15px",
        margin:"10px",
        fontSize:"15px"
    }
    const button={
        backgroundColor:"dodgerblue",
        border:"none",
        padding:"10px 90px 10px 90px",
        
        marginLeft:"5px"
    }
   
    return (
        <div style={chatStyle}>
         <div style={messageStyle}>
             
         <input style={input} type="text" key="name" placeholder="name"value={name} onChange={(e)=>setName(e.target.value)}></input>
                <br></br>
                
                <input  style={input}type="text" key="room" placeholder="room" value={room} onChange={(e)=>setRoom(e.target.value)}></input><br>
                </br>
               
               <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={'/land'}>
               <button style={button} >Submit</button>
               </Link>
         </div>
        </div>
    )
}
