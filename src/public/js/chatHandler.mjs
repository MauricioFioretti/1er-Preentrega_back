const socket = io()

const inputName = document.getElementById('inputName')
const inputMessage = document.getElementById('inputMessage')
const btnMessage = document.getElementById("btnMessage")
const chatMessage = document.querySelector(".chatMessage")

// const messageInnerHTML = (message) => {
//     let messageFinal = ""
//     for(let i = 0; i < message.length; i++){
//         messageFinal += `<div class="messageUser">${message[i].nombre}: ${message[i].mensaje}</div>`
//     }
//     return messageFinal
// }

function messageInnerHTML(message){
    let messageFinal = ""
    for(let i = 0; i < message.length; i++){
        messageFinal += `<div class="messageUser">${message[i].nombre}: ${message[i].mensaje}</div>`
    }
    return messageFinal
}

let nombre = ""

btnMessage.addEventListener("click", (e)=>{
    e.preventDefault()
    nombre = inputName.value
    socket.emit('userMessage', {
        message: inputMessage.value,
        name: nombre
    })
    document.getElementById("inputMessage").value = ''
})

socket.on('respuestaMessage', (data) =>{
    chatMessage.innerHTML = messageInnerHTML(data)
    chatMessage.scrollTop = chatMessage.scrollHeight
})