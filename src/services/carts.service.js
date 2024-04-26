import { CartsManager } from "../Dao/db/managers/cartManagerDB.js"
const cartsManager = new CartsManager()

export class CartsService {
    async addCart() {
        return await cartsManager.addCart()
    }

    async getCart(id) {
        return await cartsManager.getCart(id)
    }

    async addProductToCart(cid, pid) {
        return await cartsManager.addProductsToCart(cid, pid)
    }

    async updateCart(cid, data) {
        return await cartsManager.updateCart(cid, data)
    }

    async updateQuantity(cid, pid, quantity) {
        return await cartsManager.updateQuantity(cid, pid, quantity)
    }

    async deleteProductFromCart(cid, pid) {
        return await cartsManager.deleteProductToCart(cid, pid)
    }
}
