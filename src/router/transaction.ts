import { Router } from "express";
import uploud from "../middleware/uploud";
import authenticate from "../middleware/auth";
import { createTransaction, getTransactionById, getTransactions, updateTransaction } from "../controller/transaction";

const router = Router();
const middlewareUpload = uploud("data/transaction");

router.post("/checkout", middlewareUpload.single("paymentProof"), createTransaction);
router.get("/", authenticate, getTransactions);
router.get("/:id", getTransactionById);
router.put("/:id", authenticate, updateTransaction);

export default router;
