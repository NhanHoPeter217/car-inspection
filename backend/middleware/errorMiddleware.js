"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
// Error handling middleware
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    // Log the error (optional: add logging framework)
    console.error(`[Error] ${statusCode}: ${message}`);
    res.status(statusCode).json({
        error: {
            message,
            statusCode,
        },
    });
};
exports.errorHandler = errorHandler;
