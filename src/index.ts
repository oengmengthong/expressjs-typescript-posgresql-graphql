import "reflect-metadata";
import express, { Application, Request, Response } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { connectDatabase } from "./database/data-source";
import { ClassResolver } from "./class/ClassResolver";
import { StudentResolver } from "./student/StudentResolver";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const main = async () => {
  const app: Application = express();

  // Middleware: Enable CORS
  app.use(cors());

  // Health Check Endpoint
  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "OK", message: "Server is running" });
  });

  // Connect to the database
  try {
    await connectDatabase();
  } catch (error) {
    console.error("❌ Fatal error connecting to the database:", error);
    process.exit(1);
  }

  // Build GraphQL schema
  let schema;
  try {
    schema = await buildSchema({
      resolvers: [ClassResolver, StudentResolver],
    });
    console.log("✅ GraphQL schema built successfully");
  } catch (error) {
    console.error("❌ Error building GraphQL schema:", error);
    process.exit(1);
  }

  // Apollo Server
  const server = new ApolloServer({ schema });
  await server.start();
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
};

main().catch((error) => {
  console.error("❌ Fatal error starting the server:", error);
  process.exit(1); // Exit the process if there's an unhandled error
});