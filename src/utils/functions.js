//Notemos que la función admite cualquier string, pero si el número es negativo o decimal, el caracter '-', '.' y ',' hace que retorne false, por lo que solo admite naturales y el 0. Luego el 0 tomado en un if es false, por lo que sirve para números naturales como se pretendía.
//Esta función fue creada ya que los id que necesito, tienen que ser solo números. Y el problema es que si yo parseo 2f354df por ejemplo, lo toma como el número 2 y eso está mal. Además si pongo números con punto también me los transforma en enteros. 

import { CartsService } from "../services/carts.service.js"
import { ProductsService } from "../services/products.service.js"

const productsService = new ProductsService()
const cartsService = new CartsService()

export function soloNumero(num) {
    for (let i of String(num)) {
        if (isNaN(parseInt(i))) {
            return false
        }
    }
    return parseInt(num)
}

export function unoMenosUno(num) {
    if (num == -1 || num == 1) {
        return parseInt(num)
    }
    return false
}

export function cantidadStock(productos, cid) {
    let acumulador = 0
    let productosStock = { conStock: [], sinStock: [] }

    productos.forEach(async (element) => {
        if (element.product.stock > element.quantity) {
            //Agrega los productos que tienen stock a un objeto para luego procesar el ticket
            productosStock.conStock.push(element)

            //Acumula el total de la compra de los productos que si tienen suficiente stock
            acumulador += element.priceTot

            //Actualizamos el stock en la db 
            let newStock = element.product.stock - element.quantity
            await productsService.updateProductService(element.product._id, { stock: newStock })

            //Eliminar los productos del carrito del usuario 
            await cartsService.deleteProductFromCart(cid, element.product._id)
        } else {
            productosStock.sinStock.push(element)
        }
    })

    productosStock.acumulador = acumulador

    return productosStock
}