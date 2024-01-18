import { Router } from "express"
import { CartsManager } from "../models/cartsManager.mjs"
import { soloNumero } from "../functionTest/functions.mjs"

const routerCart = Router()

const carts = new CartsManager()

routerCart.post('/', async (req, res) => {
    let cart = await carts.addCart()
    if (cart.success) {
        res.status(201).json({ message: cart.message, data: cart.data })
    } else {
        res.status(500).json({ message: cart.message, error: cart.error })
    }
})

routerCart.get('/:cid', async (req, res) => {
    let id = soloNumero(req.params.cid)
    if (id) {
        let carrito = await carts.getCart(id)
        if (carrito.success) {
            res.status(200).json({ message: carrito.message, data: carrito.data })
        } else {
            res.status(404).json({ message: carrito.message, error: carrito.error })
        }
    } else {
        res.status(404).json({ message: `El id ingresado es incorrecto, por favor ingrese un número entero positivo.` })
    }
})

routerCart.post('/:cid/products/:pid', async (req, res) => {
    //No los pasamos por la función soloNumero() porque a esos valores no los ingresa el usario, sino que se ingresan automáticamente con el botón de añadir que programa el front. Por lo que sabemos con seguridad que son números que vienen como string. 
    let cid = parseInt(req.params.cid)
    let pid = parseInt(req.params.pid)

    let addToCart = await carts.addProductsToCart(cid, pid)

    if (addToCart.success) {
        res.status(201).json({ message: addToCart.message, data: addToCart.data })
    } else {
        res.status(404).json({ message: addToCart.message, error: addToCart.error })
    }
})

export default routerCart