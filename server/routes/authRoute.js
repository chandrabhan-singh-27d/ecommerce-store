import { Router } from 'express';
import {registerController, loginController, testController} from '#controllers/authController.js'
import { requireSignIn, isAdmin } from '#middlewares/authMiddleware.js';

//Router instance
const router = Router();

//routes

// REGISTER || POST
router.post('/register', registerController);

// LOGIN || POST
router.post('/login', loginController)

// test || GET
router.get('/test',requireSignIn, isAdmin, testController)

// Protected Route
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ok: true})
})
export default router;