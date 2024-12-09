import dotenv from "dotenv";
dotenv.config();

import express from "express";
import carRoutes from "./routes/cars";
import criteriaValueRoutes from "./routes/criteriaValue";
import cors from "cors";
import { errorHandler } from "./middleware/errorMiddleware";

const PORT = process.env.APP_PORT || 3000;

const app = express();

// Enable CORS for all origins (or specify the allowed origin)
app.use(cors()); // Allow cross-origin requests from any domain

app.use(express.json());

app.use("/cars", carRoutes);
app.use("/criteriaValue", criteriaValueRoutes);

// Register error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log("Server is running on http://localhost:${PORT}");
});
