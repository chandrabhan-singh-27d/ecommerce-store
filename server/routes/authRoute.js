import express from 'express';
import {registerController} from '#controllers/authController.js'

//Router instance
const router = express.Router();

//routes

// REGISTER || POST
router.post('/register', registerController);

export default router;