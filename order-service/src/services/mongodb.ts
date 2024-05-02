import mongoose from "mongoose";

const port = process.env.MONGO_PORT || "27017";
const host = process.env.MONGO_HOST || "127.0.0.1";
const connectionUrl = `mongodb://${host}:${port}/order_service_db`;

export const connectMongoDb = async () => {
  try {
    await mongoose.connect(connectionUrl);
    console.log("✅ Connected to MongoDb");
  } catch (error) {
    console.log(`❌ Failed to connect to MongoDb: ${error}`);
  }
};
