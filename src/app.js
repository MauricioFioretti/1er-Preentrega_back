const express = require('express')

// Crear una instancia de Express 
const app = express()
app.use(express.urlencoded({ extended: true }))

// Importar la clase ProductManager y la función ejecutar desde el módulo index.js
const { ProductManager, ejecutar } = require('./index.js')

// Crear una instancia de ProductManager
const products = new ProductManager()

//Descomentar la función ejecutar() en caso que el archivo products.json no esté creado en la carpeta data, aplicar el comando 'npm run crear' 2 veces y luego volver a comentar la función.
//ejecutar()

// Ruta raíz, responde con un mensaje simple
app.get("/", (req, res) => {
    res.send('<h1>Hola mundo!!!!<h1>')
})

// Ruta para obtener todos los productos o una cantidad específica
app.get("/products", async (req, res) => {
    try {
        // Obtener productos desde la clase creada en index.js 
        let prod = await products.getProducts()
        let cantidad = req.query.limit

        if (!isNaN(cantidad) && cantidad > 0) {
            // Reducir el array de productos según la cantidad especificada
            let arrayReducido = [...prod]
            arrayReducido.splice(parseInt(cantidad), prod.length - parseInt(cantidad))
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
        // Obtener productos desde la clase creada en index.js
        let prod = await products.getProducts()

        //Capturar id de params y buscar índice del producto según su id
        let pid = req.params.pid
        let productoIndex = prod.findIndex((pr) => pr.id.toString() === pid)

        if (productoIndex === -1) {
            // Enviar respuesta de error si el producto no se encuentra
            res.status(404).json({ error: `El producto con id ${pid} no fue encontrado.` })
        } else {
            res.json({ message: 'Producto encontrado correctamente', data: prod[productoIndex] })
        }
    }
    catch (error) {
        // Manejar errores y enviar respuesta de error al cliente
        console.error(`Error al manejar la solicitud: ${error}`)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})

// Iniciar el servidor en el puerto 8080
app.listen(8080, () => {
    console.log('Servidor escuchando', 8080)
})

//Para poner en marcha el servidor, escribir el comando 'npm start' o 'npm run start'