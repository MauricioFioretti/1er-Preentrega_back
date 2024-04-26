import express from "express"
import { getProducts, getProductById, addProduct, updateProduct, deleteProduct } from "../controllers/products.controller.js"
import { authenticateJWT } from "../middleware/passportMiddleware.js"

const routerProd = express.Router()

routerProd.get('/', authenticateJWT, getProducts)
routerProd.get('/:pid', authenticateJWT, getProductById)
routerProd.post('/', authenticateJWT, addProduct)
routerProd.put('/:pid', authenticateJWT, updateProduct)
routerProd.delete('/:pid', authenticateJWT, deleteProduct)

export default routerProd
