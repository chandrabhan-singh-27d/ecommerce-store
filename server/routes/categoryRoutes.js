import {
        createCategoryController,
        deleteCategory,
        getAllCategoriesController,
        getSingleCategoryController,
        updateCategoryController
    } from '#root/controllers/categoryController.js';
import { isAdmin, requireSignIn } from '#root/middlewares/authMiddleware.js';
import { Router } from 'express';

// Router instance
const router = Router();

/* Routes */

// Create Category
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

// Update Category
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)

// Get all categories
router.get('/categories', getAllCategoriesController)
export default router;

// Get single category
router.get('/get-category/:slug', getSingleCategoryController)

// Delete categories
router.delete('/delete-category/:uID', requireSignIn, isAdmin, deleteCategory)
