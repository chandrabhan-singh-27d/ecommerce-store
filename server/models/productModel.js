import mongoose, { Schema, model } from "mongoose";

const productModel = new Schema({
    uID: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.ObjectId,
        ref: "Category",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String,
    },
    shipping: {
        type: Boolean,
    }
}, { timestamps: true });

export default model('Products', productModel)