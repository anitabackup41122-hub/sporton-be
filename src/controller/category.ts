import { Request, Response } from "express";
import category from "../database/model/category";

export const createCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body;
        if (req.file) {
            body.imageUrl  = req.file.path;
        }
        const newCategory = new category(body);
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ message: "Error Occurred:", error});
    }
}

export const getCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await category.find().sort({ createdAt: -1 });
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Error Occurred:", error});
    }
}

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
    try {
        const categoryFound = await category.findById(req.params.id);
        if (!categoryFound) {
            res.status(400).json({ message: "Category not found" });
            return; // Stop with return
        }
        res.status(200).json(categoryFound);
    } catch (error) {
        console.error("Error fetching category by ID:", error);
        res.status(500).json({ message: "Error Occurred:", error});
    }
}
export const updateCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body;
        if (req.file) {
            body.imageUrl  = req.file.path;
        }
        const categoryUpdated = await category.findByIdAndUpdate(req.params.id, body, { new: true });
        if (!categoryUpdated) {
            res.status(400).json({ message: "Category not found" });
            return; // Stop with return
        }
        res.status(200).json(categoryUpdated);
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ message: "Error Occurred:", error});
    }
}

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const categoryDeleted = await category.findByIdAndDelete(req.params.id);
        if (!categoryDeleted) {
            res.status(400).json({ message: "Category not found" });
            return; // Stop with return
        }
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ message: "Error Occurred:", error});
    }
}