import sequelize from "./models/db";
import Car from "./models/Car";
import Criteria from "./models/Criteria";
import Criteria_Value from "./models/Criteria_Value";

const syncDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");

        await sequelize.sync({ force: true }); // WARNING: This will drop existing tables
        console.log("Database synced!");

        // Insert test data for Car
        const car = await Car.create({ name: "Lamborghini" });

        // Insert test data for Criteria
        const criteriaNames = ["Brakes", "Engine", "Tires", "Lights", "Steering"];
        const criteria = await Promise.all(
            criteriaNames.map((name) => Criteria.create({ name }))
        );

        // Insert test data for Criteria_Value
        await Promise.all(
            criteria.map((crit) =>
                Criteria_Value.create({
                    car_id: car.id,
                    criteria_id: crit.id,
                    is_good: false,
                    note: "Looks great!",
                })
            )
        );

        console.log("Test data for Criteria_Value inserted!");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    } finally {
        sequelize.close();
    }
};

syncDB();
