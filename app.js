const express = require('express')
const app = express()
const ProductManager = require('./index.js')

const products = new ProductManager()

app.get("/", (req, res) =>{
    res.send('<h1>Hola mundo!!!!<h1>')
})

app.get("/products", async (req, res) =>{
    let prod = await products.getProducts()
    res.send('<h1>Productos</h1>' + JSON.stringify(prod))

})

app.listen(8080, () => {
    console.log('Servidor escuchando', 8080)
})