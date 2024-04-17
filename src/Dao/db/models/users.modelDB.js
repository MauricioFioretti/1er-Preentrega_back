import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        cartId: {
            type: String,
            unique: true,
            required: true
        },
        role: {
            type: String,
            default: 'User'
        },
        age: {
            type: Number
        }
    },
    {
        strict:false
    }
)

export const User = mongoose.model('users', UserSchema)