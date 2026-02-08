import multer, { StorageEngine } from "multer";
import path from "path";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { Request } from "express";

cloudinary.config({
  cloud_name: process.env.NAME_CLOUDINARY,
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_SECRET_CLOUDINARY,
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images and PDF are allowed"));
  }
};

const localStorageSetup = (pathname: string): StorageEngine => {
  if (!fs.existsSync(pathname)) {
    fs.mkdirSync(pathname, { recursive: true });
  }

  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, pathname);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });
};

const cloudinaryStorageSetup = (folder: string): StorageEngine => {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      return {
        folder: `sporton/${folder}`,
        resource_type: "image",
        public_id: `${Date.now()}-${Math.round(Math.random() * 1e9)}`,
      };
    },
  });
};

export const uploud = (pathname: string) => {
  const storageType = process.env.STORAGE_TYPE || "local";

  let storage: StorageEngine;
  
  if (storageType === "cloudinary") {
    storage = cloudinaryStorageSetup(pathname);
  } else {
    storage = localStorageSetup(pathname);
  }

  return multer({
    storage,
    fileFilter,
  });
};

export default uploud;

