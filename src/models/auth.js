import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    googleId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
    
});

export const User = mongoose.model('auth', userSchema);