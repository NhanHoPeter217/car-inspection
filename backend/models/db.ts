import { Sequelize } from "sequelize";

// Get database connection details from environment variables
const DB_NAME = process.env.DB_DATABASE as string;
const DB_USER = process.env.DB_USERNAME as string;
const DB_PASS = process.env.DB_PASSWORD as string;
const DB_HOST = process.env.DB_HOST as string;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: "postgres"
});

export default sequelize;