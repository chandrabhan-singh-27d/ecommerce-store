import categoryModel from "#root/models/categoryModel.js";
import slugify from 'slugify'
import { nanoid } from "nanoid";


export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(422).send({
                message: "Name is required"
            })
        }

        const existingCategory = await categoryModel.findOne({ name });

        if (existingCategory) {
            return res.status(409).send({
                success: false,
                message: "Category already exists"
            })
        }

        const category = await new categoryModel({
            uID: nanoid(),
            name,
            slug: slugify(name)
        }).save()

        const savedCategory = await categoryModel.findOne({ uID: category.uID }).select("uID name slug -_id");
        return res.status(201).send({
            success: true,
            message: "New category created",
            savedCategory
        })
    } catch (error) {
        console.log(`error in creating category:: ${error} `)
        res.status(500).send({
            success: false,
            message: "Error in creating category",
            error
        })
    }
};

export const updateCategoryController = async (req, res) => {
    try {

        const { name } = req.body;
        const { uID } = req.params;

        const category = await categoryModel.findOneAndUpdate(
            {
                uID: uID
            },
            {
                name,
                slug: slugify(name)

            },
            {
                new: true
            }
        );

        res.status(200).send({
            success: true,
            message: `Category::${category.name} updated successfully`,
            category
        })
    } catch (error) {
        console.log(`Error in updating category:: ${error}`);
        res.status(500).send({
            success: false,
            message: "Error in updating category",
            error
        })
    }
};

export const getAllCategoriesController = async (req, res) => {
    try {
        const categories = await categoryModel.find({}).select("uID name slug -_id");

        res.status(200).send({
            success: true,
            message: "All categories list",
            categories
        })
    } catch (error) {
        console.log(`Error in getting all categories:: ${error}`);
        res.status(500).send({
            success: false,
            message: "Error in getting all categories",
            error
        });
    }
}

export const getSingleCategoryController = async (req, res) => {
    try {
        const { slug } = req.params;

        const filteredCategory = await categoryModel.findOne({ slug: slug }).select("uID name slug -_id");

        res.status(200).send({
            success: true,
            message: "Requested category",
            filteredCategory
        })
    } catch (error) {
        console.log(`Error in getting requested category:: ${error}`);
        res.status(500).send({
            success: false,
            message: "Error in getting requested category",
            error
        })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { uID } = req.params

        const deletedCategory = await categoryModel.findOneAndDelete({ uID }).select("uID name slug -_id");

        res.status(200).send({
            success: true,
            message: `Category::${deletedCategory.name} is deleted`,
            deletedCategory
        })
    } catch (error) {
        console.log(`Error in deleting category:: ${error}`);
        res.status(500).send({
            success: false,
            message: "Error in deleting requested category",
            error
        })
    }
}