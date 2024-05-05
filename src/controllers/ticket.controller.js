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
        res.status(500).json({ message: "Error al obtener el ticket", error: error.message })
    }
}