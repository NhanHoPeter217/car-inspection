import express, { NextFunction, Request, Response } from "express";
import { param } from "express-validator";
import Car from "../models/Car";
import Criteria_Value from "../models/Criteria_Value";
import { validateCriteriaUpdate, handleValidationErrors, validateCarName, validateCarId } from "../middleware/validationMiddleware";

const router = express.Router();

// GET /cars - Fetch all cars
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { sortBy = "status", order = "asc" } = req.query;
        
        const cars = await Car.findAll({
            order: [[sortBy as string, order as string]],
        });

        res.json(cars);
    } catch (error) {
        // res.status(500).json({ error: "Failed to fetch cars" });
        next({
            statusCode: 500,
            message: "Failed to fetch cars. Please try again later.",
        });
    }
});

// POST /cars - Add a new car
router.post(
    "/",
    validateCarName,
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { name } = req.body;

            // Validate input
            if (!name) {
                throw { statusCode: 400, message: "Car name is required." };
            }

            const car = await Car.create({ name });
            res.status(201).json(car);
        } catch (error) {
            // res.status(500).json({ error: "Failed to add car" });
            next(error); // pass error to middleware
        }
    }
);

// PUT /cars/:id/status - Update car status
router.put(
    "/:car_id/status",
    validateCarId,
    validateCriteriaUpdate,
    handleValidationErrors,
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { id } = req.params;

        try {
            const criteriaValue = await Criteria_Value.findAll({ where: { car_id: id } });

            if (!criteriaValue.length) {
                res.status(404).json({ error: "Car not found" });
            } else
            {
                const passed = criteriaValue.filter((c) => c.is_good).length;

                let status = 0;
                if (passed === criteriaValue.length) {
                    status = 2; // All criteria passed
                } else if (passed > 0) {
                    status = 1; // Some criteria passed
                }

                await Car.update({ status }, { where: { id } });
                res.json({ message: "Car status updated", status });
            }
        } catch (error) {
            // res.status(500).json({ error: "Failed to update car status" });
            next({
                statusCode: 500,
                message: "Failed to update car status. Please try again later.",
            });
        }
    }
);

export default router;
