import express from "express"
import { addCart, getCart, addProductToCart, updateCart, updateQuantity, deleteProductFromCart } from "../controllers/carts.controller.js"
import { authenticateJWT } from "../middleware/passportMiddleware.js"

const routerCart = express.Router()

routerCart.post('/', authenticateJWT, addCart)
routerCart.get('/:cid', authenticateJWT, getCart)
routerCart.post('/:cid/products/:pid', authenticateJWT, addProductToCart)
routerCart.put('/:cid', authenticateJWT, updateCart)
routerCart.put('/:cid/products/:pid', authenticateJWT, updateQuantity)
routerCart.delete('/:cid/products/:pid', authenticateJWT, deleteProductFromCart)

export default routerCart