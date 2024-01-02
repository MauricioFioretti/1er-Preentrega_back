// const fs = require('fs').promises

// async function archivoExiste(ruta) {
//     try {
//         await fs.access(ruta)
//         return true
//     }
//     catch (error) {
//         throw error
//     }
// }

// class ProductManager {
//     constructor() {
//         this.path = './products.json'
//     }

//     async getProducts() {
//         try {
//             await archivoExiste(this.path)
//             let contenidoArchivo = await fs.readFile(this.path, 'utf-8')
//             let contenidoArchivoParseado = JSON.parse(contenidoArchivo)
//             console.log(contenidoArchivoParseado)
//         }
//         catch (error) {
//             console.log(`Error al abrir archivo:`, error)
//             fs.writeFile(this.path, '')
//             console.log(`El archivo no existía, pero fue creado exitosamente en la ruta '${this.path}'`)
//         }
//     }

//     async addProducts(title, description, price, thumbnail, code, stock) {
//         try {
//             if (!title || !description || !price || !thumbnail || !code || !stock) {
//                 console.log(`Todos los datos son obligatorios!`)
//             }

//             else {

//                 let existe = await archivoExiste(this.path)
//                 let products = existe ? JSON.parse(await fs.readFile(this.path, 'utf-8')) : '[]'
//                 products = JSON.parse(products)

//                 if (!products.some((product) => product.code === code)) {
//                     let id = products.length + 1
//                     let newProduct = { title, description, price, thumbnail, code, stock, id }
//                     products.push(newProduct)
//                     products = JSON.stringify(products)
//                     await fs.writeFile(this.path, products)
//                     console.log(`El libro ${title} ha sido agregado correctamente`)
//                 }
//                 else {
//                     console.log(`El codigo ${code} ya existe`)
//                 }
//             }
//         }
//         catch (error) {
//             console.log(error)
//         }
//     }

//     // getProductById(id) {
//     //     let prod = this.products.find((p) => p.id === id)

//     //     if (prod) {
//     //         console.log(prod)
//     //     }
//     //     else {
//     //         console.log(`Not found`)
//     //     }
//     // }

// }

// const productos = new ProductManager()

// //Preguntar por todos los productos agregados
// console.log(`\nPrueba de todos los productos agregados`)
// productos.getProducts()

// //Agregar productos a la class
// console.log(`\nAgregando los libros`)
// productos.addProducts('OMA 1', 'Problemas de olimpiadas nivel 1', '$4000', 'OMA1.jpg', 1234, 3)
// productos.addProducts('OMA 2', 'Problemas de olimpiadas nivel 2', '$4000', 'OMA2.jpg', 1235, 3)
// productos.addProducts('OMA 3', 'Problemas de olimpiadas nivel 3', '$4000', 'OMA3.jpg', 1236, 3)

// //Validar todos los campos son oblicatorios
// console.log(`\nPrueba de todos los campos son obligatorios`)
// productos.addProducts('OMA 3', 'Problemas de olimpiadas nivel 3', 'OMA3.jpg', 1236, 3)

// //Preguntar por todos los productos agregados
// console.log(`\nPrueba de todos los productos agregados`)
// productos.getProducts()

// // //Preguntar por un producto segun su id
// // console.log(`\nPrueba de buscar un producto segun su id`)
// // productos.getProductById(2)
// // productos.getProductById(4)

const fs = require('fs').promises

async function archivoExiste(ruta) {
    try {
        await fs.access(ruta)
        return true
    } catch (error) {
        return false
    }
}

class ProductManager {
    constructor() {
        this.path = './products.json'
    }

    async getProducts() {
        try {
            let existe = await archivoExiste(this.path)
            if (!existe) {
                console.log(`El archivo no existe`)
            } 
            else {
                try {
                    let contenidoArchivo = await fs.readFile(this.path, 'utf-8')
                    let contenidoArchivoParseado = JSON.parse(contenidoArchivo)
                    console.log(contenidoArchivoParseado)
                } 
                catch (error) {
                    console.log(`El contenido del archivo no es un JSON válido.`, error)
                    await fs.writeFile(this.path, '[]')
                }
            }
        } 
        catch (error) {
            console.log(`Error al abrir archivo:`, error)
            await fs.writeFile(this.path, '[]')
            console.log(`El archivo no existía o no contenía un JSON válido, pero fue creado exitosamente en la ruta '${this.path}'`)
        }
    }

