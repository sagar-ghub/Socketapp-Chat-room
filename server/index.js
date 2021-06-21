var express = require('express');
var socket = require('socket.io')
var app = express();
//const router=express.Router();

const { addUser, removeUser, getUser, getUsersInRoom }=require('./user')


const PORT=process.env.PORT|| 4000;



var server = app.listen(PORT, function(){
    console.log('listening for requests on port ',PORT);
});

let io = socket(server);
app.get('/',(req,res)=>{
    res.send("Ss")
    console.log("hi")
})



io.on("connection",socket=>{
    
    var uname;
    socket.on('join',({name,room},callback)=>{
       const{user,error}=addUser({id:socket.id,name,room})


        uname=name; 
        
        socket.join(user.room);
        if(error) return callback(error);
        //just a welcome message
        socket.emit('message',{user:'admin',text:`${user.name} Welcome to the ${user.room}`})
        
        //Will broadcast everyone except the one who joined currently
        socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name} has joined the chat`})
        
        io.to(user.room).emit('roomData',{room:user.room,users:getUsersInRoom(user.room)})
        
        //if no errror then a normal no param callback
        callback();
    })

    socket.on('sendMessage',(message,callback)=>{

        const user =getUser(socket.id);

        io.to(user.room).emit('message',{user:user.name,text:message})
        io.to(user.room).emit('')
        callback();

    })



    socket.on('disconnect',()=>{
        console.log(uname,"left");
    })
})


