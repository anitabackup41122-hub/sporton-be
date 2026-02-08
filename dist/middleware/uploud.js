"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploud = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const cloudinary_1 = require("cloudinary");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.NAME_CLOUDINARY,
    api_key: process.env.API_KEY_CLOUDINARY,
    api_secret: process.env.API_SECRET_CLOUDINARY,
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/") || file.mimetype === "application/pdf") {
        cb(null, true);
    }
    else {
        cb(new Error("Only images and PDF are allowed"));
    }
};
const localStorageSetup = (pathname) => {
    if (!fs_1.default.existsSync(pathname)) {
        fs_1.default.mkdirSync(pathname, { recursive: true });
    }
    return multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, pathname);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + path_1.default.extname(file.originalname));
        },
    });
};
const cloudinaryStorageSetup = (folder) => {
    return new multer_storage_cloudinary_1.CloudinaryStorage({
        cloudinary: cloudinary_1.v2,
        params: async (req, file) => {
            return {
                folder: `sporton/${folder}`,
                resource_type: "image",
                public_id: `${Date.now()}-${Math.round(Math.random() * 1e9)}`,
            };
        },
    });
};
const uploud = (pathname) => {
    const storageType = process.env.STORAGE_TYPE || "local";
    let storage;
    if (storageType === "cloudinary") {
        storage = cloudinaryStorageSetup(pathname);
    }
    else {
        storage = localStorageSetup(pathname);
    }
    return (0, multer_1.default)({
        storage,
        fileFilter,
    });
};
exports.uploud = uploud;
exports.default = exports.uploud;
