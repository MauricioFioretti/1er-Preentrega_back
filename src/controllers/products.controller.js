import { ProductsService } from "../services/products.service.js"
import { io } from "../utils/socket.js"

const productsService = new ProductsService()

export async function getProducts(req, res) {
    try {
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
        res.status(500).json({ message: "Error al obtener los productos", error: error.message })
    }
}

export async function getProductById(req, res) {
    try {
        const { pid } = req.params
        const productoId = await productsService.getProductByIdService(pid)

        if (productoId.success) {
            res.status(200).json({ message: productoId.message, data: productoId.data })
        } else {
            res.status(404).json({ message: productoId.message, error: productoId.error.message })
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el producto", error: error.message })
    }
}

export async function addProduct(req, res) {
    try {
        const solicitud = req.body
        const producto = await productsService.addProductService(solicitud)

        if (producto.success) {
            const productosHandlebars = (await productsService.getProductsService()).data
            io.sockets.emit('actualizarProductos', productosHandlebars)
            res.status(201).json({ message: producto.message, data: producto.data })
        } else {
            res.status(400).json({ message: producto.message, error: producto.error })
        }
    } catch (error) {
        res.status(500).json({ message: "Error al agregar el producto", error: error.message })
    }
}

export async function updateProduct(req, res) {
    try {
        const { pid } = req.params
        const producto = await productsService.updateProductService(pid, req.body)

        if (producto.success) {
            const productosHandlebars = (await productsService.getProductsService()).data
            io.emit('actualizarProductos', productosHandlebars)
            res.status(201).json({ message: producto.message, data: producto.data })
        } else {
            res.status(404).json({ message: producto.message, error: producto.error.message })
        }
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el producto", error: error.message })
    }
}

export async function deleteProduct(req, res) {
    try {
        const { pid } = req.params
        const respuesta = await productsService.deleteProductService(pid)

        if (respuesta.success) {
            const productosHandlebars = (await productsService.getProductsService()).data
            io.emit('actualizarProductos', productosHandlebars)
            res.status(200).json({ message: respuesta.message })
        } else {
            res.status(404).json({ message: respuesta.message, error: respuesta.error.message })
        }
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el producto", error: error.message })
    }
}