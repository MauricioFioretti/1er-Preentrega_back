import express from "express"
import { CartsController } from "../controllers/carts.controller.js"
import { authenticateJWT, authenticateUser } from "../middleware/passportMiddleware.js"
import { generateTicket } from "../controllers/ticket.controller.js"

const routerCart = express.Router()
const cartsController = new CartsController()

//Carrito
routerCart.post('/', authenticateJWT, authenticateUser, cartsController.addCart)
routerCart.get('/:cid', authenticateJWT, cartsController.getCart)
routerCart.post('/:cid/products/:pid', authenticateJWT, authenticateUser, cartsController.addProductToCart)
routerCart.put('/:cid', authenticateJWT, cartsController.updateCart)
routerCart.put('/:cid/products/:pid', authenticateJWT, cartsController.updateQuantity)
routerCart.delete('/:cid/products/:pid', authenticateJWT, cartsController.deleteProductFromCart)

//Ticket
routerCart.get('/:cid/purchase', authenticateJWT, generateTicket)

export default routerCart
