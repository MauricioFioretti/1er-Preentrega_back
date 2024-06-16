import express from "express"
import { getProducts, getProductById, addProduct, updateProduct, deleteProduct } from "../controllers/products.controller.js"
import { authenticateAdminPremium, authenticateJWT } from "../middleware/passportMiddleware.js"

const routerProd = express.Router()

routerProd.get('/', authenticateJWT, getProducts)
routerProd.get('/:pid', authenticateJWT, getProductById)
routerProd.post('/', authenticateJWT, authenticateAdminPremium, addProduct)
routerProd.put('/:pid', authenticateJWT, authenticateAdminPremium, updateProduct)
routerProd.delete('/:pid', authenticateJWT, authenticateAdminPremium, deleteProduct)

export default routerProd
