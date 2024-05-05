import express from "express"
import { generateTicket } from "../controllers/ticket.controller.js"
import { authenticateJWT } from "../middleware/passportMiddleware.js"

const routerTicket = express.Router()

routerTicket.get('/', authenticateJWT, generateTicket)

export default routerTicket 