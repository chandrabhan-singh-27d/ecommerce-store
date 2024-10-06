import { 
    createProductController, 
    deleteProductController, 
    getAllProductsController, 
    getRequestedProductController, 
    updateProductController 
} from "#root/controllers/productsController.js";
import { isAdmin, requireSignIn } from "#root/middlewares/authMiddleware.js";
import { Router } from "express";
import formidable from 'express-formidable'

const router = Router();

// Create/Upload a product
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

// Get All Products
router.get('/products', getAllProductsController)

// Get Requested Product
router.get('/get-product/:slug', getRequestedProductController)

// Update Requested Product
router.put('/update-product/:uID', requireSignIn, isAdmin, formidable(), updateProductController);

// Delete Product
router.delete('/delete-product/:uID', requireSignIn, isAdmin, deleteProductController)

export default router;