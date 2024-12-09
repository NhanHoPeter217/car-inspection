import { Request, Response, NextFunction } from "express";

// Define a custom error interface
interface AppError extends Error {
  statusCode?: number;
}

// Error handling middleware
export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
