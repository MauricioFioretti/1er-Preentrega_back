import express from "express"
import { registerUser, failedRegister, loginUser, failedLogin, logoutUser, callbackGithub } from "../controllers/auth.controller.js"
import { authenticateGithub, authenticateLogin, authenticateRegister } from "../middleware/passportMiddleware.js"

const routerAuth = express.Router()

routerAuth.post('/register', authenticateRegister, registerUser)
routerAuth.get('/user/failedRegister', failedRegister)
routerAuth.post('/login', authenticateLogin, loginUser)
routerAuth.get('/user/failedlogin', failedLogin)
routerAuth.get('/logout', logoutUser)
routerAuth.get('/github', authenticateGithub)
routerAuth.get('/callbackGithub', authenticateGithub, callbackGithub)

export default routerAuth