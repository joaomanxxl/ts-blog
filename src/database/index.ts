import { DataSource } from "typeorm";
import { User } from "../modules/users/models/User";

export const AppDataSource = new DataSource({
    type: "mongodb",
    url: process.env.MONGO_URI,
    database: process.env.MONGO_DATABASE,
    entities: [User]
});

AppDataSource.initialize()
    .then(() => console.log("Database has been initialized!"))
    .catch((error) => console.log("Database could not be initialized.", error));