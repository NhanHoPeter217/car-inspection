import { DataTypes, Model, Association } from "sequelize";
import sequelize from "./db";
import Car from "./Car";
import Criteria from "./Criteria";

class Criteria_Value extends Model {
    public car_id!: number; // Part of the composite primary key
    public criteria_id!: number; // Part of the composite primary key
    public is_good!: boolean;
    public note?: string; // Optional, but required if is_good is false

    public static associations: {
        car: Association<Criteria_Value, Car>;
        criteria: Association<Criteria_Value, Criteria>;
    };    
}

Criteria_Value.init(
    {
        car_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Car,
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            primaryKey: true, // Mark as part of the composite primary key
        },
        criteria_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Criteria,
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            primaryKey: true, // Mark as part of the composite primary key
        },
        is_good: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        note: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
    {
        sequelize,
        tableName: "criteriaValue",
        hooks: {
            beforeValidate: (criteria_value: Criteria_Value) => {
                if (!criteria_value.is_good && !criteria_value.note) {
                    throw new Error("Note is required if a specific criteria has some problems.");
                }
            }
        },
        timestamps: false, // Optional, if you don’t want Sequelize to add createdAt/updatedAt fields
    }
);

// Define Associations
Car.hasMany(Criteria_Value, { foreignKey: "car_id", as: "criteriaValues" });

Criteria_Value.belongsTo(Car, { foreignKey: "car_id", as: "car" });

Criteria.hasMany(Criteria_Value, { foreignKey: "criteria_id", as: "criteriaValues" });

Criteria_Value.belongsTo(Criteria, { foreignKey: "criteria_id", as: "criteria" });

export default Criteria_Value;
