import mongoose from "mongoose"

const ProductsSchema = new mongoose.Schema({
    title: {
        type: String, 
        unique: true,
        require: true
    },
    description: {
        type: String, 
        require: true
    },
    price: {
        type: Number, 
        require: true
    },
    code: {
        type: String, 
        unique: true,
        require: true
    },
    category: {
        type: String, 
        enum: ["OMA", "Ñandu"]
    },
    thumbnail: {
        type: [String],
        default: []     
    },
    stock: {
        type: Number, 
        default: 10
    },
    status: {
        type: Boolean,
        default: true
    }
})

export const Product = mongoose.model('products', ProductsSchema)