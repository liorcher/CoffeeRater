import dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";
import morgan from "morgan";
import logger from "./utils/logger.util";
import routes from "./routes";
import helmet from "helmet";
import cors from "cors";
import swaggerOptions from "./swagger/swaggerOptions";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import redisClient from "./services/redis.service";

const app: Express = express();

app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

// Middleware to parse JSON requests
app.use(express.json());

// Security middleware
app.use(helmet());

// CORS middleware
app.use(cors());

// Swagger Config
const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Router Config
app.use("/api/v1", routes);

export default app;
