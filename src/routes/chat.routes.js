import express from "express"
import { getRealTimeChat } from "../controllers/chat.controller.js"

const routerChat = express.Router()

routerChat.get('/', getRealTimeChat)

export default routerChat