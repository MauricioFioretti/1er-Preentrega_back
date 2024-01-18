import express, { urlencoded } from 'express'
import { Router } from "express"

// Importar la clase ProductManager desde el módulo index.js
import { ProductManager } from "../index.mjs"

//Instanciamos Router() en la variable que vamos a usar routerProd
const routerProd = Router()

// Crear una instancia de Express 
const app = express()
app.use(urlencoded({ extended: true }))
app.use(express.json())

// Crear una instancia de ProductManager
const products = new ProductManager()

//Notemos que la función admite cualquier string, pero si el número es negativo o decimal, el caracter '-', '.' y ',' hace que retorne false, por lo que solo admite naturales y el 0. Luego el 0 tomado en un if es false, por lo que sirve para números naturales como se pretendía.
//Esta función fue creada ya que los id que necesito, tienen que ser solo números. Y el problema es que si yo parseo 2f354df por ejemplo, lo toma como el número 2 y eso está mal. Además si pongo números con punto también me los transforma en enteros. 
function soloNumero(num) {
    for (let i of String(num)) {
        if (isNaN(parseInt(i))) {
            return false
        }
    }
    return parseInt(num)
}

routerProd.get('/', async (req, res) => {
    // Obtener productos con el método getProducts()
    let productos = await products.getProducts()
    if (productos.success) {
        let limit = soloNumero(req.query.limit)

        if (limit && limit > 0) {
            // Reducir el array de productos según el limit especificado
            let arrayReducido = productos.data.slice(0, limit)
            res.status(200).json({ message: productos.message, data: arrayReducido })
        }
        else {
            res.status(200).json({ message: productos.message, data: productos.data })
        }
    } else {
        // Manejar errores y enviar respuesta de error al cliente
        res.status(500).json({ message: productos.message, error: productos.error })
    }
})

routerProd.get('/:pid', async (req, res) => {
    //Capturar id de params y buscar producto con método getProductById()
    let pid = soloNumero(req.params.pid)
    if (pid) {
        let productoId = await products.getProductById(pid)
        if (productoId.success) {
            res.status(200).json({ message: productoId.message, data: productoId.data })
        } else {
            // Manejar errores y enviar respuesta de error al cliente
            res.status(404).json({ message: productoId.message, error: productoId.error })
        }
    } else {
        res.status(404).json({ message: `El id ingresado es incorrecto.` })
    }
})

routerProd.post('/', async (req, res) => {
    let solicitud = req.body
    // Agregar productos usando el método addProducts()
    let producto = await products.addProducts(solicitud)
    if (producto.success) {
        res.status(201).json({ message: producto.message, data: producto.data })
    } else {
        // Manejar errores y enviar respuesta de error al cliente
        res.status(400).json({ message: producto.message, error: producto.error })
    }
})

routerProd.put('/:pid', async (req, res) => {
    let id = soloNumero(req.params.pid)

    if (id) {
        // Actualizar productos usando el método updateProduct()
        let producto = await products.updateProduct(id, req.body)

        if (producto.success) {
            res.status(201).json({ message: producto.message, data: producto.data })
        } else {
            // Manejar errores y enviar respuesta de error al cliente
            res.status(404).json({ message: producto.message, error: producto.error })
        }
    } else {
        res.status(404).json({ message: `El id ingresado es incorrecto.` })
    }
})

routerProd.delete('/:pid', async (req, res) => {
    let id = soloNumero(req.params.pid)
    if (id) {
        // Eliminar productos usando el metodo deleteProduct()
        let respuesta = await products.deleteProduct(id)
        if (respuesta.success) {
            res.status(200).json({ message: respuesta.message, data: respuesta.data })
        } else {
            // Manejar errores y enviar respuesta de error al cliente
            res.status(404).json({ message: respuesta.message, error: respuesta.error })
        }
    } else {
        res.status(404).json({ message: `El id ingresado es incorrecto. Por favor ingrese un número natural.` })
    }
})

export default routerProd
