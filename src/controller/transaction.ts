import { Request, Response } from "express";
import Transaction from "../database/model/transaction";
import Product from "../database/model/product";

export const createTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body;
        if (req.file) {
            body.paymentProof   = req.file.path;
        } else {
            res.status(400).json({ message: "Payment proof is required" });
            return;
        }

        if (typeof body.purchasedItems  === "string") {
            try {
                body.purchasedItems = JSON.parse(body.purchasedItems);
            } catch (error) {
                console.error("Error parsing products:", error);
                res.status(400).json({ message: "Invalid products format" });
                return;
            }
        }

        body.status = "pending";

        const transaction = new Transaction(body);
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        console.error("Error creating transaction:", error);
        res.status(500).json({ message: "Error Occurred:", error});
    }
}

export const getTransactions = async (req: Request, res: Response): Promise<void> => {
    try {
        const transactions = await Transaction.find().populate("purchasedItems.productId").sort({ createdAt: -1 });
        res.status(200).json(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ message: "Error Occurred:", error});
    }
}

export const getTransactionById = async (req: Request, res: Response): Promise<void> => {
    try {
        const transaction = await Transaction.findById(req.params.id).populate("purchasedItems.productId");
        if (!transaction) {
            res.status(400).json({ message: "Transaction not found" });
            return; // Stop with return
        }
        res.status(200).json(transaction);
    } catch (error) {
        console.error("Error fetching transaction by ID:", error);
        res.status(500).json({ message: "Error Occurred:", error});
    }
}

export const updateTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body.status;
        const transaction = await Transaction.findByIdAndUpdate(req.params.id, { status: body }, { new: true });
        if (!transaction) {
            res.status(400).json({ message: "Transaction not found" });
            return; // Stop with return
        }
        
        if (body.status === "paid" && transaction.status !== "paid") {
            for (const item of transaction.purchasedItems) {
                await Product.findByIdAndUpdate(item.productId, {
                $inc: { stock: -item.qty },
                });
            }
        }

        const transactionUpdated = await Transaction.findByIdAndUpdate(req.params.id, body, { new: true });
        res.status(200).json(transactionUpdated);
    } catch (error) {
        console.error("Error updating transaction:", error);
        res.status(500).json({ message: "Error Occurred:", error});
    }
}