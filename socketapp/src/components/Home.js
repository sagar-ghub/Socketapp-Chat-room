import React,{useEffect, useState,useRef } from 'react'
import io from 'socket.io-client'
import DashBoard from './DashBoard';
import bg from './bg.jpg'
import { Redirect } from "react-router-dom";
const SOCKETURL="localhost:4000";
let socket;

export default function Home({name,room}) {
    
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
    margin:"0px",
    border:"4px solid #E94100"
}

const messagesStyle={
    color:"white",
    fontSize:"15px",
    padding:"0px"

}
const fieldStyle={
    border:"1px solid silver",
    borderRadius:"10px"
}

    const[message,setMessage]=useState('');
    const[messages,setMessages]=useState([]);
    const [uname, setName] = useState(name);
    const [uroom, setRoom] = useState(room);
    const [users, setUsers] = useState('');
    
    const scroll=useRef();

    const scrollToBottom = () => {
        scroll.current.scrollIntoView({
            block: "nearest",
      inline: "center",
      behavior: "smooth",
      alignToTop: false
        })
      }
      useEffect(()=>{
          scrollToBottom();

      },[messages])

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
        scroll.current.scrollIntoView({ behavior: 'smooth' })

    //    if(uname='')
       

    }
   
    const handleKeypress = e => {
        //it triggers by pressing the enter key
      if (e.keyCode === 13) {
         sendMessage();
        
      }
    };
    console.log(messages)
    
    if(uname)
    
    return (
       
        <div style={chatStyle} >
           
            <DashBoard name={uname} room={uroom} users={users}/> 

           <div style={messageStyle}>

           <div  style={{overflowY: "scroll", height:"200px",padding:"10px"}} >
           {messages.map((message)=>(<span style={messagesStyle}><fieldset style={fieldStyle}><legend>{message.user}</legend> {message.text}</fieldset></span>))}
           <div ref={scroll} />
          </div>
           <input 
           style={{padding:"10px",fontSize:"15px",margin:"20px"}} 
           onKeyDown={handleKeypress}
           type="text" value={message} onChange={(e)=>(setMessage(e.target.value))} placeholder="Message" onKeyPress={event=>event.key==='Enter'?sendMessage:null}></input>
            <button style={{padding:"12px",backgroundColor:"dodgerblue",border:"none"}} onClick={sendMessage} >CLick</button>
                <br></br>
            

           </div>
        </div>
    )
    else
    return <Redirect to="/"/>
    
}
