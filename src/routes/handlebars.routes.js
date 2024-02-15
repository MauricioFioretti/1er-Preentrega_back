import { Router } from "express"
import { ProductManager } from "../../Dao/db/models/productManagerDB.js"

const prod = new ProductManager()

//Instanciamos Router() en la variable que vamos a usar routerHandlebars
const routerHandlebars = Router()

routerHandlebars.get('/home', async (req, res) => {
    const products = await prod.getProducts()

    res.render('home', {
        "array": products.data,
        "valor": true
    })
})

export default routerHandlebars
