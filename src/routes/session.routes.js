import { Router } from "express"
import passport from "passport"

//Instanciamos Router() en la variable que vamos a usar routerProd
const routerSession = Router()

//Profile current
routerSession.get('/current', passport.authenticate('jwt', {session:false}), async (req, res) => {
    res.send(req.user)
})

export default routerSession

