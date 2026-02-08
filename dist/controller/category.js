"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getCategories = exports.createCategory = void 0;
const category_1 = __importDefault(require("../database/model/category"));
const createCategory = async (req, res) => {
    try {
        const body = req.body;
        if (req.file) {
            body.imageUrl = req.file.path;
        }
        const newCategory = new category_1.default(body);
        await newCategory.save();
        res.status(201).json(newCategory);
    }
    catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ message: "Error Occurred:", error });
    }
};
exports.createCategory = createCategory;
const getCategories = async (req, res) => {
    try {
        const categories = await category_1.default.find().sort({ createdAt: -1 });
        res.status(200).json(categories);
    }
    catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Error Occurred:", error });
    }
};
exports.getCategories = getCategories;
const getCategoryById = async (req, res) => {
    try {
        const categoryFound = await category_1.default.findById(req.params.id);
        if (!categoryFound) {
            res.status(400).json({ message: "Category not found" });
            return; // Stop with return
        }
        res.status(200).json(categoryFound);
    }
    catch (error) {
        console.error("Error fetching category by ID:", error);
        res.status(500).json({ message: "Error Occurred:", error });
    }
};
exports.getCategoryById = getCategoryById;
const updateCategory = async (req, res) => {
    try {
        const body = req.body;
        if (req.file) {
            body.imageUrl = req.file.path;
        }
        const categoryUpdated = await category_1.default.findByIdAndUpdate(req.params.id, body, { new: true });
        if (!categoryUpdated) {
            res.status(400).json({ message: "Category not found" });
            return; // Stop with return
        }
        res.status(200).json(categoryUpdated);
    }
    catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ message: "Error Occurred:", error });
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    try {
        const categoryDeleted = await category_1.default.findByIdAndDelete(req.params.id);
        if (!categoryDeleted) {
            res.status(400).json({ message: "Category not found" });
            return; // Stop with return
        }
        res.status(200).json({ message: "Category deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ message: "Error Occurred:", error });
    }
};
exports.deleteCategory = deleteCategory;
