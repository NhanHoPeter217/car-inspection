import { Response } from "express";
import Criteria_Value from "../models/Criteria_Value";
import Car from "../models/Car";

export const updateCarStatus = async (id: number, res: Response) => {
    try {
        const criteriaValue = await Criteria_Value.findAll({ where: { car_id: id } });

        if (!criteriaValue.length) {
            return res.status(404).json({ error: "Car not found" });
        }
        
        const passed = criteriaValue.filter((c) => c.is_good).length;

        let status = 0;
        if (passed === criteriaValue.length) {
            status = 2; // All criteria passed
        } else if (passed > 0) {
            status = 1; // Some criteria passed
        }

        await Car.update({ status }, { where: { id } });
        // res.json({ message: "Car status updated", status });
    } catch (error) {
        return res.status(500).json({ error: "Failed to update car status" });
    }
}