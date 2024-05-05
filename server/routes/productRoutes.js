import { 
    createProductController, 
    deleteProductController, 
    getAllProductsController, 
    getRequestedProductController, 
    getRequestedProductImageController, 
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

// Get image of requested product
router.get('/get-image/:pid', getRequestedProductImageController)

// Update Requested Product
router.put('/update-product/:id', requireSignIn, isAdmin, formidable(), updateProductController);

// Delete Product
router.delete('/delete-product/:id', requireSignIn, isAdmin, deleteProductController)

export default router;