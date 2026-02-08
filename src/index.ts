import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ConnAtlas from './database/server';
import path from "path";

import authRoutes from "./router/auth";
import categoryRoutes from "./router/category";
import productRoutes from "./router/product";
import transactionRoutes from "./router/transaction";
import bankRoutes from "./router/bank";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/data", express.static(path.join(__dirname, "../data")));

app.get("/", (req, res) => {
  res.send("No ERROR Banzai");
});


app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/banks", bankRoutes);
app.use("/api/transactions", transactionRoutes);


async function startServer() {
  await ConnAtlas();
  app.listen(process.env.PORT, () => {
    console.log(`Running on port ${process.env.PORT}`);
  });

}

startServer().catch(console.error);