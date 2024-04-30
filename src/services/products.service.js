import { ProductManager } from "../Dao/db/managers/productManagerDB.js"
const products = new ProductManager()

export class ProductsService {
    async getProductsService(limit, page, sort, query) {
        let productos = await (products.getProducts(limit, page, sort, query))

        //Cambiamos el nombre docs (nombre asiganado por paginate) a payload
        productos.payload = productos.docs
        delete productos.docs

        //Creamos las propiedades de prevLink y nextLink
        productos.prevLink = productos.prevPage ? `http://localhost:8080/api/products?page=${productos.prevPage}&limit=${limit}&query=${query ? `&query=${query}` : ''}&sort=${sort}` : null

        productos.nextLink = productos.nextPage ? `http://localhost:8080/api/products?page=${productos.nextPage}&limit=${limit}&query=${query ? `&query=${query}` : ''}&sort=${sort}` : null

        //Acomodamos category para que se vea bien sin guiones
        productos.payload.forEach(la => { la.category = la.category.replace(/-/g, ' ') })

        return productos
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



