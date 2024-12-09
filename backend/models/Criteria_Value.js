"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("./db"));
const Car_1 = __importDefault(require("./Car"));
const Criteria_1 = __importDefault(require("./Criteria"));
class Criteria_Value extends sequelize_1.Model {
}
Criteria_Value.init({
    car_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Car_1.default,
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        primaryKey: true, // Mark as part of the composite primary key
    },
    criteria_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Criteria_1.default,
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        primaryKey: true, // Mark as part of the composite primary key
    },
    is_good: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    note: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
}, {
    sequelize: db_1.default,
    tableName: "criteriaValue",
    hooks: {
        beforeValidate: (criteria_value) => {
            if (!criteria_value.is_good && !criteria_value.note) {
                throw new Error("Note is required if a specific criteria has some problems.");
            }
        }
    },
    timestamps: false, // Optional, if you don’t want Sequelize to add createdAt/updatedAt fields
});
// Define Associations
Car_1.default.hasMany(Criteria_Value, { foreignKey: "car_id", as: "criteriaValues" });
Criteria_Value.belongsTo(Car_1.default, { foreignKey: "car_id", as: "car" });
Criteria_1.default.hasMany(Criteria_Value, { foreignKey: "criteria_id", as: "criteriaValues" });
Criteria_Value.belongsTo(Criteria_1.default, { foreignKey: "criteria_id", as: "criteria" });
exports.default = Criteria_Value;