    async addProducts(title, description, price, thumbnail, code, stock) {
        try {
            if (!title || !description || !price || !thumbnail || !code || !stock) {
                console.log(`Todos los datos son obligatorios!`)
            } 
            else {
                let existe = await archivoExiste(this.path)
                let products = existe ? JSON.parse(await fs.readFile(this.path, 'utf-8')) : []

                if (!products.some((product) => product.code === code)) {
                    let id = 1

                    if(products[0]){
                        id = products[products.length-1].id + 1 
                    }            

                    let newProduct = { title, description, price, thumbnail, code, stock, id }
                    products.push(newProduct)
                    await fs.writeFile(this.path, JSON.stringify(products))
                    console.log(`El libro ${title} ha sido agregado correctamente`)
                } else {
                    console.log(`El código ${code} ya existe`)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(id) {
        try {
            let productos = await fs.readFile(this.path, 'utf-8')
            productos = JSON.parse(productos)

            let busqueda = productos.find((prod) => prod.id === id)
            
            if(busqueda){
                console.log(busqueda)
            }
            else{
                console.log(`El producto con el id: ${id} no se ha encontrado.`)
            }            
        } 
        catch (error) {
            console.log(error)
        }
    }

    async updateProduct(id, camposActualizados ) {
        try {
            let productos = await fs.readFile(this.path, 'utf-8')
            productos = JSON.parse(productos)
            let productoIndex = productos.findIndex((prod) => prod.id === id)

            if(productoIndex != -1){
                let productoModificado = {...productos[productoIndex]}
                Object.assign(productoModificado, camposActualizados)
                productos[productoIndex] = productoModificado
                await fs.writeFile(this.path, JSON.stringify(productos))
            }       
            else{
                console.log(`El producto con id: ${id} no ha sido encontrado`)
            }
        }

        catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(id) {
        try {
            let productos = await fs.readFile(this.path, 'utf-8')
            productos = JSON.parse(productos)
            let productosReducido = productos.filter((prod) => prod.id !== id)
            await fs.writeFile(this.path, JSON.stringify(productosReducido))       
        }

        catch (error) {
            console.log(error)
        }
    }
}

async function ejecutar() {
    const productos = new ProductManager()

    //Preguntar por todos los productos agregados
    console.log(`\nPrueba de todos los productos agregados`)
    await productos.getProducts()

    //Agregar productos a la class
    console.log(`\nAgregando los libros`)
    await productos.addProducts('OMA 1', 'Problemas de olimpiadas nivel 1', '$4000', 'OMA1.jpg', 1234, 3)
    await productos.addProducts('OMA 2', 'Problemas de olimpiadas nivel 2', '$4000', 'OMA2.jpg', 1235, 3)
    await productos.addProducts('OMA 3', 'Problemas de olimpiadas nivel 3', '$4000', 'OMA3.jpg', 1236, 3)

    //Validar todos los campos son oblicatorios
    console.log(`\nPrueba de todos los campos son obligatorios`)
    await productos.addProducts('OMA 3', 'Problemas de olimpiadas nivel 3', 'OMA3.jpg', 1236, 3)

    //Preguntar por todos los productos agregados
    console.log(`\nPrueba de todos los productos agregados`)
    await productos.getProducts()

    //Preguntar por un producto segun su id
    console.log(`\nPrueba de buscar un producto segun su id`)
    await productos.getProductById(2)
    await productos.getProductById(4)

    //Preguntar por un producto segun su id
    console.log(`\nEliminar un producto segun su id`)
    await productos.deleteProduct(1)
    await productos.deleteProduct(2)

    //Preguntar por todos los productos agregados
    console.log(`\nPrueba de todos los productos agregados`)
    await productos.getProducts()

    //Modificar los campos de un producto
    console.log(`\nPrueba de modificacion de un producto`)
    await productos.updateProduct(5, { "price": "$50000", "stock": 150 } )

    //Preguntar por todos los productos agregados
    console.log(`\nPrueba de todos los productos agregados`)
    await productos.getProducts()

    
}

ejecutar()


