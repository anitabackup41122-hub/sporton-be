"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBank = exports.updateBank = exports.getBanks = exports.createBank = void 0;
const bank_1 = __importDefault(require("../database/model/bank"));
const createBank = async (req, res) => {
    try {
        const bank = new bank_1.default(req.body);
        await bank.save();
        res.status(201).json(bank);
    }
    catch (error) {
        console.error("Error creating bank:", error);
        res.status(500).json({ message: "Error Occurred:", error });
    }
};
exports.createBank = createBank;
const getBanks = async (req, res) => {
    try {
        const banks = await bank_1.default.find().sort({ createdAt: -1 });
        res.status(200).json(banks);
    }
    catch (error) {
        console.error("Error fetching banks:", error);
        res.status(500).json({ message: "Error Occurred:", error });
    }
};
exports.getBanks = getBanks;
const updateBank = async (req, res) => {
    try {
        const bank = await bank_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!bank) {
            res.status(400).json({ message: "Bank not found" });
            return; // Stop with return
        }
        res.status(200).json(bank);
    }
    catch (error) {
        console.error("Error updating bank:", error);
        res.status(500).json({ message: "Error Occurred:", error });
    }
};
exports.updateBank = updateBank;
const deleteBank = async (req, res) => {
    try {
        const bank = await bank_1.default.findByIdAndDelete(req.params.id);
        if (!bank) {
            res.status(400).json({ message: "Bank not found" });
            return; // Stop with return
        }
        res.status(200).json({ message: "Bank deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting bank:", error);
        res.status(500).json({ message: "Error Occurred:", error });
    }
};
exports.deleteBank = deleteBank;
