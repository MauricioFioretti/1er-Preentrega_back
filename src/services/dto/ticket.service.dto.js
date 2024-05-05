import { v4 as uuidv4 } from 'uuid'

export function ticketServiceDTO(totalYStock, email) {
    let currentDate = new Date()
    let ticket = {
        code : uuidv4(),
        purchase_datetime: currentDate,
        amount: totalYStock.acumulador,
        purchaser: email
    }

    return ticket
}