import { Router } from "express"
import { ProductManager } from "../Dao/db/managers/productManagerDB.js"

const prod = new ProductManager()

//Instanciamos Router() en la variable que vamos a usar routerHandlebars
const routerHandlebarsProducts = Router()

routerHandlebarsProducts.get('/', async (req, res) => {
    //const products = await prod.getProducts(1000, 1, 1)
    const products = await prod.getProducts()

    res.render('products', {
        "array": products.payload,
        "valor": true
    })
})

export default routerHandlebarsProducts
