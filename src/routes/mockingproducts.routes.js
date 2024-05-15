import express from "express"
import { generateProduct } from "../mocks/products.mocks.js"

const routerMocking = express.Router()

//Mocking
routerMocking.get('/mockingproducts', (req, res) =>{

    let productos = []

    for(let i = 0 ; i < 100; i++){
        let product = generateProduct()
        productos.push(product)
    }

    res.render('products', {
        'firstName': "Usuario Prueba",
        'role': "User",
        "array": productos,
        "valor": true
    })
})

export default routerMocking
