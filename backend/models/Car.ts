import { DataTypes, Model, Association } from "sequelize";
import sequelize from "./db";

class Car extends Model {
    public id!: number;
    public name!: string;
    public status!: number; // 0, 1, 2
}

Car.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0, // Default to "not inspected yet"
        },
    },
    {
        sequelize,
        tableName: "cars",
    }
);

export default Car;