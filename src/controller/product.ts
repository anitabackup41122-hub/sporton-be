import { Request, Response } from "express";
import Product from "../database/model/product";

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const productData = req.body;
        if (req.file) {
            productData.imageUrl  = req.file.path;
        } 
        const newProduct = new Product(productData);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Error Occurred:", error});
    }
};

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await Product.find().populate("category").sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Error Occurred:", error});
    }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await Product.findById(req.params.id).populate("category");
        if (!product) {
            res.status(400).json({ message: "Product not found" });
            return; // Stop with return
        }
        res.status(200).json(product); 
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        res.status(500).json({ message: "Error Occurred:", error});
    }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body;
        if (req.file) {
            body.imageUrl  = req.file.path;
        }
        const product = await Product.findByIdAndUpdate(req.params.id, body, { new: true });
        if (!product) {
            res.status(400).json({ message: "Product not found" });
            return; // Stop with return
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Error Occurred:", error});
    }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            res.status(400).json({ message: "Product not found" });
            return; // Stop with return
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Error Occurred:", error});
    }
}