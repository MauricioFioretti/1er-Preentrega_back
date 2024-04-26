import { ProductManager } from "../Dao/db/managers/productManagerDB.js"
const products = new ProductManager()


export class ProductsService {
    async getProductsService(limit, page, sort, query) {
        return await products.getProducts(limit, page, sort, query)
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



