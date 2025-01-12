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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const data_source_1 = require("./database/data-source");
const ClassResolver_1 = require("./class/ClassResolver");
const StudentResolver_1 = require("./student/StudentResolver");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    // Middleware: Enable CORS
    app.use((0, cors_1.default)());
    // Health Check Endpoint
    app.get("/health", (req, res) => {
        res.status(200).json({ status: "OK", message: "Server is running" });
    });
    // Connect to the database
    try {
        yield (0, data_source_1.connectDatabase)();
    }
    catch (error) {
        console.error("❌ Fatal error connecting to the database:", error);
        process.exit(1);
    }
    // Build GraphQL schema
    let schema;
    try {
        schema = yield (0, type_graphql_1.buildSchema)({
            resolvers: [ClassResolver_1.ClassResolver, StudentResolver_1.StudentResolver],
        });
        console.log("✅ GraphQL schema built successfully");
    }
    catch (error) {
        console.error("❌ Error building GraphQL schema:", error);
        process.exit(1);
    }
    // Apollo Server
    const server = new apollo_server_express_1.ApolloServer({ schema });
    yield server.start();
    server.applyMiddleware({ app });
    // Start the Express server
    const PORT = process.env.PORT || 4000;
    const serverInstance = app.listen(PORT, () => {
        console.log(`🚀 Server is running at http://localhost:${PORT}${server.graphqlPath}`);
    });
    // Graceful shutdown
    process.on("SIGTERM", () => {
        console.log("🔄 SIGTERM signal received. Closing server...");
        serverInstance.close(() => {
            console.log("✅ Server closed");
            process.exit(0);
        });
    });
    process.on("SIGINT", () => {
        console.log("🔄 SIGINT signal received. Closing server...");
        serverInstance.close(() => {
            console.log("✅ Server closed");
            process.exit(0);
        });
    });
});
main().catch((error) => {
    console.error("❌ Fatal error starting the server:", error);
    process.exit(1); // Exit the process if there's an unhandled error
});
