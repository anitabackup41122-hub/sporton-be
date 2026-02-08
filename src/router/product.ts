import { Router } from "express";
import uploud from "../middleware/uploud";
import authenticate from "../middleware/auth";
import { createProduct, getProducts, updateProduct, deleteProduct } from "../controller/product";

const router = Router();

const middlewareUpload = uploud("data/product")

router.post("/", middlewareUpload.single("image"), authenticate, createProduct);
router.get("/", getProducts);
router.put("/:id", middlewareUpload.single("image"), authenticate, updateProduct);
router.delete("/:id", authenticate, deleteProduct);

export default router;