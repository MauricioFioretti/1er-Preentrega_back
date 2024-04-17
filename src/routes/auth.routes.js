import { Router } from "express"
import { UserManager } from "../Dao/db/managers/usersManagerDB.js"
import passport from "passport"
import { generaToken } from "../utils/utils.js"

//Instanciamos Router() en la variable que vamos a usar routerProd
const routerAuth = Router()

//Instanciamos UserManager()
const user = new UserManager()

//Registro
routerAuth.post('/register', passport.authenticate('register', {session:false, failureRedirect: '/auth/user/failedRegister' }), async (req, res) => {
    res.redirect('/login')
})

//Registro failed
routerAuth.get('/user/failedRegister', (req, res) => {
    res.send('Failed register')
})

//Login
routerAuth.post('/login', passport.authenticate('login', {session:false, failureRedirect: '/auth/user/failedLogin' }), async (req, res) => {
    let token = generaToken(req.user)
    res.cookie('cookieToken', token, { httpOnly: true })
    res.redirect('/api/products')
})

//Login failed
routerAuth.get('/user/failedlogin', (req, res) => {
    res.send('Failed login')
})

//Logout
routerAuth.get('/logout', (req, res) => {
    res.clearCookie('cookieToken').redirect('/login')
})

//Login Github
routerAuth.get('/github', passport.authenticate('github', {session:false}), (req, res) => { })

routerAuth.get('/callbackGithub', passport.authenticate('github', {session:false}), (req, res) => {
    let token = generaToken(req.user)
    res.cookie('cookieToken', token, { httpOnly: true })
    res.redirect('/api/products')
})

export default routerAuth
