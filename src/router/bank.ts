import { Router } from "express";
import authenticate from "../middleware/auth";
import { createBank, getBanks, updateBank, deleteBank } from "../controller/bank";

const router = Router();


router.post("/", authenticate, createBank);
router.get("/", getBanks);
router.put("/:id", authenticate, updateBank);
router.delete("/:id", authenticate, deleteBank);

export default router;