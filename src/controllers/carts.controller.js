import { CartsService } from "../services/carts.service.js"
import { ProductsService } from "../services/products.service.js"
const cartsService = new CartsService()
const productsService = new ProductsService()


export class CartsController {
    addCart = async (req, res) => {
        try {
            const cart = await cartsService.addCart()
            if (cart.success) {
                res.status(201).json({ message: cart.message, data: cart.data })
            } else {
                req.logger.warning(`No se pudo añadir el carrito - Motivo: ${cart.error} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
    
                res.status(500).json({ message: cart.message, error: cart.error })
            }
        } catch (error) {
            req.logger.error(`${req.method} ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - Error interno del servidor - Error: ${error.message}`)
    
            res.status(500).json({ message: "Error interno del servidor", error: error })
        }
    }
    
    getCart = async (req, res) => {
        try {
            const id = req.params.cid
            const carrito = await cartsService.getCart(id)
    
            if (carrito.success) {
                res.render('cart', {
                    "array": carrito.data.products,
                    "cartId": id,
                    "valor": true
                })
            } else {
                req.logger.warning(`No se pudo obtener el carrito - Motivo: ${carrito.error} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
    
                res.status(404).json({ message: carrito.message, error: carrito.error })
            }
        } catch (error) {
            req.logger.error(`${req.method} ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - Error interno del servidor - Error: ${error.message}`)
    
            res.status(500).json({ message: "Error interno del servidor", error: error })
        }
    }
    
    addProductToCart = async (req, res) => {
        try {
            const cid = req.params.cid
            const pid = req.params.pid        
    
            const producto = await productsService.getProductByIdService(pid)
    
            if (producto.data.owner === req.user._id) {
                return res.status(404).json({ message: 'No se pueden agregar productos que haya creado el mismo usuario.', error: 'Error al agregar producto.' })
            }
    
            const addToCart = await cartsService.addProductToCart(cid, pid)
            if (addToCart.success) {
                res.status(201).json({ message: addToCart.message, data: addToCart.data })
            } else {
                req.logger.warning(`No se pudo añadir el producto al carrito - Motivo: ${addToCart.error} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
    
                res.status(404).json({ message: addToCart.message, error: addToCart.error })
            }
        } catch (error) {
            req.logger.error(`${req.method} ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - Error interno del servidor - Error: ${error.message}`)
    
            res.status(500).json({ message: "Error interno del servidor", error: error })
        }
    }
    
    updateCart = async (req, res) => {
        try {
            const cid = req.params.cid
            const data = req.body.products
            const updateCart = await cartsService.updateCart(cid, data)
            if (updateCart.success) {
                res.status(201).json({ message: updateCart.message, data: updateCart.data })
            } else {
                req.logger.warning(`No se pudo actualizar el carrito - Motivo: ${updateCart.error} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
    
                res.status(404).json({ message: updateCart.message, error: updateCart.error })
            }
        } catch (error) {
            req.logger.error(`${req.method} ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - Error interno del servidor - Error: ${error.message}`)
    
            res.status(500).json({ message: "Error interno del servidor", error: error })
        }
    }
    
    updateQuantity = async (req, res) => {
        try {
            const cid = req.params.cid
            const pid = req.params.pid
            const quantity = req.body.quantity
            const updateQuantity = await cartsService.updateQuantity(cid, pid, quantity)
            if (updateQuantity.success) {
                res.status(201).json({ message: updateQuantity.message, data: updateQuantity.data })
            } else {
                req.logger.warning(`No se pudo actualizar la cantidad del producto - Motivo: ${updateQuantity.error} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
    
                res.status(404).json({ message: updateQuantity.message, error: updateQuantity.error })
            }
        } catch (error) {
            req.logger.error(`${req.method} ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - Error interno del servidor - Error: ${error.message}`)
    
            res.status(500).json({ message: "Error interno del servidor", error: error })
        }
    }
    
    deleteProductFromCart = async (req, res) => {
        try {
            const cid = req.params.cid
            const pid = req.params.pid
            const deleteToCart = await cartsService.deleteProductFromCart(cid, pid)
            if (deleteToCart.success) {
                res.status(200).json({ message: deleteToCart.message, data: deleteToCart.data })
            } else {
                req.logger.warning(`No se pudo eliminar el carrito - Motivo: ${deleteToCart.error} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
    
                res.status(404).json({ message: deleteToCart.message, error: deleteToCart.error })
            }
        } catch (error) {
            req.logger.error(`${req.method} ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - Error interno del servidor - Error: ${error.message}`)
    
            res.status(500).json({ message: "Error interno del servidor", error: error })
        }
    }
    
}

