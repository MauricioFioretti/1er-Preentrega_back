import { CartsService } from "../services/carts.service.js"
const cartsService = new CartsService()

export const addCart = async (req, res) => {
    try {
        const cart = await cartsService.addCart()
        if (cart.success) {
            res.status(201).json({ message: cart.message, data: cart.data })
        } else {
            res.status(500).json({ message: cart.message, error: cart.error })
        }
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error })
    }
}

export const getCart = async (req, res) => {
    try {
        const id = req.params.cid
        const carrito = await cartsService.getCart(id)

        if (carrito.success) {
            res.render('cart', { "array": carrito.data.products, "valor": true })
        } else {
            res.status(404).json({ message: carrito.message, error: carrito.error })
        }
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error })
    }
}

export const addProductToCart = async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const addToCart = await cartsService.addProductToCart(cid, pid)
        if (addToCart.success) {
            res.status(201).json({ message: addToCart.message, data: addToCart.data })
        } else {
            res.status(404).json({ message: addToCart.message, error: addToCart.error })
        }
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error })
    }
}

export const updateCart = async (req, res) => {
    try {
        const cid = req.params.cid
        const data = req.body.products
        const updateCart = await cartsService.updateCart(cid, data)
        if (updateCart.success) {
            res.status(201).json({ message: updateCart.message, data: updateCart.data })
        } else {
            res.status(404).json({ message: updateCart.message, error: updateCart.error })
        }
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error })
    }
}

export const updateQuantity = async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const quantity = req.body.quantity
        const updateQuantity = await cartsService.updateQuantity(cid, pid, quantity)
        if (updateQuantity.success) {
            res.status(201).json({ message: updateQuantity.message, data: updateQuantity.data })
        } else {
            res.status(404).json({ message: updateQuantity.message, error: updateQuantity.error })
        }
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error })
    }
}

export const deleteProductFromCart = async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const deleteToCart = await cartsService.deleteProductFromCart(cid, pid)
        if (deleteToCart.success) {
            res.status(200).json({ message: deleteToCart.message, data: deleteToCart.data })
        } else {
            res.status(404).json({ message: deleteToCart.message, error: deleteToCart.error })
        }
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error })
    }
}