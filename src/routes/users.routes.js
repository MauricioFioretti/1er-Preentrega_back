import express from "express"
import { authenticateAdmin, authenticateJWT } from "../middleware/passportMiddleware.js"
import { deleteUser, deleteUsers, getUsers, modifyUsers, toggleUserRoleController } from "../controllers/users.controller.js"

const routerUser = express.Router()

routerUser.get('/premium/:uid', authenticateJWT, toggleUserRoleController)

routerUser.get('/', authenticateJWT, authenticateAdmin, getUsers)

routerUser.get('/modify', authenticateJWT, authenticateAdmin, modifyUsers)

routerUser.get('/delete', authenticateJWT, authenticateAdmin, deleteUsers)

routerUser.get('/delete/:uid/:email', authenticateJWT, authenticateAdmin, deleteUser)

export default routerUser


