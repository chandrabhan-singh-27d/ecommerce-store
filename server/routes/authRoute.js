import express, { Router } from 'express';
import {registerController, loginController, testController} from '#controllers/authController.js'
import { requireSignIn, isAdmin } from '#middlewares/authMiddleware.js';

//Router instance
const router = express.Router();

//routes

// REGISTER || POST
router.post('/register', registerController);

// LOGIN || POST
router.post('/login', loginController)

// test || GET
router.get('/test',requireSignIn, isAdmin, testController)


export default router;