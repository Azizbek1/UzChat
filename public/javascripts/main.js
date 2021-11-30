// O'zgaruvchilar - CHAT bo'limidagi! 
$chat2__form_btn = $('.chat2__form_btn');
$form__control = $('.form__control')
$chat__messages = $(".chat__messages");
var room_name = document.querySelector('#room_name')
var Roomusers = document.querySelector('#users')

const socket = io();

/* Username bilan roomni kalitlarini olish!!! */
const {username, room} = Qs.parse(location.search, {  // username room :  username == username
    ignoreQueryPrefix: true
})


socket.emit("JoinRoom", {username, room})


/* honaga va foydalanuvchilar */
socket.on("roomUser", ({room, users}) => {
    outputRoom(room)
    outputUsers(users)
})

$chat2__form_btn.on('click',  (e) => {
    e.preventDefault()
    const msg = $form__control.val();
    socket.emit("chatMessage", msg)

    //sroll to'g'irlaymiz
    scroll ()

})


socket.on("message", (msg) => {
    outputMessage(msg)
    console.log(msg)
})



/* Sroll */
function scroll () {
    $chat__messages.srollTop = $chat__messages.scrollheight
}


/* HOnani frontda chiqarish */
function outputRoom (room) {
    room_name.innerHTML = room
}
function outputUsers(users) {
    Roomusers.innerHTML = `
        ${users.map(user => `<li class="alert alert-danger"> ${user.username} </li>`).join('')}
    `
}

function outputMessage(message) {
    const div = document.createElement("div")
    div.classList.add("message")
    div.innerHTML = 
    `
        <div class="meta">
            <span class="meta__time">${message.time} </span>  
            <span class="meta__username">${message.username}  </span>
            <span class="meta__text"> ${message.text} </span>
        </div>
    `
    document.querySelector('.chat__messages').appendChild(div)
}
