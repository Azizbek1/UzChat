// O'zgaruvchilar - CHAT bo'limidagi! 
$chat2__form_btn = $('.chat2__form_btn');
$form__control = $('.form__control')
$chat__messages = $(".chat__messages");




const socket = io();





$chat2__form_btn.on('click',  (e) => {
    e.preventDefault()
    const msg = $form__control.val();
    socket.emit("chatMessage", msg)



    //sroll to'g'irlaymiz
    $chat__messages.srollTop = $chat__messages.scrollheight

})


socket.on("message", (msg) => {
    outputMessage(msg)
    console.log(msg)
})





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
