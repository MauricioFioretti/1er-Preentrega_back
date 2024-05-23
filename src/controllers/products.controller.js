import { ProductsService } from "../services/products.service.js"
import { io } from "../utils/socket.js"

const productsService = new ProductsService()

export async function getProducts(req, res) {
    try {
        req.logger.info(`Método: Obtener productos - Email: ${req.user.email} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)

        const { limit = 10, page = 1, sort = null, query = '' } = req.query

        const productos = await productsService.getProductsService(limit, page, sort, query)
        const usuario = req.user

        res.render('products', {
            'firstName': usuario.firstName,
            'role': usuario.role,
            "cartId": usuario.cartId,
            "array": productos.payload,
            "valor": true
        })
    } catch (error) {
        req.logger.error(`${req.method} ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - Error al obtener los productos - Error: ${error.message}`)

        res.status(500).json({ message: "Error al obtener los productos", error: error.message })
    }
}

export async function getProductById(req, res) {
    try {
        req.logger.info(`Método: Obtener un producto por ID - Email: ${req.user.email} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)

        const { pid } = req.params
        const productoId = await productsService.getProductByIdService(pid)

        if (productoId.success) {
            req.logger.info(`Se obtubo el producto correctamente - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)

            res.status(200).json({ message: productoId.message, data: productoId.data })
        } else {
            req.logger.warning(`No se pudo obtener el producto - Motivo: ${productoId.error.message} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)

            res.status(404).json({ message: productoId.message, error: productoId.error.message })
        }
    } catch (error) {
        req.logger.error(`${req.method} ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - Error al obtener el producto - Error: ${error.message}`)

        res.status(500).json({ message: "Error al obtener el producto", error: error.message })
    }
}

export async function addProduct(req, res) {
    try {
        req.logger.info(`Método: Añadir un producto - Email: ${req.user.email} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)

        const solicitud = req.body
        const producto = await productsService.addProductService(solicitud)

        if (producto.success) {
            req.logger.info(`Se añadió el producto correctamente - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)

            const productosHandlebars = (await productsService.getProductsService()).data
            io.sockets.emit('actualizarProductos', productosHandlebars)
            res.status(201).json({ message: producto.message, data: producto.data })
        } else {
            req.logger.warning(`No se pudo añadir el producto - Motivo: ${producto.error} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)

            res.status(400).json({ message: producto.message, error: producto.error })
        }
    } catch (error) {
        req.logger.error(`${req.method} ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - Error al agregar el producto - Error: ${error.message}`)

        res.status(500).json({ message: "Error al agregar el producto", error: error.message })
    }
}

export async function updateProduct(req, res) {
    try {
        req.logger.info(`Método: Actualizar un producto - Email: ${req.user.email} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)

        const { pid } = req.params
        const producto = await productsService.updateProductService(pid, req.body)

        if (producto.success) {
            req.logger.info(`Se actualizó el producto correctamente - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)

            const productosHandlebars = (await productsService.getProductsService()).data
            io.emit('actualizarProductos', productosHandlebars)
            res.status(201).json({ message: producto.message, data: producto.data })
        } else {
            req.logger.warning(`No se pudo actualizar el producto - Motivo: ${producto.error.message} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)

            res.status(404).json({ message: producto.message, error: producto.error.message })
        }
    } catch (error) {
        req.logger.error(`${req.method} ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - Error al actualizar el producto - Error: ${error.message}`)

        res.status(500).json({ message: "Error al actualizar el producto", error: error.message })
    }
}

export async function deleteProduct(req, res) {
    try {
        req.logger.info(`Método: Eliminar un producto - Email: ${req.user.email} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)

        const { pid } = req.params
        const respuesta = await productsService.deleteProductService(pid)

        if (respuesta.success) {
            req.logger.info(`Se eliminó el producto correctamente - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)

            const productosHandlebars = (await productsService.getProductsService()).data
            io.emit('actualizarProductos', productosHandlebars)
            res.status(200).json({ message: respuesta.message })
        } else {
            req.logger.warning(`No se pudo eliminar el producto - Motivo: ${respuesta.error.message} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)

            res.status(404).json({ message: respuesta.message, error: respuesta.error.message })
        }
    } catch (error) {
        req.logger.error(`${req.method} ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - Error al eliminar el producto - Error: ${error.message}`)

        res.status(500).json({ message: "Error al eliminar el producto", error: error.message })
    }
}