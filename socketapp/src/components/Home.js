import React,{useEffect, useState } from 'react'
import io from 'socket.io-client'
import DashBoard from './DashBoard';
const SOCKETURL="localhost:4000";
let socket;
export default function Home({name,room}) {
    
    

    const[message,setMessage]=useState('');
    const[messages,setMessages]=useState([]);
    const [uname, setName] = useState('');
    const [uroom, setRoom] = useState('room');
    const [users, setUsers] = useState('');
    

    useEffect(() => {
      socket=io(SOCKETURL);

      setRoom(room);
      setName(name)
  

        console.log("coonnetion Client");

        socket.emit('join',{name,room},()=>{

        });

        return ()=>{
            socket.disconnect();
            socket.off();
        };

    },[SOCKETURL])

//handling messages

    useEffect(()=>{
        socket.on('message',(message)=>{
            setMessages(messages=>[...messages,message]);
        })

        socket.on('roomData',({users})=>(setUsers(users)))
    },[])

    const sendMessage=()=>{
       // e.preventDefault();
        if(message)
        socket.emit('sendMessage',message,()=>setMessage(''))
    }

    console.log(messages)
    return (
        <div>
            <DashBoard name={uname} room={uroom} users={users}/> 
            <input type="text" value={message} onChange={(e)=>(setMessage(e.target.value))} placeholder="Message" onKeyPress={event=>event.key==='Enter'?sendMessage:null}></input>
            <button onClick={sendMessage}>CLick</button>
        <br></br>
            {messages.map((message)=>(<span>{message.user}:{message.text}<br/></span>))}
            

        </div>
    )
}
