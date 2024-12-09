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
const Criteria_1 = __importDefault(require("../models/Criteria"));
const Criteria_Value_1 = __importDefault(require("../models/Criteria_Value"));
const utils_1 = require("./utils");
const validationMiddleware_1 = require("../middleware/validationMiddleware");
const router = express_1.default.Router();
// GET /criteriaValue - Fetch all criteria
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const criteria = yield Criteria_1.default.findAll();
        res.json(criteria);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch criteria" });
    }
}));
// GET /criteriaValue/:car_id - Fetch criterias for a specific car
router.get("/:car_id", validationMiddleware_1.validateCarId, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { car_id } = req.params;
        const allCriterias = yield Criteria_1.default.findAll();
        const currentCar = yield Car_1.default.findOne({ where: { id: parseInt(car_id) } });
        const carCriteria = yield Promise.all(allCriterias.map((c) => __awaiter(void 0, void 0, void 0, function* () {
            const [criteria, _] = yield Criteria_Value_1.default.findOrCreate({
                where: { car_id: parseInt(car_id), criteria_id: c.id },
                defaults: { is_good: false, note: "" },
                hooks: false,
                raw: true
            });
            return {
                id: c.id,
                name: c.name,
                is_good: (criteria === null || criteria === void 0 ? void 0 : criteria.is_good) || false,
                note: (criteria === null || criteria === void 0 ? void 0 : criteria.note) || "",
            };
        })));
        res.json({ carName: currentCar === null || currentCar === void 0 ? void 0 : currentCar.name, criterias: carCriteria });
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
// PUT /criteriaValue - Update criteria for a specific car
router.put("/:car_id", validationMiddleware_1.validateCarId, validationMiddleware_1.validateCriteriaUpdate, validationMiddleware_1.handleValidationErrors, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { car_id } = req.params;
    const { criteria } = req.body;
    try {
        const updatedCriteria = yield Promise.all(criteria.map((c) => __awaiter(void 0, void 0, void 0, function* () {
            return Criteria_Value_1.default.update({ is_good: c.is_good, note: c.note }, { where: { car_id: parseInt(car_id), criteria_id: c.id } });
        })));
        // Update car status
        yield (0, utils_1.updateCarStatus)(parseInt(car_id), res);
        res.json({ message: "Criteria updated", updatedCriteria });
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
exports.default = router;
