import { Router, query } from "express"

//Instanciamos Router() en la variable que vamos a usar routerProd
const routerSession = Router()

function auth(req, res, next){
    if(req.session.user == "Mauri" && req.session.admin){
        return next()
    }

    return res.send("Usted no tiene permisos de estar aqui.")
}

routerSession.get('/login', (req, res) => {
    let { userName, password } = req.query

    if(userName != 'Mauri' || password != "123456"){
        return res.send('Usuario o contra incorrectos')
    }

    req.session.user = userName
    req.session.admin = true

    res.send("Usuario logueado correctamente")
})

routerSession.get('/profile', auth, (req, res) => {
    res.send("Si estas viendo esto es porque estas logueado.")
})

routerSession.get('/setSession', (req, res) => {
    req.session.user = 'usario'

    res.send("Usuario logueado")
})

routerSession.get('/getSession', (req, res) => {
    res.send(req.session)
})

routerSession.get('/logout', (req, res) => {
    req.session.destroy( (err) =>{
        if(err) res.send('Error en logout')
        res.send("Logout OK")
    })
})

export default routerSession
