import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models/data/user";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "admin1234",
  database: process.env.DB_NAME || "finance_tracker_db",
  synchronize: true,
  logging: true,
  entities: [User],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});
