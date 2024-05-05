import { ProductManager } from "../Dao/db/managers/productManagerDB.js"
import { productsServiceDTO } from "./dto/products.service.dto.js"
const products = new ProductManager()

export class ProductsService {
    async getProductsService(limit, page, sort, query) {
        let productos = await (products.getProducts(limit, page, sort, query))
        return productsServiceDTO(productos, limit, sort, query)
    }

    async getProductByIdService(pid) {
        return await products.getProductById(pid)
    }

    async addProductService(productData) {
        return await products.addProducts(productData)
    }

    async updateProductService(pid, productData) {
        return await products.updateProduct(pid, productData)
    }

    async deleteProductService(pid) {
        return await products.deleteProduct(pid)
    }
}



