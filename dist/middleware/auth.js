"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authenticate;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET;
if (!secret) {
    console.error("Atlas URI Not Found Dummy");
    process.exit(1);
}
function authenticate(req, res, next) {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        res.status(401).json({ message: "Authentication Required!" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: "Invalid Token" });
    }
}
;
