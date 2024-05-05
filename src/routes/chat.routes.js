import express from "express"
import { getRealTimeChat } from "../controllers/chat.controller.js"
import { authenticateUser } from "../middleware/passportMiddleware.js"

const routerChat = express.Router()

routerChat.get('/', authenticateUser, getRealTimeChat)

export default routerChat