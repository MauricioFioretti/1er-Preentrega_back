import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

const CartsSchema = new mongoose.Schema({
    products: {
        type: [ProductSchema],
        default: []
    }
})

// const CartsSchema = new mongoose.Schema({
//     products: {
//         type: [String],
//         default: []
//     }
// })

export const Cart = mongoose.model('carts', CartsSchema)