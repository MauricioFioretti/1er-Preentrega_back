import { io } from "../utils/socket.js"
import { getChatMessages, addMessageToChat } from "../services/chat.service.js"

export const getRealTimeChat = async (req, res) => {
    res.render('realTimeChat')
}

// Manejo de la conexión de Socket.IO
io.on('connection', async (socket) => {
    // Lógica para enviar mensajes al cliente cuando se conecta
    let messages = JSON.parse(JSON.stringify(await getChatMessages()))
    io.sockets.emit('respuestaMessage', messages)

    // Manejo de mensajes del cliente
    socket.on('userMessage', async (data) => {
        await addMessageToChat(data)

        // Emitir mensajes actualizados a todos los clientes
        let updatedMessages = JSON.parse(JSON.stringify(await getChatMessages()))
        io.sockets.emit('respuestaMessage', updatedMessages)
    })
})
