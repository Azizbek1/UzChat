const socketio = require('socket.io');
const moment = require('moment');

const io = socketio()

io.sockets.on("connection", (socket) => {
    console.log("Foydalanuvchi boglandi!")

    socket.emit("message", formatMessage("Server", "HushKelibsiz"))


    /* Brocast  */
    socket.broadcast.emit("message", "Yangi Foydalanuvchi bog'landi");


    socket.on("chatMessage", (msg) => {
        io.emit("message", msg)
    })



    /* Foydalanuvchi Tark qildi */
    socket.on("disconnect", () => {
        io.emit("message", "foydalanuvchi tark qildi!!")
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




module.exports = io