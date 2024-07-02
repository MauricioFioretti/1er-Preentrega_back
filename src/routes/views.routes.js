import { Router } from "express"
import { ViewsController } from "../controllers/views.controller.js"

const routerViews = Router()

const viewsController = new ViewsController()

// Rutas para obtener usuarios, registro e inicio de sesión
routerViews.get('/getUsers', viewsController.getUsersController)
routerViews.get('/register', viewsController.renderRegister)
routerViews.get('/login', viewsController.renderLogin)
//routerViews.get('/', viewsController.redirec)

export default routerViews