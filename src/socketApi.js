const socketio = require('socket.io');
const moment = require('moment');

const io = socketio()
const users = [];

io.sockets.on("connection", (socket) => {
    console.log("Foydalanuvchi boglandi!")
    const bot = "SERVER"

    socket.on("JoinRoom", ({username, room}) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room)



        socket.emit("message", formatMessage(bot, "HushKelibsiz"))
        /* Brocast  */
        socket.broadcast.to(user.room).emit("message", formatMessage("USER", `${user.username}  Foydalanuvchi bog'landi`));

        
        /* Foydalanuvchilarni honaga yuborish */
        io.to(user.room).emit("roomUser", {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })


    socket.on("chatMessage", (msg) => {
       const user = getUser(socket.id)
        io.to(user.room).emit("message", formatMessage(user.username, msg)) // asdsada
    })



    /* Foydalanuvchi Tark qildi */
    socket.on("disconnect", () => {
        const user = userExit(socket.id)
        if(user){
            io.to(user.room).emit("message", formatMessage("USER", `${ user.username}  foydalanuvchi honani tark qildi!!`))
        }
        
       
    })
})



// voxti to
function formatMessage (username, text)
 {
     return {
         username,
         text,
         time: moment().format("h:m a")
     }
 }


 /* chatga kirgan foydalanuvchi */
 function userJoin (id, username, room) {
    const user = {id, username, room}
    users.push(user)
    return user
 }

 // Xonani idsini aniqlashtiriyapiz
 function getUser(id) {
     return users.find(user => user.id == id)
 }


 function userExit (id) {
    const index = users.findIndex(user => user.id === id); 
    if(index !== -1) {  // true
        return users.splice(index, 1)[0]
    }
 }

 /* foydalanuvchi honaga kirganda  */
 function getRoomUsers (room){ 
     return users.filter(user => user.room === room)
 }


module.exports = io