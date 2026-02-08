"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploud_1 = __importDefault(require("../middleware/uploud"));
const auth_1 = __importDefault(require("../middleware/auth"));
const product_1 = require("../controller/product");
const router = (0, express_1.Router)();
const middlewareUpload = (0, uploud_1.default)("data/product");
router.post("/", middlewareUpload.single("image"), auth_1.default, product_1.createProduct);
router.get("/", product_1.getProducts);
router.put("/:id", middlewareUpload.single("image"), auth_1.default, product_1.updateProduct);
router.delete("/:id", auth_1.default, product_1.deleteProduct);
exports.default = router;
