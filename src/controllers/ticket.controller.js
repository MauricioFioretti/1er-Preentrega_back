import { TicketService } from "../services/ticket.service.js"

const ticket = new TicketService

export async function generateTicket(req, res) {
    try {
        let respuesta = await ticket.generateTicketService(req.user.cartId, req.user.email)
        
        res.render('ticket',{ 
            ticket: respuesta.datosTicketFormat,
            array: respuesta.totalYStock.sinStock
        })

    } catch (error) {
        req.logger.error(`${req.method} ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - Error al obtener el ticket - Error: ${error.message}`)

        res.status(500).json({ message: "Error al obtener el ticket", error: error.message })
    }
}