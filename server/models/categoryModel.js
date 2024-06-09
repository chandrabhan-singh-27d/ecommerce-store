import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    uID: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        lowercase: true
    }
});

export default model('Category', categorySchema);