"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const ClassEntity_1 = require("../class/ClassEntity");
const StudentEntity_1 = require("../student/StudentEntity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "class_management",
    synchronize: false, // Use migrations for schema updates
    logging: true,
    entities: [ClassEntity_1.Class, StudentEntity_1.Student],
    migrations: ["src/migrations/*.ts"],
});
const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!exports.AppDataSource.isInitialized) {
        try {
            yield exports.AppDataSource.initialize();
            console.log("✅ Database connected successfully");
        }
        catch (error) {
            console.error("❌ Database connection failed:", error);
            throw error;
        }
    }
});
exports.connectDatabase = connectDatabase;
