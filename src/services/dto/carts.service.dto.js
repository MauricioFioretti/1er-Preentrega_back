export function cartServiceDTO(carrito) {
    //Agregamos las propiedades precio total y acomodamos category para que se vea bien sin guiones
    carrito.data.products.forEach(el => {
        el.priceTot = el.product.price * el.quantity
        el.product.category = el.product.category.replace(/-/g, ' ')
    })
    return carrito
}