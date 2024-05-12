import { Router } from 'express';
import {
    registerController,
    loginController,
    testController,
    resetPasswordController
} from '#controllers/authController.js'
import { requireSignIn, isAdmin } from '#middlewares/authMiddleware.js';

//Router instance
const router = Router();

//routes

// REGISTER || POST
router.post('/register', registerController);

// LOGIN || POST
router.post('/login', loginController)

// Password Reset
router.post('/reset-password', resetPasswordController)

// Protected Route
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })
})

// test || GET
router.get('/test', requireSignIn, isAdmin, testController)
export default router;