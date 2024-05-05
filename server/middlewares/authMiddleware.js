import JWT from 'jsonwebtoken';
import userModel from '#models/userModel.js';

// Token protected route
export const requireSignIn = async (req, res, next) => {
    try {
        // Make sure that request headers has token key and not authorization 
        const decode = JWT.verify(req.headers.token, process.env.JWT_KEY);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error)
        res.status(501).json({
            success: false,
            message: "Error in requireSignIn",
            error
        })
    }
}

// Admin access
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);

        if (user.role !== 1) {
            return res.status(401).json({
                success: false,
                message: "UnAuthorized User"
            })
        } else next();
    } catch (error) {
        console.log("error in isAdmin", error)
        res.status(501).json({
            success: false,
            message: "Error in isAdmin",
            error
        })
    }
}