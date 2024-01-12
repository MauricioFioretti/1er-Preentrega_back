import express, { urlencoded } from 'express'

// Crear una instancia de Express 
const app = express()
app.use(urlencoded({ extended: true }))
app.use(express.json())

// Importar la clase ProductManager desde el módulo index.js
import { ProductManager } from './index.mjs'

// Crear una instancia de ProductManager
const products = new ProductManager()

//En caso que el archivo products.json no esté creado en la carpeta data, aplicar el comando 'npm run crear' 2 veces.

// Ruta raíz, responde con un mensaje simple
app.get("/", (req, res) => {
    res.send('<h1>Hola mundo!!!!<h1>')
})

// Ruta para obtener todos los productos o una cantidad específica
app.get("/products", async (req, res) => {
    try {
        // Obtener productos desde la clase creada en index.js 
        let prod = await products.getProducts()
        let cantidad = parseInt(req.query.limit)

        if (!isNaN(cantidad) && cantidad > 0) {
            // Reducir el array de productos según la cantidad especificada
            let arrayReducido = [...prod]
            arrayReducido.splice(cantidad, prod.length - cantidad)
            res.json({ message: 'Productos obtenidos correctamente', data: arrayReducido })
        }
        else {
            res.json({ message: 'Productos obtenidos correctamente', data: prod })
        }
    }
    catch (error) {
        // Manejar errores y enviar respuesta de error al cliente
        console.error(`Error al manejar la solicitud: ${error}`)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})

// Ruta para obtener un producto por su ID
app.get("/products/:pid", async (req, res) => {
    try {
        //Capturar id de params y buscar índice del producto según su id
        let pid = parseInt(req.params.pid)
        let productoId = await products.getProductById(pid)
        res.json({message: productoId})
    }
    catch (error) {
        // Manejar errores y enviar respuesta de error al cliente
        console.error(`Error al manejar la solicitud: ${error}`)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})

// Ruta para agregar productos 
app.post("/saveProducts", async (req, res) => {
    let solicitud = req.body
    try {
        // Agregar productos usando el metodo addProducts()
        let prod = await products.addProducts(...Object.values(solicitud))
        res.json({message: prod})
    }
    catch (error) {
        // Manejar errores y enviar respuesta de error al cliente
        console.error(`Error al manejar la solicitud: ${error}`)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})

// Ruta para actualizar productos 
app.put("/updateProducts", async (req, res) => {
    let solicitud = req.body
    let id = solicitud.id
    delete solicitud.id
    try {
        // Agregar productos usando el metodo addProducts()
        let prod = await products.updateProduct(id, solicitud)
        res.json({ message: prod })
    }
    catch (error) {
        // Manejar errores y enviar respuesta de error al cliente
        console.error(`Error al manejar la solicitud: ${error}`)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})

// Ruta para eliminar productos 
app.delete("/deleteProduct/:pid", async (req, res) => {
    let id = parseInt(req.params.pid)
    try {
        // Agregar productos usando el metodo addProducts()
        let respuesta = await products.deleteProduct(id)
        res.json({ message: respuesta })
    }
    catch (error) {
        // Manejar errores y enviar respuesta de error al cliente
        console.error(`Error al manejar la solicitud: ${error}`)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})


// Iniciar el servidor en el puerto 8080
app.listen(8080, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:8080`)
})

//Para poner en marcha el servidor, escribir el comando 'npm start' o 'npm run start' o 'nodemon ./src/app.mjs'