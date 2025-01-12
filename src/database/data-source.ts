import "reflect-metadata";
import { DataSource } from "typeorm";
import { Class } from "../class/ClassEntity";
import { Student } from "../student/StudentEntity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "class_management",
  synchronize: false, // Use migrations for schema updates
  logging: true,
  entities: [Class, Student],
  migrations: ["src/migrations/*.ts"],
});

export const connectDatabase = async () => {
  if (!AppDataSource.isInitialized) {
    try {
      await AppDataSource.initialize();
      console.log("✅ Database connected successfully");
    } catch (error) {
      console.error("❌ Database connection failed:", error);
      throw error;
    }
  }
};