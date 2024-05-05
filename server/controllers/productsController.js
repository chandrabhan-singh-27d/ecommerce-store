import productModel from "#root/models/productModel.js";
import slugify from 'slugify'
import { readFileSync } from 'fs'

export const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
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
            case (!image && image.size > 1000):
                return res.status(500).send({
                    success: false,
                    message: "Image is required and should be less than 1mb",
                })

            default:
                break;
        }

        const product = new productModel({ ...req.fields, slug: slugify(name) });

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
        const products = await productModel.find({})
            .populate('category')
            .select("-image")
            .limit(10)
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
            .populate('category')
            .select("-image");

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

export const getRequestedProductImageController = async (req, res) => {
    try {
        const { pid } = req.params;
        const filteredProduct = await productModel.findById(pid).select("image");

        if (filteredProduct.image?.data) {
            res.set("Content-Type", filteredProduct.image.contentType);
            return res.status(200).send(filteredProduct.image.data)
        }
        res.status(200).send({
            success: true,
            message: "Can't seem to find image for the requested product"
        });
    } catch (error) {
        console.log(`Error in getting image:: ${error}`);
        res.status(500).send({
            success: false,
            message: "Error in fetching the image of requested product",
            error
        })
    }
}

export const updateProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
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
            case (!image && image.size > 1000):
                return res.status(500).send({
                    success: false,
                    message: "Image is required and should be less than 1mb",
                })

            default:
                break;
        }
        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            {
                ...req.fields,
                slug: slugify(name)
            },
            {
                new: true
            }
        ).select("-image").populate('category');

        if (image) {
            updatedProduct.image.data = readFileSync(image.path);
            updatedProduct.image.contentType = image.type;
        }
        await updatedProduct.save();

        const requestedProduct = await productModel.findById(id).select("-image").populate('category')
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
        const { id } = req.params;

        const deletedProduct = await productModel.findByIdAndDelete(id).select("-image").populate('category');

        res.status(200).send({
            success: false,
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