"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const product_1 = __importDefault(require("../database/model/product"));
const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        if (req.file) {
            productData.imageUrl = req.file.path;
        }
        const newProduct = new product_1.default(productData);
        await newProduct.save();
        res.status(201).json(newProduct);
    }
    catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Error Occurred:", error });
    }
};
exports.createProduct = createProduct;
const getProducts = async (req, res) => {
    try {
        const products = await product_1.default.find().populate("category").sort({ createdAt: -1 });
        res.status(200).json(products);
    }
    catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Error Occurred:", error });
    }
};
exports.getProducts = getProducts;
const getProductById = async (req, res) => {
    try {
        const product = await product_1.default.findById(req.params.id).populate("category");
        if (!product) {
            res.status(400).json({ message: "Product not found" });
            return; // Stop with return
        }
        res.status(200).json(product);
    }
    catch (error) {
        console.error("Error fetching product by ID:", error);
        res.status(500).json({ message: "Error Occurred:", error });
    }
};
exports.getProductById = getProductById;
const updateProduct = async (req, res) => {
    try {
        const body = req.body;
        if (req.file) {
            body.imageUrl = req.file.path;
        }
        const product = await product_1.default.findByIdAndUpdate(req.params.id, body, { new: true });
        if (!product) {
            res.status(400).json({ message: "Product not found" });
            return; // Stop with return
        }
        res.status(200).json(product);
    }
    catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Error Occurred:", error });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const product = await product_1.default.findByIdAndDelete(req.params.id);
        if (!product) {
            res.status(400).json({ message: "Product not found" });
            return; // Stop with return
        }
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Error Occurred:", error });
    }
};
exports.deleteProduct = deleteProduct;
