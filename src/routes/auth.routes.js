import { Router } from "express"
import { UserManager } from "../../Dao/db/models/usersManagerDB.js"
import passport from "passport"

//Instanciamos Router() en la variable que vamos a usar routerProd
const routerAuth = Router()

//Instanciamos UserManager()
const user = new UserManager()

//Registro
routerAuth.post('/register', passport.authenticate('register', { failureRedirect: '/api/auth/user/failedRegister' }), async (req, res) => {
    res.redirect('/api/view/login')
})

routerAuth.get('/user/failedRegister', (req, res) => {
    res.send('Failed register')
})

//Login
routerAuth.post('/login', passport.authenticate('login', { failureRedirect: '/api/auth/user/failedLogin' }), async (req, res) => {
    req.session.usuario = req.user
    res.redirect('/api/products')
})

routerAuth.get('/user/failedlogin', (req, res) => {
    res.send('Failed login')
})

//Login Github
routerAuth.get('/github', passport.authenticate('github', {}), (req, res) => { })

routerAuth.get('/callbackGithub', passport.authenticate('github', {}), (req, res) => {

    req.session.usuario = req.user
    res.redirect('/api/products')
})


export default routerAuth
