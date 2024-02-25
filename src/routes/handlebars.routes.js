import { Router } from "express"
import { ProductManager } from "../../Dao/db/models/productManagerDB.js"

const prod = new ProductManager()

//Instanciamos Router() en la variable que vamos a usar routerHandlebars
const routerHandlebars = Router()

routerHandlebars.get('/home', async (req, res) => {
    const products = await prod.getProducts(1000, 1, 1)

    res.render('home', {
        "array": products.payload,
        "valor": true
    })
})

export default routerHandlebars
