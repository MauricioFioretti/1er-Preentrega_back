import { Cart } from "./cart.modelDB.js"

export class CartsManager {

    // Método para añadir un carrito nuevo a la db.
    async addCart(solicitud) {
        try {
            await Cart.create(solicitud)
        }
        catch (error) {
            // Captura y manejo de errores durante la adición de carritos.
            return { success: false, message: `Error al agregar el carrito`, error: error.message }
        }
    }

    // Método para obtener un carrito.
    async getCart() {
        let carritos = await Cart.find()
        return carritos
    }

    // Método para añadir un producto al carrito según el id del carrito y del producto.
    async addProductsToCart(cid, pid) {
        try {
            //Leemos el archivo con los productos para luego buscar cada producto con find. Verificamos el stock de dicho producto
            let products = await this.leerArchivo(this.path2)
            let prodIndexVerificaStock = products.findIndex(prod => prod.id === pid)

            //Verificar si hay stock del producto
            if (prodIndexVerificaStock === -1 || products[prodIndexVerificaStock].stock === 0) {
                throw new Error(`No se puede agregar el producto con id ${pid} ya que no hay mas stock.`)
            }

            //Reducir el stock, ya que si o si se va a disminuir y actualizar stock asi no hay problemas de asincronismo. 
            products[prodIndexVerificaStock].stock--
            await this.escribirArchivo(this.path2, products)

            // Obtiene todos los carritos del archivo de persistencia. Buscamos la posición del carrito coincidente con cid y hacemos copia del mismo
            let carts = await this.leerArchivo(this.path)
            let cartIndex = carts.findIndex((cart) => cart.id === cid)
            let carritoAModificar = { ...carts[cartIndex] }

            //Buscamos el producto con el pid proporcionado, en este caso no necesariamente existe.
            let productoEncontradoIndex = carritoAModificar.products.findIndex(prod => prod.id === pid)

            if (productoEncontradoIndex !== -1) {
                carritoAModificar.products[productoEncontradoIndex].quantity++
            } else {
                carritoAModificar.products.push({ "id": pid, "quantity": 1 })
            }

            // Reemplazar el carrito original con el modificado en la lista de carritos.
            carts[cartIndex] = carritoAModificar

            // Escribir la lista actualizada de carritos en el archivo.
            await this.escribirArchivo(this.path, carts)

            return {
                success: true,
                message: `El producto con id ${pid} ${productoEncontradoIndex !== -1 ? 'ya existía y se aumentó la cantidad' : 'se agregó correctamente'}.`,
                data: carritoAModificar.products
            }
        } catch (error) {
            // Captura y manejo de errores durante la obtención de un carrito por ID.
            return { success: false, message: `Error al obtener el producto por ID.`, error: error.message }
        }
    }
}

// Exportación de la clase CartsManager para su uso en otros módulos.
export default { CartsManager }
