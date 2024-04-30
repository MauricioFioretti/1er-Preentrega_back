import { CartsManager } from "../Dao/db/managers/cartManagerDB.js"
const cartsManager = new CartsManager()

export class CartsService {
    async addCart() {
        return await cartsManager.addCart()
    }

    async getCart(id) {
        let carrito = await cartsManager.getCart(id)

        //Agregamos las propiedades precio total y acomodamos category para que se vea bien sin guiones
        carrito.data.products.forEach(el => {
            el.priceTot = el.product.price * el.quantity
            el.product.category = el.product.category.replace(/-/g, ' ')
        })

        return carrito
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
