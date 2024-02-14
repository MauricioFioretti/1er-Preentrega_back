import { Router } from "express"
import { ProductManager } from "../../Dao/db/models/productManagerDB.js"

const prod = new ProductManager()

//Instanciamos Router() en la variable que vamos a usar routerHandlebars
const routerHandlebars = Router()

routerHandlebars.get('/home', async (req, res) => {
    const products = await (await prod.getProducts()).data

    res.render('home', {
        "array": products,
        "valor": true
    })
})

export default routerHandlebars
