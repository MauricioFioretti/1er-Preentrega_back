import { TicketManager } from "../Dao/db/managers/ticketManagerDB.js"
import { cantidadStock } from "../utils/functions.js"
import { CartsService } from "./carts.service.js"
import { ticketServiceDTO } from "./dto/ticket.service.dto.js"

const ticket = new TicketManager()
const cartsManager = new CartsService()

export class TicketService {
    async generateTicketService(cid, email) {
        let productosCarrito = (await cartsManager.getCart(cid)).data.products

        let totalYStock = cantidadStock(productosCarrito, cid)

        if (totalYStock.conStock.length > 0) {
            let datosTicketFormat = ticketServiceDTO(totalYStock, email)
            await ticket.generateTicket(datosTicketFormat)
            let retorno = {datosTicketFormat, totalYStock}

            return retorno
        } else {
            console.log("No se pudo completar la compra ya que no hay productos en el carrito o no hay suficiente stock de ninguno de ellos.") 
        }
    }
}