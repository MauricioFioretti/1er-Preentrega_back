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
            enum: ["User", "Admin", "Premium"],
            default: 'User'
        },
        age: {
            type: Number
        }, 
        lastLogin: {
            type: String,
            default: new Date()
        }
    },
    {
        strict: false
    }
)

export const User = mongoose.model('users', UserSchema)