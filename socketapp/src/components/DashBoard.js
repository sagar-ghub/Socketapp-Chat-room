import React from 'react'

export default function DashBoard({name,room,users}) {
    console.log(users);
    let list=[...users];
    
    const userStyle={
        color: "white",
        border:"4px solid #E94100",
      padding: "10px",
      fontFamily: "Arial",
     
      margin:"20px 500px 50px 620px"
      
    }
    const listStyle={
        color: "white",
       
        padding: "10px",
        fontFamily: "Arial",
        position:"absolute",
        top:"120px",
        
        paddingBottom:"200px"
    }

    return (
        <div>

          <div id="user" style={userStyle}>
          <h3>Name : {name}</h3>
            
            <h3>RoomName : {room}</h3>
          </div>
           <div id="list" style={listStyle}>
           <h1>Users list</h1>

            <ol>
            {list.map((list)=>(<li><h4>{list.name}</h4></li>))}
            </ol>
           </div>
            
        </div>
    )
}
