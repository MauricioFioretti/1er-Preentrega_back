import { Cart } from "./cart.modelDB.js"
import mongoose from "mongoose"

export class CartsManager {

    // Método para añadir un carrito nuevo a la db.
    async addCart() {
        try {
            let carrito = await Cart.create({})
            return { success: true, message: `Carrito agregado correctamente`, data: carrito }
        }
        catch (error) {
            // Captura y manejo de errores durante la adición de carritos.
            return { success: false, message: `Error al agregar el carrito`, error: error.message }
        }
    }

    // Método para obtener un carrito.
    async getCart(id) {
        try {
            let carrito = await Cart.findById(id)
            return { success: true, message: `Carrito obtenido correctamente`, data: carrito }
        } catch (error) {
            // Captura y manejo de errores durante la adición de carritos.
            return { success: false, message: `Error al obtener el carrito`, error: error.message }
        }

    }

    // Método para añadir un producto al carrito según el id del carrito y del producto.
    async addProductsToCart(cid, pid) {
        try {
            let idProduct = new mongoose.Types.ObjectId(pid)

            let resultado = await Cart.findOne({ _id: cid, 'products._id': idProduct })
                ? await Cart.updateOne({ _id: cid, 'products._id': idProduct }, { $inc: { 'products.$.quantity': 1 } }) 
                : await Cart.updateOne({ _id: cid }, { $addToSet: { products: { _id: idProduct, quantity: 1 } } }, { upsert: true })

            return { success: true, message: `El producto con id ${pid} se agregó correctamente.`, data: resultado }

        } catch (error) {
            // Captura y manejo de errores durante la obtención de un carrito por ID.
            return { success: false, message: `Error al agregar el producto por ID.`, error: error }
        }
    }
}

// Exportación de la clase CartsManager para su uso en otros módulos.
export default { CartsManager }
