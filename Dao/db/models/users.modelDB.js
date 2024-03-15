import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            required: true
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
        tel: {
            type: Number
        }
    },
    {
        strict:false
    }
)

export const User = mongoose.model('users', UserSchema)