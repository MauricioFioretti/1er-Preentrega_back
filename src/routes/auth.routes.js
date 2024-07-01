import express from "express"
import { authenticateGithub, authenticateLogin, authenticateRegister } from "../middleware/passportMiddleware.js"
import { AuthController } from "../controllers/auth.controller.js"

const authController = new AuthController()
const routerAuth = express.Router()

routerAuth.post('/register', authenticateRegister, authController.registerUser)
routerAuth.post('/login', authenticateLogin, authController.loginUser)
routerAuth.get('/logout', authController.logoutUser)
routerAuth.get('/github', authenticateGithub)
routerAuth.get('/callbackGithub', authenticateGithub, authController.callbackGithub)

export default routerAuth