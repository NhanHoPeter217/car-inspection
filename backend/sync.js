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
const db_1 = __importDefault(require("./models/db"));
const Car_1 = __importDefault(require("./models/Car"));
const Criteria_1 = __importDefault(require("./models/Criteria"));
const Criteria_Value_1 = __importDefault(require("./models/Criteria_Value"));
const syncDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.authenticate();
        console.log("Connection has been established successfully.");
        yield db_1.default.sync({ force: true }); // WARNING: This will drop existing tables
        console.log("Database synced!");
        // Insert test data for Car
        const car = yield Car_1.default.create({ name: "Lamborghini" });
        // Insert test data for Criteria
        const criteriaNames = ["Brakes", "Engine", "Tires", "Lights", "Steering"];
        const criteria = yield Promise.all(criteriaNames.map((name) => Criteria_1.default.create({ name })));
        // Insert test data for Criteria_Value
        yield Promise.all(criteria.map((crit) => Criteria_Value_1.default.create({
            car_id: car.id,
            criteria_id: crit.id,
            is_good: false,
            note: "Looks great!",
        })));
        console.log("Test data for Criteria_Value inserted!");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
    finally {
        db_1.default.close();
    }
});
syncDB();
