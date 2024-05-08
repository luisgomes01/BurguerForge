import mongoose from "mongoose";

export class MongoDb {
  private port: string;
  private host: string;
  private connectionUrl: string;

  constructor(port: string = "27017", host: string = "127.0.01") {
    this.port = process.env.MONGO_PORT || port;
    this.host = process.env.MONGO_HOST || host;
    this.connectionUrl = `mongodb://${host}:${port}/order_db`;
  }

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.connectionUrl);
      console.log("✅ Connected to MongoDb");
    } catch (error) {
      console.log(`❌ Failed to connect to MongoDb: ${error}`);
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log("✅ Disconnected from MongoDB");
    } catch (error) {
      console.log(`❌ Failed to disconnect from MongoDB: ${error}`);
    }
  }
}
