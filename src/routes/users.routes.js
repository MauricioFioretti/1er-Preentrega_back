import express from "express"
import { authenticateAdmin, authenticateJWT } from "../middleware/passportMiddleware.js"
import { UsersController } from "../controllers/users.controller.js"

const routerUser = express.Router()

const usersController = new UsersController()


routerUser.get('/premium/:uid', authenticateJWT, usersController.toggleUserRoleController)
routerUser.get('/', authenticateJWT, authenticateAdmin, usersController.getUsers)
routerUser.get('/modify', authenticateJWT, authenticateAdmin, usersController.modifyUsers)
routerUser.delete('/delete', authenticateJWT, authenticateAdmin, usersController.deleteUsers)
routerUser.delete('/delete/:uid/:email', authenticateJWT, authenticateAdmin, usersController.deleteUser)

export default routerUser


