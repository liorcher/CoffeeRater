import mongoose from "mongoose";
import logger from "../utils/logger.util";

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  throw new Error("MONGO_URI is not defined");
}

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURI);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("Error connecting to MongoDB:", error);
    throw new Error("Error connecting to MongoDB");
  }
};
