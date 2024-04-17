import { Router } from "express"
import { UserManager } from "../Dao/db/managers/usersManagerDB.js"

//Instanciamos Router() en la variable que vamos a usar routerProd
const routerViews = Router()

//Instanciamos UserManager()
const user = new UserManager()  

routerViews.get('/getUsers', async (req, res) => {
    let usuarios = await user.getUsers()
    res.send(usuarios)
})

routerViews.get('/register', (req, res) => {
    res.render('register')
})

routerViews.get('/login', (req, res) => {
    res.render('login')
})

export default routerViews
