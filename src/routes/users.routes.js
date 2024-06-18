import express from "express"
import { authenticateAdmin, authenticateJWT } from "../middleware/passportMiddleware.js"
import { getUsers, toggleUserRoleController } from "../controllers/users.controller.js"

const routerUser = express.Router()

routerUser.get('/premium/:uid', authenticateJWT, toggleUserRoleController)

routerUser.get('/', authenticateJWT, authenticateAdmin, getUsers)

export default routerUser


