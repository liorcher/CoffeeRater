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
import { connectToDatabase } from "./services/database.service";
import passport from "./services/auth.service";
import session from "express-session";
import cookieParser from "cookie-parser";
import path from "path";

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
app.use(express.urlencoded({ extended: false }));

// Middleware to parse cookies
app.use(cookieParser());

// Security middleware
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https://iili.io", "https://lh3.googleusercontent.com"],
      connectSrc: ["'self'", "https://fake-coffee-api.vercel.app"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);

// CORS middleware
app.use(
  cors({
    origin: ["http://localhost:3000", 'http://localhost:9000'], // Allow your front-end origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// Session middleware
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// Swagger Config
const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Router Config
app.use("/api/v1", routes);

app.use(express.static(path.join(__dirname, "../public")));

// Connect to MongoDB
connectToDatabase();

export default app;
