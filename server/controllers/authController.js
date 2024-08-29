import userModel from "#models/userModel.js";
import { comparePassword, hashPassword } from "#utils/authUtils.js";
import JWT from "jsonwebtoken";

const validateEntity = (entity, res, errorMsg) => {
    if (!entity) {
        return res.status(422).json({ error: errorMsg })
    }
    return;
}

// REGISTER USER || POST
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, securityQuestion } = req.body;

        // validations
        validateEntity(name, res, "Name is required");
        validateEntity(email, res, "email is required");
        validateEntity(password, res, "Password is required");
        validateEntity(phone, res, "Phone number is required");
        validateEntity(address, res, "Address is required");
        validateEntity(securityQuestion, res, "Security question is required")

        // check existing user
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(200).json({
                success: true,
                message: 'User already registered, please login'
            })
        }

        // register new user
        const hashedPassword = await hashPassword(password);

        const user = await new userModel({ name, email, password: hashedPassword, phone, address, securityQuestion }).save();

        // token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: '24h' });
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                name: user.name,
                email: user.email
            },
            token
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

// LOGIN USER || POST
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validation
        if (!email || !password) {
            return res.status(404).json({
                success: false,
                message: "Invalid email or password",
            })
        }

        //check/get user from db
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "email not registered"
            })
        }

        // compare password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).json({
                success: false,
                message: "Invalid Password"
            })
        }

        // token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: '10s' });

        res.status(200).json({
            success: true,
            message: "Login successfully",
            user: {
                name: user.name,
                email: user.email
            },
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in login",
            error
        })
    }

}

// Reset User Password || POST
export const resetPasswordController = async (req, res) => {
    try {
        const { email, newPassword, securityQuestion } = req.body;
        
        // validations
        validateEntity(email, res, "email is required");
        validateEntity(securityQuestion, res, "Security question is required");
        validateEntity(newPassword, res, "New Password is required");

        const user = await userModel.findOne({email, securityQuestion});

        if(!user) {
            return res.status(404).send({
                success: false,
                message: "Incorrect email or security answer",
            })
        }

        const hashedPassword = await hashPassword(newPassword);
        const updatedUser = await userModel.findByIdAndUpdate(user._id, {password: hashedPassword});

        // token
        const token = await JWT.sign({ _id: updatedUser._id }, process.env.JWT_KEY, { expiresIn: '24h' });
        
        res.status(200).send({
            success: true,
            message: "Password reset successfully",
            user: {
                name: updatedUser.name,
                email: updatedUser.email
            },
            token
        })

    } catch (error) {
        console.log(`Error in resseting the user password::${error}`);
        res.status(500).send({
            success: false,
            message: "Password reset failure",
            error
        })
    }
}

// test cntroller
export const testController = (req, res) => {
    res.send('Protected route')
}