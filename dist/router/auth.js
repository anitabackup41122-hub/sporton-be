"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controller/auth");
const router = (0, express_1.Router)();
router.post("/signin", auth_1.signIn);
router.post("/initiate-admin", auth_1.initiateAdmin);
exports.default = router;
