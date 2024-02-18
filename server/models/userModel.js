import { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String, //as it requires country code
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {

    }

})

export default userSchema;