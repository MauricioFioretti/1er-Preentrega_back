import express from "express"
import { getProducts, getProductById, addProduct, updateProduct, deleteProduct } from "../controllers/products.controller.js"
import { authenticateAdmin, authenticateJWT } from "../middleware/passportMiddleware.js"

const routerProd = express.Router()

routerProd.get('/', authenticateJWT, getProducts)
routerProd.get('/:pid', authenticateJWT, getProductById)
routerProd.post('/', authenticateJWT, authenticateAdmin, addProduct)
routerProd.put('/:pid', authenticateJWT, authenticateAdmin, updateProduct)
routerProd.delete('/:pid', authenticateJWT, authenticateAdmin, deleteProduct)

export default routerProd
