import productModel from "#root/models/productModel.js";
import categoryModel from "#root/models/categoryModel.js";
import slugify from 'slugify'
import { readFileSync } from 'fs'
import { nanoid } from "nanoid";

export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity } = req.fields;
        const { image } = req.files;

        // Validtions
        switch (true) {
            case !name:
                return res.status(500).send({
                    success: false,
                    message: "Name is required",
                })
            case !description:
                return res.status(500).send({
                    success: false,
                    message: "Description is required",
                })
            case !price:
                return res.status(500).send({
                    success: false,
                    message: "Price is required",
                })
            case !category:
                return res.status(500).send({
                    success: false,
                    message: "Category is required",
                })
            case !quantity:
                return res.status(500).send({
                    success: false,
                    message: "Quantity is required",
                })
            case (!image || image.size > 1048576):
                return res.status(500).send({
                    success: false,
                    message: "Image is required and should be less than 1mb",
                })

            default:
                break;
        }

        const searchedCategory = await categoryModel.findOne({ uID: category }).select('_id');

        // Check for existing product
        const existingProduct = await productModel.findOne({ name });

        if (existingProduct) {
            return res.status(409).send({
                success: false,
                message: "Product already exists"
            })
        }

        const product = new productModel({
            ...req.fields,
            uID: nanoid(),
            slug: slugify(name),
            category: searchedCategory
        });

        if (image) {
            product.image.data = readFileSync(image.path);
            product.image.contentType = image.type;
        }

        await product.save();

        res.status(201).send({
            success: true,
            message: "Product created successfully",
            product
        })
    } catch (error) {
        console.log(`Error in creating product:: ${error}`);
        res.status(500).send({
            success: false,
            message: "Error in creating product",
            error
        })
    }
}

export const getAllProductsController = async (req, res) => {
    try {
        const { limit } = req.params;
        const products = await productModel.find({})
            .populate({
                path: 'category',
                select: 'name uID -_id'
            })
            .select("uID name slug description price quantity shipping image -_id")
            .limit(limit || 10)
            .sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            totalCount: products.length,
            message: "Recent 10 products fetched successfully",
            products
        })
    } catch (error) {
        console.log(`Error in fetching all the products:: ${error}`)
        res.status(500).send({
            success: false,
            message: "Error in getting all the products",
            error
        })
    }
}

export const getRequestedProductController = async (req, res) => {
    try {
        const { slug } = req.params;

        const filteredProduct = await productModel.findOne({ slug: slug })
            .populate({
                path: 'category',
                select: 'name uID -_id'
            })
            .select("uID name description price quantity shipping image -_id");

        res.status(200).send({
            success: true,
            message: "Requested product fetched successfully",
            filteredProduct
        })
    } catch (error) {
        console.log(`Error in fetching the requested product:: ${error}`);
        res.status(500).send({
            success: false,
            message: "Error in getting the requested product",
            error
        })
    }
}

export const updateProductController = async (req, res) => {
    try {
        const { uID } = req.params;
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { image } = req.files;

        // Validtions
        switch (true) {
            case !name:
                return res.status(500).send({
                    success: false,
                    message: "Name is required",
                })
            case !description:
                return res.status(500).send({
                    success: false,
                    message: "Description is required",
                })
            case !price:
                return res.status(500).send({
                    success: false,
                    message: "Price is required",
                })
            case !category:
                return res.status(500).send({
                    success: false,
                    message: "Category is required",
                })
            case !quantity:
                return res.status(500).send({
                    success: false,
                    message: "Quantity is required",
                })
            case (!image || image.size > 1048576):
                return res.status(500).send({
                    success: false,
                    message: "Image is required and should be less than 1mb",
                })

            default:
                break;
        }

        const searchedCategory = await categoryModel.findOne({ uID: category }).select('_id');

        const updatedProduct = await productModel.findOneAndUpdate(
            {
                uID: uID
            },
            {
                ...req.fields,
                slug: slugify(name),
                category: searchedCategory
            },
            {
                new: true
            }
        ).select("-image").populate({
            path: 'category',
            select: 'name uID -_id'
        });

        if (image) {
            updatedProduct.image.data = readFileSync(image.path);
            updatedProduct.image.contentType = image.type;
        }
        await updatedProduct.save();

        const requestedProduct = await productModel.findOne({uID: uID}).select("-image").populate({
            path: 'category',
            select: "name uID -_id"
        })
        res.status(200).send({
            success: true,
            message: "Requested prooduct updated successfully",
            requestedProduct
        })
    } catch (error) {
        console.log(`Error in updating product:: ${error}`);
        res.status(500).send({
            success: false,
            message: "Error in updating the requested product",
            error
        })
    }
}

export const deleteProductController = async (req, res) => {
    try {
        const { uID } = req.params;

        const deletedProduct = await productModel.findOneAndDelete({uID}).select("-image").populate('category');

        res.status(200).send({
            success: true,
            message: "Requested Product deleted successfully",
            deletedProduct
        })
    } catch (error) {
        console.log(`Error in deleting product:: ${error}`);
        res.status(500).send({
            success: false,
            message: "Error in deleting requested product",
            error
        })
    }
}