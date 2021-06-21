import React from 'react'
import { useState} from 'react'
import { Link } from "react-router-dom";

export default function Login({name,room,setName,setRoom}) {



   
    return (
        <div>
         
                <input type="text" key="name" placeholder="name"value={name} onChange={(e)=>setName(e.target.value)}></input>
                <br></br>
                
                <input type="text" key="room" placeholder="room" value={room} onChange={(e)=>setRoom(e.target.value)}></input><br>
                </br>
               
               <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={'/land'}>
               <button >Submit</button>
               </Link>
        </div>
    )
}
