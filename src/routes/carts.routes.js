import express from "express"
import { addCart, getCart, addProductToCart, updateCart, updateQuantity, deleteProductFromCart } from "../controllers/carts.controller.js"
import { authenticateJWT, authenticateUser } from "../middleware/passportMiddleware.js"
import { generateTicket } from "../controllers/ticket.controller.js"

const routerCart = express.Router()

//Carrito
routerCart.post('/', authenticateJWT, authenticateUser, addCart)
routerCart.get('/:cid', authenticateJWT, getCart)
routerCart.post('/:cid/products/:pid', authenticateJWT, authenticateUser, addProductToCart)
routerCart.put('/:cid', authenticateJWT, updateCart)
routerCart.put('/:cid/products/:pid', authenticateJWT, updateQuantity)
routerCart.delete('/:cid/products/:pid', authenticateJWT, deleteProductFromCart)

//Ticket
routerCart.get('/:cid/purchase', authenticateJWT, generateTicket)

export default routerCart
