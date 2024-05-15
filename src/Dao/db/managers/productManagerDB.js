import { Product } from '../models/product.modelDB.js'

import { generateProductByIdInfo, generateUpdateProductInfo } from "../../../services/errors/messages/userCreationError.message.js"
import EErrors from "../../../services/errors/errors-enum.js"
import CustomError from "../../../services/errors/customError.js"

export class ProductManager {
    // Método para obtener todos los productos.
    async getProducts(limit = 10, page = 1, sort = null, query) {
        try {
            let productos

            if (query == "disponibles") {
                productos = await Product.paginate({ status: true }, { limit, page, sort: sort ? { price: sort } : {} })
            } else {
                productos = await Product.paginate(query ? { category: query } : {}, { limit, page, sort: sort ? { price: sort } : {} })
            }
            return productos
        }
        catch (error) {
            // Captura y manejo de errores durante la obtención de productos.
            return { success: false, message: `Error al obtener los productos.`, error: error }
        }
    }

    // Método para agregar un nuevo producto.
    async addProducts(newProduct) {
        try {
            await Product.create(newProduct)
            return { success: true, message: `El producto ${newProduct.title} ha sido agregado correctamente`, data: newProduct }
        }
        catch (error) {
            // Captura y manejo de errores durante la adición de productos.
            return { success: false, message: `Error al agregar el producto`, error: error }
        }
    }

    // Método para obtener un producto por su ID.
    async getProductById(id) {
        let busquedaPorId = await Product.findById(id)

        if (!busquedaPorId) {
            //Custom error
            CustomError.createError({
                name: 'Error al buscar producto por id',
                cause: generateProductByIdInfo(id),
                message: 'Error al buscar producto por id',
                code: EErrors.INVALID_TYPE_ERROR
            })
        } else {
            return { success: true, message: `El producto con id ${id} se encontró exitosamente.`, data: busquedaPorId }
        }
    }

    // Método para actualizar los campos de un producto por su ID.
    async updateProduct(id, camposActualizados) {
        try {
            let resultado = await Product.updateOne({ "_id": id }, camposActualizados)

            if (resultado.matchedCount === 0) {
                //Custom error
                CustomError.createError({
                    name: 'Error al actualizar el producto.',
                    cause: generateUpdateProductInfo(id, camposActualizados),
                    message: 'Error al actualizar el producto.',
                    code: EErrors.INVALID_TYPE_ERROR
                })
            } else {
                let busquedaPorId = await Product.findById(id)
                return { success: true, message: `El producto con id ${id} ha sido actualizado.`, data: busquedaPorId }
            }
        }
        catch (error) {
            // Captura y manejo de errores durante la actualización del producto.
            return { success: false, message: "Error al actualizar el producto.", error: error }
        }
    }

    // Método para eliminar un producto por su ID.
    async deleteProduct(id) {
        let resultado = await Product.deleteOne({ "_id": id })

        if (resultado.deletedCount === 0) {
            //Custom error
            CustomError.createError({
                name: 'Error al eliminar el producto por id. No se ha encontrado.',
                cause: generateProductByIdInfo(id),
                message: 'Error al eliminar el producto por id. No se ha encontrado.',
                code: EErrors.INVALID_TYPE_ERROR
            })
        } else {
            return { success: true, message: `El producto con id ${id} ha sido eliminado correctamente de la base de datos.` }
        }

    }
}

// Exportación de la clase ProductManager para su uso en otros módulos.
export default { ProductManager }
