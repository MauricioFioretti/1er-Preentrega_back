import mongoose from "mongoose"

const CartsSchema = new mongoose.Schema({
    products: {
        type: String,
        unique: true,
        require: true 
    }
})

export const Cart = mongoose.model('carts', CartsSchema)