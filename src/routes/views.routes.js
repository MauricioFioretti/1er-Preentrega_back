import { Router } from "express"
import { getUsersController, renderRegister, renderLogin } from "../controllers/views.controller.js"

const routerViews = Router()

// Rutas para obtener usuarios, registro e inicio de sesión
routerViews.get('/getUsers', getUsersController)
routerViews.get('/register', renderRegister)
routerViews.get('/login', renderLogin)

export default routerViews