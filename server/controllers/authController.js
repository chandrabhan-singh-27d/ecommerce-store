import userModel from "#models/userModel.js";
import { hashPassword } from "#utils/authUtils.js";

export const registerController = async (req, res) => {
    try {
        const {name, email, password, phone, address } = req.body;

        // validations
        if(!name) {
            return res.status(422).json({
                error: 'Name is required'
            })
        }
        if(!email) {
            return res.status(422).json({
                error: 'Email is required'
            })
        }
        if(!password) {
            return res.status(422).json({
                error: 'Password is required'
            })
        }
        if(!phone) {
            return res.status(422).json({
                error: 'Phone number is required'
            })
        }
        if(!address) {
            return res.status(422).json({
                error: 'Address is required'
            })
        }

        // check existing user
        const existingUser = await userModel.findOne({email});

        if(existingUser) {
            return res.status(200).json({
                success: true,
                message: 'User already registered, please login'
            })
        }

        // register new user
        const hashedPassword = await hashPassword(password);

        const user = new userModel({name, email, password:hashedPassword, phone, address}).save();
        
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user
        })

    } catch (error) {
        console.log('error in register controller', error);
        res.status(500).json({
            success: false,
            message: "Error in registration",
            error
        })
    }
}