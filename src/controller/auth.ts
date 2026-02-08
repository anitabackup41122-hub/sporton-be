import { Request, Response } from "express";
import dotenv from "dotenv";
import User from "../database/model/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();

const secret = process.env.JWT_SECRET;
if (!secret) {
  console.error("JWT Secret Not Found Dummy");
  process.exit(1);
}

export const initiateAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, name } = req.body;
        
        const count = await User.countDocuments({});
        if (count > 0) {
            res.status(400).json({
                message:
                "We can only have 1 admin user, if you want to create new admin user, please delete the user manually from the database",
            });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newAdmin = new User({
            email,
            password: hashedPassword,
            name,
        });

        await newAdmin.save();
        res.status(201).json({ message: "Admin user created successfully" });    
    
    } catch (error) {
        console.error("Error initiating admin:", error);
        res.status(500).json({ message: "Error Occurred:", error});
    }
}

export const signIn = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({ message: "Invalid email or password" });
            return;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid email or password" });
            return;
        }
        const token = jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: "1d" });
        res.status(200).json({ token, user: { id: user._id, email: user.email, name: user.name } });
    } catch (error) {
        console.error("Error signing in:", error);
        res.status(500).json({ message: "Error Occurred:", error});
    }
}