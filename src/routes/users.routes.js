import express from "express"
import { authenticateJWT } from "../middleware/passportMiddleware.js"
import { toggleUserRoleController } from "../controllers/users.controller.js"

const routerUser = express.Router()

routerUser.get('/premium/:uid', authenticateJWT, toggleUserRoleController)

export default routerUser


