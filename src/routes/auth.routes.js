import { Router } from "express"
import { UserManager } from "../../Dao/db/models/usersManagerDB.js"

//Instanciamos Router() en la variable que vamos a usar routerProd
const routerAuth = Router()

//Instanciamos UserManager()
const user = new UserManager()

routerAuth.post('/register', async (req, res) => {
    let newUser = req.body
    let respuesta = await user.addUser(newUser)

    res.redirect('/api/view/login')
})

routerAuth.post('/login', async (req, res) => {

    let datosUser = req.body
    let respuesta = await user.getUserByEmail(datosUser.email, datosUser.password)

    if(respuesta.success){
        req.session.user = respuesta.data.user
        req.session.password = datosUser.password
        req.session.email = datosUser.email

        res.redirect(`/api/products`)
    } else{
        res.send(respuesta.message)
    }
})

export default routerAuth
