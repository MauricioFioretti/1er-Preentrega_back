const fs = require('fs').promises
const fs2 = require('fs')
const path = require('path')

class ProductManager {
    constructor() {
        //Al utilizar el módulo path de Node.js junto con la variable global __dirname, creamos una ruta completa que es independiente del directorio en el que se encuentra el archivo 'products.json'.
        this.path = path.join(__dirname, 'products.json')
        this.archivoExiste()
    }

    // Método para verificar si el archivo existe. si no, lo crea con un array vacío.
    async archivoExiste() {
        try {
            // Verifica si el archivo existe.
            const existe = fs2.existsSync(this.path)
            if (!existe) {
                // Si el archivo no existe, lo crea con un array vacío.
                await fs.writeFile(this.path, '[]', 'utf-8')
                console.log(`Archivo creado exitosamente en la ruta ${this.path}`)
            }
        } catch (error) {
            // Captura y manejo de errores durante la creación del archivo.
            console.error(`Hubo un error al crear el archivo ${this.path}. El error fue ${error}`)
        }
    }

    // Método para leer el contenido de un archivo JSON.
    async leerArchivo(ruta) {
        try {
            // Lee y parsea el contenido del archivo JSON.
            return JSON.parse(await fs.readFile(ruta, 'utf-8'))
        } catch (error) {
            // Captura y manejo de errores durante la lectura del archivo.
            console.error(`Error al leer el archivo.`, error)
        }
    }

    // Método para escribir en un archivo JSON.
    async escribirArchivo(ruta, contenido) {
        try {
            // Escribe el contenido en el archivo JSON.
            await fs.writeFile(ruta, JSON.stringify(contenido), 'utf-8')
        } catch (error) {
            // Captura y manejo de errores durante la escritura en el archivo.
            console.error(`Error al escribir en el archivo.`, error)
        }

    }

    // Método para obtener todos los productos.
    async getProducts() {
        try {
            // Obtiene y muestra por consola todos los productos.
            let productos = await this.leerArchivo(this.path)
            //Descomentar la siguiente línea en caso de que quiera ver los productos cada vez que se invoque el método getProducts()
            //console.log(productos)
            return productos
        }
        catch (error) {
            // Captura y manejo de errores durante la obtención de productos.
            console.error(`Error al obtener los productos.`, error)
        }
    }

    // Método para agregar un nuevo producto.
    async addProducts(title, description, price, thumbnail, code, stock) {
        try {
            // Verifica si algún campo requerido está vacío.
            if (!title || !description || !price || !thumbnail || !code || !stock) {
                console.log(`El producto que intenta agregar no tiene todos los campos!`)
            } else {
                // Obtiene productos existentes.
                let products = await this.leerArchivo(this.path)

                // Verifica si el código del producto ya existe.
                if (!products.some((product) => product.code === code)) {
                    // Genera un nuevo ID basado en el último producto existente.
                    const id = products.length ? products[products.length - 1].id + 1 : 1
                    let newProduct = { title, description, price, thumbnail, code, stock, id }

                    // Agrega el nuevo producto y actualiza el archivo.
                    products.push(newProduct)
                    await this.escribirArchivo(this.path, products)
                    console.log(`El libro ${title} ha sido agregado correctamente`)

                } else {
                    console.log(`El código ${code} ya existe`)
                }
            }
        } catch (error) {
            // Captura y manejo de errores durante la adición de productos.
            console.error(`Error al agregar un producto.`, error)
        }
    }

    // Método para obtener un producto por su ID.
    async getProductById(id) {
        try {
            // Obtiene productos y busca un producto por ID.
            let productos = await this.leerArchivo(this.path)
            let busquedaPorId = productos.find((prod) => prod.id === id)

            if (busquedaPorId) {
                console.log(busquedaPorId)
            } else {
                console.log(`El producto con el id: ${id} no se ha encontrado.`)
            }
        }
        catch (error) {
            // Captura y manejo de errores durante la obtención de un producto por ID.
            console.error(`Error al obtener el producto por ID.`, error)
        }
    }

    // Método para actualizar los campos de un producto por su ID.
    async updateProduct(id, camposActualizados) {
        try {
            // Obtener la lista actual de productos.
            let productos = await this.leerArchivo(this.path)

            //Uso findIndex para saber la posición del producto buscado, si devuelve -1 no existe
            let productoIndex = productos.findIndex((prod) => prod.id === id)

            if (productoIndex !== -1) {
                // Copiar el producto encontrado para realizar modificaciones.
                let productoModificado = { ...productos[productoIndex] }

                // Actualizar los campos del producto con los proporcionados.
                Object.assign(productoModificado, camposActualizados)

                // Mostrar el producto modificado en la consola.
                console.log(`El producto con id ${id} ha sido actualizado. `)
                console.log(productoModificado)

                // Reemplazar el producto original con el modificado en la lista de productos.
                productos[productoIndex] = productoModificado

                // Escribir la lista actualizada de productos en el archivo.
                await this.escribirArchivo(this.path, productos)
            } else {
                console.log(`El producto con id: ${id} no ha sido encontrado`)
            }
        }
        catch (error) {
            // Captura y manejo de errores durante la actualización del producto.
            console.error(`Error al actualizar el producto.`, error)
        }
    }

    // Método para eliminar un producto por su ID.
    async deleteProduct(id) {
        try {
            // Obtener la lista actual de productos.
            let productos = await this.leerArchivo(this.path)

            // Filtrar los productos para excluir el que tiene el ID proporcionado.
            let productosReducido = productos.filter((prod) => prod.id !== id)

            // Mostrar un mensaje indicando que el producto ha sido eliminado o no se encontraba en la base de datos.
            console.log(`El producto con id ${id} ha sido eliminado o ya no se encontraba en la base de datos.`)

            // Escribir la lista actualizada de productos en el archivo.
            await this.escribirArchivo(this.path, productosReducido)
        }
        catch (error) {
            // Captura y manejo de errores durante la eliminación del producto.
            console.error(`Error al eliminar el producto.`, error)
        }
    }
}

// Función que realiza pruebas y operaciones con la clase ProductManager.
async function ejecutar() {
    // Instancia de la clase ProductManager para gestionar productos.
    const productos = new ProductManager()

    try {
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

    } catch (error) {
        // Captura y manejo de errores durante la ejecución de pruebas y operaciones.
        console.error(`Error en ejecutar:`, error)
    }
}

//ejecutar()

// Exportación de la clase ProductManager y la función ejecutar para su uso en otros módulos.
module.exports = { ProductManager, ejecutar }