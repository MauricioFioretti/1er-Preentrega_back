import mongoose from "mongoose"

const CartsSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],
        default: []
    },
    cartId: {
        type: String,
        unique: true,
        required: true
    }
})

export const Cart = mongoose.model('carts', CartsSchema)