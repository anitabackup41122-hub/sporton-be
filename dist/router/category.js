"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploud_1 = __importDefault(require("../middleware/uploud"));
const auth_1 = __importDefault(require("../middleware/auth"));
const category_1 = require("../controller/category");
const router = (0, express_1.Router)();
const middlewareUpload = (0, uploud_1.default)("data/category");
router.post("/", middlewareUpload.single("image"), auth_1.default, category_1.createCategory);
router.get("/", category_1.getCategories);
router.get("/:id", category_1.getCategoryById);
router.put("/:id", middlewareUpload.single("image"), auth_1.default, category_1.updateCategory);
router.delete("/:id", auth_1.default, category_1.deleteCategory);
exports.default = router;
