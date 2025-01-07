import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models/user";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "postgresql_database",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "admin1234", 
  database: process.env.DB_NAME || "finance_tracker_db",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
