import express, { urlencoded } from 'express'
import routerProd from '../src/routes/products.routes.js'

// Crear una instancia de Express 
const app = express()
app.use(urlencoded({ extended: true }))
app.use('/api/products', routerProd)
app.use(express.json())

// Importar la clase ProductManager desde el módulo index.js
import { ProductManager } from './index.mjs'

// Crear una instancia de ProductManager
const products = new ProductManager()

//Notemos que la función admite cualquier string, pero si el número es negativo o decimal, el caracter '-', '.' y ',' hace que retorne false, por lo que solo admite naturales y el 0. Luego el 0 tomado en un if es false, por lo que sirve para números naturales como se pretendía.
function soloNumero(num) {
    for (let i of String(num)) {
        if (isNaN(parseInt(i))) {
            return false
        }
    }
    return parseInt(num)
}

//En caso que el archivo products.json no esté creado en la carpeta data, aplicar el comando 'npm run crear' 2 veces.

// Ruta raíz, responde con un mensaje simple
app.get("/", (req, res) => {
    res.send('<h1>Hola mundo!!!!<h1>')
})

// Ruta para obtener todos los productos o una cantidad específica
app.get("/products", async (req, res) => {
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

// Ruta para obtener un producto por su ID
app.get("/products/:pid", async (req, res) => {
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

// Ruta para agregar productos 
app.post("/saveProducts", async (req, res) => {
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

// Ruta para actualizar productos 
app.put("/updateProducts/:pid", async (req, res) => {
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

// Ruta para eliminar productos 
app.delete("/deleteProduct/:pid", async (req, res) => {
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

// Iniciar el servidor en el puerto 8080
app.listen(8080, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:8080`)
})

//Para poner en marcha el servidor, escribir el comando 'npm start' o 'npm run start' o 'nodemon ./src/app.mjs'