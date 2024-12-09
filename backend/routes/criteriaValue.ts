import express, { Request, Response } from "express";
import Car from "../models/Car";
import Criteria from "../models/Criteria";
import Criteria_Value from "../models/Criteria_Value";
import { updateCarStatus } from "./utils";
import { validateCriteriaUpdate, handleValidationErrors, validateCarId } from "../middleware/validationMiddleware";

const router = express.Router();

// GET /criteriaValue - Fetch all criteria
router.get("/", async (req: Request, res: Response) => {
    try {
        const criteria = await Criteria.findAll();
        res.json(criteria);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch criteria" });
    }
});

// GET /criteriaValue/:car_id - Fetch criterias for a specific car
router.get(
    "/:car_id",
    validateCarId,
    async (req: Request, res: Response) => {
        try {
            const { car_id } = req.params;
            const allCriterias = await Criteria.findAll();
            const currentCar = await Car.findOne({ where: { id: parseInt(car_id) } });

            const carCriteria = await Promise.all(
                allCriterias.map(async (c) => {
                    const [criteria, _] = await Criteria_Value.findOrCreate({ 
                        where: {car_id: parseInt(car_id), criteria_id: c.id },
                        defaults: { is_good: false, note: "" },
                        hooks: false,
                        raw: true
                    });

                    return {
                        id: c.id,
                        name: c.name,
                        is_good: criteria?.is_good || false,
                        note: criteria?.note || "",
                    };
                })
            );
            
            res.json({ carName: currentCar?.name, criterias: carCriteria });
        } catch (error) {
            res.status(500).json({ error });
        }
    }
);

// PUT /criteriaValue - Update criteria for a specific car
router.put(
    "/:car_id",
    validateCarId,
    validateCriteriaUpdate,
    handleValidationErrors,
    async (req: Request, res: Response) => {
        const { car_id } = req.params;
        const { criteria } = req.body;
        try {
            const updatedCriteria = await Promise.all(
                criteria.map(async (c: any) => {
                    return Criteria_Value.update(
                        { is_good: c.is_good, note: c.note },
                        { where: { car_id: parseInt(car_id), criteria_id: c.id } }
                    );
                })
            );

            // Update car status
            await updateCarStatus(parseInt(car_id), res);

            res.json({ message: "Criteria updated", updatedCriteria });
        } catch (error) {
            res.status(500).json({ error });
        }
    }
);

export default router;
