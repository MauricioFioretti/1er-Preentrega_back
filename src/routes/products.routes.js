import express from "express"
import { ProductsController } from "../controllers/products.controller.js"
import { authenticateAdminPremium, authenticateJWT } from "../middleware/passportMiddleware.js"

const routerProd = express.Router()

const productsController = new ProductsController()

routerProd.get('/', authenticateJWT, productsController.getProducts)
routerProd.get('/:pid', authenticateJWT, productsController.getProductById)
routerProd.post('/', authenticateJWT, authenticateAdminPremium, productsController.addProduct)
routerProd.put('/:pid', authenticateJWT, authenticateAdminPremium, productsController.updateProduct)
routerProd.delete('/:pid', authenticateJWT, authenticateAdminPremium, productsController.deleteProduct)

export default routerProd
