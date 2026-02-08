import { Router } from "express";
import uploud from "../middleware/uploud";
import authenticate from "../middleware/auth";
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from "../controller/category";

const router = Router();

const middlewareUpload = uploud("data/category")

router.post("/", middlewareUpload.single("image"), authenticate, createCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.put("/:id", middlewareUpload.single("image"), authenticate, updateCategory);
router.delete("/:id", authenticate, deleteCategory);

export default router;