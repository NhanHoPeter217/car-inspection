import { DataTypes, Model } from "sequelize";
import sequelize from "./db";

class Criteria extends Model {
    public id!: number;
    public name!: string;
}

Criteria.init(
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
    },
    {
        sequelize,
        tableName: "criterias",
    }
);

export default Criteria;
