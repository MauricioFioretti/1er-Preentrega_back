import { CartsManager } from "../Dao/db/managers/cartManagerDB.js"
import { cartServiceDTO } from "./dto/carts.service.dto.js"
const cartsManager = new CartsManager()

export class CartsService {
    async getCart(id) {
        let carrito = await cartsManager.getCart(id)
        return cartServiceDTO(carrito)
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
