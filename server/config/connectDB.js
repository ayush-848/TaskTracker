const { MongoClient } = require("mongodb");


let client; // Store the client globally

const connectDB = async () => {
  try {
    if (client) {
      console.log("Using existing database connection");
      return client.db(); // Return existing connection
    }

    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("Please define your MongoDB connection string");
    }

    client = new MongoClient(uri);

    await client.connect();
    console.log("Database connected successfully");

    return client.db();
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit process on connection failure
  }
};

module.exports = connectDB;
