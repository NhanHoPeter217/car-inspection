"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cars_1 = __importDefault(require("./routes/cars"));
const criteriaValue_1 = __importDefault(require("./routes/criteriaValue"));
const cors_1 = __importDefault(require("cors"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const PORT = process.env.APP_PORT || 3000;
const app = (0, express_1.default)();
// Enable CORS for all origins (or specify the allowed origin)
app.use((0, cors_1.default)()); // Allow cross-origin requests from any domain
app.use(express_1.default.json());
app.use("/cars", cars_1.default);
app.use("/criteriaValue", criteriaValue_1.default);
// Register error handling middleware
app.use(errorMiddleware_1.errorHandler);
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:${PORT}");
});
