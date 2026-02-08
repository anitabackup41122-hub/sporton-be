"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.initiateAdmin = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("../database/model/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const secret = process.env.JWT_SECRET;
if (!secret) {
    console.error("JWT Secret Not Found Dummy");
    process.exit(1);
}
const initiateAdmin = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const count = await user_1.default.countDocuments({});
        if (count > 0) {
            res.status(400).json({
                message: "We can only have 1 admin user, if you want to create new admin user, please delete the user manually from the database",
            });
            return;
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const newAdmin = new user_1.default({
            email,
            password: hashedPassword,
            name,
        });
        await newAdmin.save();
        res.status(201).json({ message: "Admin user created successfully" });
    }
    catch (error) {
        console.error("Error initiating admin:", error);
        res.status(500).json({ message: "Error Occurred:", error });
    }
};
exports.initiateAdmin = initiateAdmin;
const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await user_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid email or password" });
            return;
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid email or password" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, secret, { expiresIn: "1d" });
        res.status(200).json({ token, user: { id: user._id, email: user.email, name: user.name } });
    }
    catch (error) {
        console.error("Error signing in:", error);
        res.status(500).json({ message: "Error Occurred:", error });
    }
};
exports.signIn = signIn;
