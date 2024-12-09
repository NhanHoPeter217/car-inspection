"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Car_1 = __importDefault(require("../models/Car"));
const Criteria_Value_1 = __importDefault(require("../models/Criteria_Value"));
const validationMiddleware_1 = require("../middleware/validationMiddleware");
const router = express_1.default.Router();
// GET /cars - Fetch all cars
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sortBy = "status", order = "asc" } = req.query;
        const cars = yield Car_1.default.findAll({
            order: [[sortBy, order]],
        });
        res.json(cars);
    }
    catch (error) {
        // res.status(500).json({ error: "Failed to fetch cars" });
        next({
            statusCode: 500,
            message: "Failed to fetch cars. Please try again later.",
        });
    }
}));
// POST /cars - Add a new car
router.post("/", validationMiddleware_1.validateCarName, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        // Validate input
        if (!name) {
            throw { statusCode: 400, message: "Car name is required." };
        }
        const car = yield Car_1.default.create({ name });
        res.status(201).json(car);
    }
    catch (error) {
        // res.status(500).json({ error: "Failed to add car" });
        next(error); // pass error to middleware
    }
}));
// PUT /cars/:id/status - Update car status
router.put("/:car_id/status", validationMiddleware_1.validateCarId, validationMiddleware_1.validateCriteriaUpdate, validationMiddleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const criteriaValue = yield Criteria_Value_1.default.findAll({ where: { car_id: id } });
        if (!criteriaValue.length) {
            res.status(404).json({ error: "Car not found" });
        }
        else {
            const passed = criteriaValue.filter((c) => c.is_good).length;
            let status = 0;
            if (passed === criteriaValue.length) {
                status = 2; // All criteria passed
            }
            else if (passed > 0) {
                status = 1; // Some criteria passed
            }
            yield Car_1.default.update({ status }, { where: { id } });
            res.json({ message: "Car status updated", status });
        }
    }
    catch (error) {
        // res.status(500).json({ error: "Failed to update car status" });
        next({
            statusCode: 500,
            message: "Failed to update car status. Please try again later.",
        });
    }
}));
exports.default = router;
