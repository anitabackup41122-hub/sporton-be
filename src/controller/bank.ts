import { Request, Response } from "express";
import Bank from "../database/model/bank";

export const createBank = async (req: Request, res: Response): Promise<void> => {
    try{
        const bank = new Bank(req.body);
        await bank.save();
        res.status(201).json(bank);
    } catch (error) {
        console.error("Error creating bank:", error);
        res.status(500).json({ message: "Error Occurred:", error});
    }
};

export const getBanks = async (req: Request, res: Response): Promise<void> => {
    try {
        const banks = await Bank.find().sort({ createdAt: -1 });
        res.status(200).json(banks);
    } catch (error) {
        console.error("Error fetching banks:", error);
        res.status(500).json({ message: "Error Occurred:", error});
    }
};

export const updateBank = async (req: Request, res: Response): Promise<void> => {
    try {
        const bank = await Bank.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!bank) {
            res.status(400).json({ message: "Bank not found" });
            return; // Stop with return
        }
        res.status(200).json(bank);
    } catch (error) {
        console.error("Error updating bank:", error);
        res.status(500).json({ message: "Error Occurred:", error});
    }
};

export const deleteBank = async (req: Request, res: Response): Promise<void> => {
    try {
        const bank = await Bank.findByIdAndDelete(req.params.id);
        if (!bank) {
            res.status(400).json({ message: "Bank not found" });
            return; // Stop with return
        }
        res.status(200).json({ message: "Bank deleted successfully" });
    } catch (error) {
        console.error("Error deleting bank:", error);
        res.status(500).json({ message: "Error Occurred:", error});
    }
}