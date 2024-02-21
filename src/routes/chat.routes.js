import { Router } from "express"
import { io } from "../routes/realTimeProds.routes.js"

//Instanciamos Router() en la variable que vamos a usar routerChat
const routerChat = Router()

//get de realtimechat y servidor io que escuchaq constantemente
routerChat.get('/', async (req, res) => {
    res.render('realTimeChat')
})  

const message = []

io.on('connection', (socket) =>{
    socket.on('userMessage', (data)=>{
        message.push({
            nombre: data.name,
            mensaje: data.message
        })
        io.sockets.emit('respuestaMessage', message)
    })
})

export { routerChat }