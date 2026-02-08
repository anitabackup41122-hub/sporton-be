"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const bank_1 = require("../controller/bank");
const router = (0, express_1.Router)();
router.post("/", auth_1.default, bank_1.createBank);
router.get("/", bank_1.getBanks);
router.put("/:id", auth_1.default, bank_1.updateBank);
router.delete("/:id", auth_1.default, bank_1.deleteBank);
exports.default = router;
