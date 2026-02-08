"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploud_1 = __importDefault(require("../middleware/uploud"));
const auth_1 = __importDefault(require("../middleware/auth"));
const transaction_1 = require("../controller/transaction");
const router = (0, express_1.Router)();
const middlewareUpload = (0, uploud_1.default)("data/transaction");
router.post("/", middlewareUpload.single("paymentProof"), transaction_1.createTransaction);
router.get("/", auth_1.default, transaction_1.getTransactions);
router.get("/:id", transaction_1.getTransactionById);
router.put("/:id", auth_1.default, transaction_1.updateTransaction);
exports.default = router;
