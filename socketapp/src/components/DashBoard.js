import React from 'react'

export default function DashBoard({name,room,users}) {
    console.log(users);
    let list=[...users];
    
    return (
        <div>
            <h1>Name {name}</h1>
            <h1>Room {room}</h1>
            <h1>Users list</h1>

           <ol>
              {list.map((list)=>(<li>{list.name}</li>))}
           </ol>
            
        </div>
    )
}
