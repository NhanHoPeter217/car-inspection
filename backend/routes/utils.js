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
exports.updateCarStatus = void 0;
const Criteria_Value_1 = __importDefault(require("../models/Criteria_Value"));
const Car_1 = __importDefault(require("../models/Car"));
const updateCarStatus = (id, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const criteriaValue = yield Criteria_Value_1.default.findAll({ where: { car_id: id } });
        if (!criteriaValue.length) {
            return res.status(404).json({ error: "Car not found" });
        }
        const passed = criteriaValue.filter((c) => c.is_good).length;
        let status = 0;
        if (passed === criteriaValue.length) {
            status = 2; // All criteria passed
        }
        else if (passed > 0) {
            status = 1; // Some criteria passed
        }
        yield Car_1.default.update({ status }, { where: { id } });
        // res.json({ message: "Car status updated", status });
    }
    catch (error) {
        return res.status(500).json({ error: "Failed to update car status" });
    }
});
exports.updateCarStatus = updateCarStatus;
