"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTransaction = exports.getTransactionById = exports.getTransactions = exports.createTransaction = void 0;
const transaction_1 = __importDefault(require("../database/model/transaction"));
const product_1 = __importDefault(require("../database/model/product"));
const createTransaction = async (req, res) => {
    try {
        const body = req.body;
        if (req.file) {
            body.paymentProof = req.file.path;
        }
        else {
            res.status(400).json({ message: "Payment proof is required" });
            return;
        }
        if (typeof body.purchasedItems === "string") {
            try {
                body.purchasedItems = JSON.parse(body.purchasedItems);
            }
            catch (error) {
                console.error("Error parsing products:", error);
                res.status(400).json({ message: "Invalid products format" });
                return;
            }
        }
        body.status = "pending";
        const transaction = new transaction_1.default(body);
        await transaction.save();
        res.status(201).json(transaction);
    }
    catch (error) {
        console.error("Error creating transaction:", error);
        res.status(500).json({ message: "Error Occurred:", error });
    }
};
exports.createTransaction = createTransaction;
const getTransactions = async (req, res) => {
    try {
        const transactions = await transaction_1.default.find().populate("purchasedItems.productId").sort({ createdAt: -1 });
        res.status(200).json(transactions);
    }
    catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ message: "Error Occurred:", error });
    }
};
exports.getTransactions = getTransactions;
const getTransactionById = async (req, res) => {
    try {
        const transaction = await transaction_1.default.findById(req.params.id).populate("purchasedItems.productId");
        if (!transaction) {
            res.status(400).json({ message: "Transaction not found" });
            return; // Stop with return
        }
        res.status(200).json(transaction);
    }
    catch (error) {
        console.error("Error fetching transaction by ID:", error);
        res.status(500).json({ message: "Error Occurred:", error });
    }
};
exports.getTransactionById = getTransactionById;
const updateTransaction = async (req, res) => {
    try {
        const body = req.body.status;
        const transaction = await transaction_1.default.findByIdAndUpdate(req.params.id, { status: body }, { new: true });
        if (!transaction) {
            res.status(400).json({ message: "Transaction not found" });
            return; // Stop with return
        }
        if (body.status === "paid" && transaction.status !== "paid") {
            for (const item of transaction.purchasedItems) {
                await product_1.default.findByIdAndUpdate(item.productId, {
                    $inc: { stock: -item.qty },
                });
            }
        }
        const transactionUpdated = await transaction_1.default.findByIdAndUpdate(req.params.id, body, { new: true });
        res.status(200).json(transactionUpdated);
    }
    catch (error) {
        console.error("Error updating transaction:", error);
        res.status(500).json({ message: "Error Occurred:", error });
    }
};
exports.updateTransaction = updateTransaction;
