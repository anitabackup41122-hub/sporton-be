"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./database/server"));
const path_1 = __importDefault(require("path"));
const auth_1 = __importDefault(require("./router/auth"));
const category_1 = __importDefault(require("./router/category"));
const product_1 = __importDefault(require("./router/product"));
const transaction_1 = __importDefault(require("./router/transaction"));
const bank_1 = __importDefault(require("./router/bank"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/data", express_1.default.static(path_1.default.join(__dirname, "../data")));
app.get("/", (req, res) => {
    res.send("No ERROR Banzai");
});
app.use("/api/auth", auth_1.default);
app.use("/api/categories", category_1.default);
app.use("/api/products", product_1.default);
app.use("/api/banks", bank_1.default);
app.use("/api/transactions", transaction_1.default);
async function startServer() {
    await (0, server_1.default)();
    app.listen(process.env.PORT, () => {
        console.log(`Running on port ${process.env.PORT}`);
    });
}
startServer().catch(console.error);
