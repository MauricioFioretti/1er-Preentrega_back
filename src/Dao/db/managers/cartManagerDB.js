import { Cart } from "../models/cart.modelDB.js"

export class CartsManager {

    // Método para añadir un carrito nuevo a la db.
    async addCart(cartId) {
        try {
            let carrito = await Cart.create({ cartId })
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
            let carrito = await Cart.findOne({ cartId: id }).lean().populate("products.product")
            return { success: true, message: `Carrito obtenido correctamente`, data: carrito }

        } catch (error) {
            // Captura y manejo de errores durante la obtención del carrito.
            return { success: false, message: `Error al obtener el carrito`, error: error.message }
        }
    }

    // Método para añadir un producto al carrito según el id del carrito y del producto.
    async addProductsToCart(cid, pid) {
        try {
            let resultado = await Cart.findOne({ cartId: cid, 'products.product': pid })
                ? await Cart.updateOne({ cartId: cid, 'products.product': pid }, { $inc: { 'products.$.quantity': 1 } })
                : await Cart.updateOne({ cartId: cid }, { $addToSet: { products: { product: pid, quantity: 1 } } }, { upsert: true })

            return { success: true, message: `El producto con id ${pid} se agregó correctamente.`, data: resultado }

        } catch (error) {
            // Captura y manejo de errores durante la obtención de un producto segun el id del carrito y del producto.
            return { success: false, message: `Error al agregar el producto por ID.`, error: error }
        }
    }

    // Método para actualizar todos los productos de un carrito según un arreglo de productos proporcionado.
    async updateCart(cid, data) {
        try {
            let result = await Cart.updateOne({ cartId: cid }, { $set: { products: data } })
            return { success: true, message: `El carrito con id ${cid} se agregó correctamente.`, data: result }

        } catch (error) {
            // Captura y manejo de errores durante la obtención de un carrito por ID.
            return { success: false, message: `Error al agregar el producto por ID.`, error: error }
        }
    }

    // Método para actualizar la cantidad de un producto del carrito según el id del producto y del carrito proporcionado.
    async updateQuantity(cid, pid, quantity) {
        try {
            let resultado = await Cart.updateOne({ cartId: cid, 'products.product': pid }, { $set: { 'products.$.quantity': quantity } })
            return { success: true, message: `Se modificó correctamente la cantidad del producto con id ${pid}.`, data: resultado }

        } catch (error) {
            // Captura y manejo de errores durante la obtención de un producto segun el id del carrito y del producto.
            return { success: false, message: `Error al modificar la cantidad del producto por ID.`, error: error }
        }
    }

    // Método para eliminar un producto del carrito según el id del carrito y del producto.
    async deleteProductToCart(cid, pid) {
        try {
            let result = await Cart.updateOne({ cartId: cid }, { $pull: { products: { product: pid } } })
            
            return { success: true, message: `El producto con id ${pid} se eliminó correctamente.`, data: result }
        } catch (error) {
            // Captura y manejo de errores durante la obtención de un carrito por ID.
            return { success: false, message: `Error al eliminar el producto por ID.`, error: error }
        }
    }

    // Método para eliminar un carrito según el id.
    async deleteCart(cid) {
        try {
            await Cart.deleteOne({ cartId: cid })
            return { success: true, message: `El Carrito con id ${cid} se eliminó correctamente.` }
        } catch (error) {
            // Captura y manejo de errores durante la eliminación de un carrito por ID.
            return { success: false, message: `Error al eliminar el carrito por ID.`, error: error }
        }
    }
}

// Exportación de la clase CartsManager para su uso en otros módulos.
export default { CartsManager }
