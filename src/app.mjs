import express, { urlencoded } from 'express'
import routerProd    from '../src/routes/products.routes.js'

// Crear una instancia de Express 
const app = express()
app.use(urlencoded({ extended: true }))
app.use('/api/products', routerProd)
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
        let productos = await products.getProducts()
        let limit = parseInt(req.query.limit)

        //corregir el poner 2fkjscdbc y que se muestren 2 productos
        if (!isNaN(limit) && limit > 0) {
            // Reducir el array de productos según el limit especificado
            let arrayReducido = [...productos]
            arrayReducido.splice(limit, productos.length - limit)
            //let arrayReducido = productos.slice(0, limit)
            res.status(200).json({ message: 'Productos obtenidos correctamente', data: arrayReducido })
        }
        else {
            res.status(200).json({ message: 'Productos obtenidos correctamente', data: productos })
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
        res.json(productoId)
    }
    catch (error) {
        // Manejar errores y enviar respuesta de error al cliente
        console.error(`Error al manejar la solicitud: ${error}`)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})

// Ruta para agregar productos 

//Arreglar bug de que no podes agregar otro libro con el mismo nombre, imagen o codigo
app.post("/saveProducts", async (req, res) => {
    let solicitud = req.body
    try {
        // Agregar productos usando el metodo addProducts()
        let prod = await products.addProducts(solicitud)
        res.status(201).json({message: prod})
    }
    catch (error) {
        // Manejar errores y enviar respuesta de error al cliente
        console.error(`Error al manejar la solicitud: ${error}`)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})

// Ruta para actualizar productos 
app.put("/updateProducts", async (req, res) => {
    // let solicitud = req.body
    // let id = solicitud.id
    // delete solicitud.id

    //Arreglar bug de actulizacion a donde le cambio el codigo a un producto que no es el correspondiente
    //No pueden quedar 2 libros con el mismo codigo, titulo o imagen

    let {id} = req.body

    try {
        // Agregar productos usando el metodo addProducts()
        let prod = await products.updateProduct(id, req.body)
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