import {ProductManager} from './index.mjs'

// Función autoinvocada asincrónica para ejecutar pruebas y operaciones con la clase ProductManager.
(async function ejecutar() {
    // Instancia de la clase ProductManager para gestionar productos.
    const productos = new ProductManager()

    //Preguntar por todos los productos agregados
    console.log(`\nLos productos ya agregados son:`)
    await productos.getProducts()

    //Agregar productos a la class
    console.log(`\nAgregando los libros:`)
    await productos.addProducts('OMA 1', 'Problemas de olimpiadas nivel 1', '$4000', 'OMA1.jpg', 1234, 10)
    await productos.addProducts('OMA 2', 'Problemas de olimpiadas nivel 2', '$5000', 'OMA2.jpg', 1235, 15)
    await productos.addProducts('OMA 3', 'Problemas de olimpiadas nivel 3', '$6000', 'OMA3.jpg', 1236, 20)
    await productos.addProducts('OMA 4', 'Problemas de olimpiadas nivel 4', '$7000', 'OMA4.jpg', 1237, 25)
    await productos.addProducts('OMA 5', 'Problemas de olimpiadas nivel 5', '$8000', 'OMA5.jpg', 1238, 30)
    await productos.addProducts('OMA 6', 'Problemas de olimpiadas nivel 6', '$9000', 'OMA6.jpg', 1239, 40)

    //Validar todos los campos son oblicatorios
    console.log(`\nPrueba de todos los campos son obligatorios`)
    await productos.addProducts('OMA 3', 'Problemas de olimpiadas nivel 3', 'OMA3.jpg', 1236, 3)

    //Validar si el código ya existe
    console.log(`\nPrueba de código identificador repetido`)
    await productos.addProducts('OMA 7', 'Problemas de olimpiadas nivel 7', '$9000', 'OMA7.jpg', 1237, 45)

    //Preguntar por todos los productos agregados
    console.log(`\nPrueba de todos los productos agregados`)
    await productos.getProducts()

    //Preguntar por un producto según su id
    console.log(`\nPrueba de buscar un producto según su id`)
    await productos.getProductById(2)
    await productos.getProductById(4)

    //Eliminar un producto según su id
    console.log(`\nEliminar un producto según su id`)
    await productos.deleteProduct(1)
    await productos.deleteProduct(2)

    //Preguntar por todos los productos agregados
    console.log(`\nPrueba de todos los productos agregados`)
    await productos.getProducts()

    //Modificar los campos de un producto
    console.log(`\nPrueba de modificación de un producto`)
    await productos.updateProduct(5, { "price": "$50000", "stock": 150 })

    //Preguntar por todos los productos agregados
    console.log(`\nPrueba de todos los productos agregados`)
    await productos.getProducts()
})()