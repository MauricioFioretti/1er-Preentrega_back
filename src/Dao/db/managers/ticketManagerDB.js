import { Ticket } from '../models/ticket.modelDB.js'

export class TicketManager {
    // Método para generar un nuevo ticket.
    async generateTicket(ticket) {
        try {
            await Ticket.create(ticket)
            return { success: true, message: `El ticket ha sido generado correctamente` }
        }
        catch (error) {
            // Captura y manejo de errores durante la generacion del ticket.
            return { success: false, message: `Error al generar el ticket`, error: error }
        }
    }
}

// Exportación de la clase TicketManager para su uso en otros módulos.
export default { TicketManager }
